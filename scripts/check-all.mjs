#!/usr/bin/env node
/**
 * 并行执行站点静态检查（`pnpm check`）：
 * - `astro check`（内容集合同步与 TypeScript / Astro 严格类型检查）
 * - `scripts/check-design.mjs`（设计 token 约束检查）
 * - `scripts/check-contrast.mjs`（深浅主题对比度检查）
 * - `node --test scripts/hooks/*.test.mjs`（Git 钩子自测）
 *
 * 任一步骤失败时完整打印其 stdout / stderr 并返回非零退出码。
 */
import { spawn } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../', import.meta.url));

const hookTests = readdirSync(join(ROOT, 'scripts/hooks'))
  .filter((name) => name.endsWith('.test.mjs'))
  .sort()
  .map((name) => join(ROOT, 'scripts/hooks', name));

if (hookTests.length === 0) {
  console.error('scripts/hooks 下未找到 *.test.mjs 用例文件');
  process.exit(1);
}

const STEPS = [
  { name: 'astro check', args: [join(ROOT, 'node_modules/astro/bin/astro.mjs'), 'check'] },
  { name: 'check:design', args: [join(ROOT, 'scripts/check-design.mjs')] },
  { name: 'check:contrast', args: [join(ROOT, 'scripts/check-contrast.mjs')] },
  { name: 'hooks:test', args: ['--test', ...hookTests] },
];

function runStep({ name, args }) {
  const started = performance.now();
  return new Promise((resolve) => {
    const stdoutChunks = [];
    const stderrChunks = [];
    const child = spawn(process.execPath, args, {
      cwd: ROOT,
      env: { ...process.env, FORCE_COLOR: '0' },
    });
    child.stdout.on('data', (chunk) => stdoutChunks.push(chunk));
    child.stderr.on('data', (chunk) => stderrChunks.push(chunk));
    let settled = false;
    const finish = (code, errorMessage = '') => {
      if (settled) return;
      settled = true;
      if (errorMessage) stderrChunks.push(Buffer.from(`${errorMessage}\n`));
      const elapsedSec = ((performance.now() - started) / 1000).toFixed(2);
      const ok = code === 0 && !errorMessage;
      console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${name.padEnd(16)} ${elapsedSec}s`);
      resolve({
        name,
        ok,
        code: code ?? 1,
        elapsedSec,
        stdout: Buffer.concat(stdoutChunks).toString('utf8'),
        stderr: Buffer.concat(stderrChunks).toString('utf8'),
      });
    };
    child.on('error', (err) => finish(1, err.message));
    child.on('close', (code) => finish(code));
  });
}

const totalStart = performance.now();
const results = await Promise.all(STEPS.map(runStep));
const totalSec = ((performance.now() - totalStart) / 1000).toFixed(2);

const failed = results.filter((r) => !r.ok);
if (failed.length > 0) {
  for (const r of failed) {
    process.stderr.write(`\n── ${r.name} 失败（退出码 ${r.code}，耗时 ${r.elapsedSec}s）──\n`);
    if (r.stdout) process.stderr.write(r.stdout.endsWith('\n') ? r.stdout : `${r.stdout}\n`);
    if (r.stderr) process.stderr.write(r.stderr.endsWith('\n') ? r.stderr : `${r.stderr}\n`);
  }
  process.exitCode = 1;
} else {
  console.log(`全部检查通过（${totalSec}s）`);
}
