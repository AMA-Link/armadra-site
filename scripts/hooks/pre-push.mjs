/**
 * 推送前本地把关（#81）。`.githooks/pre-push` 调用，`pnpm install` 时由
 * `scripts/hooks/install.mjs` 把 `core.hooksPath` 指到 `.githooks`。
 *
 * CI（.github/workflows/ci.yml）不按改动挑作业，每次都跑 `pnpm check`、`pnpm build`、
 * `pnpm check:links`；本机合计十来秒，这里照原样顺序跑这三步。删除分支、只推 tag、
 * 推送范围里没有改动时什么都不做。
 *
 * 失败就拦下推送（退出码 1）。临时跳过：`git push --no-verify`，或
 * `ARMADRA_SKIP_PREPUSH=1`（全部）/ `ARMADRA_SKIP_PREPUSH=check:links`（指定步骤）。
 * 每步完整输出在 node_modules/.cache/pre-push/<步骤>.log。
 */
import { spawn, spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../../', import.meta.url));
const LOG_DIR = join(ROOT, 'node_modules/.cache/pre-push');
const ZERO = /^0+$/;
const STEPS = ['check', 'build', 'check:links'];

function git(args) {
  const result = spawnSync('git', args, { cwd: ROOT, encoding: 'utf8' });
  return result.status === 0 ? result.stdout.trim() : null;
}

/** 这次推送里要查的分支 ref 有没有新改动（删除与 tag 不算）。 */
function hasChanges(input, remote) {
  for (const line of input.split('\n')) {
    const [, localSha, remoteRef, remoteSha] = line.trim().split(/\s+/);
    if (!localSha || ZERO.test(localSha) || !remoteRef?.startsWith('refs/heads/')) continue;
    const known = !ZERO.test(remoteSha) && git(['cat-file', '-e', `${remoteSha}^{commit}`]) !== null;
    const base = known
      ? git(['merge-base', remoteSha, localSha])
      : git(['merge-base', `${remote}/main`, localSha]);
    if (base === null) return true;
    if ((git(['diff', '--name-only', base, localSha]) ?? '') !== '') return true;
  }
  return false;
}

function runStep(id) {
  const started = Date.now();
  const log = join(LOG_DIR, `${id.replace(/[^\w.-]/g, '_')}.log`);
  return new Promise((resolve) => {
    const chunks = [];
    const child = spawn('pnpm', [id], {
      cwd: ROOT,
      shell: process.platform === 'win32',
      env: { ...process.env, FORCE_COLOR: '0' },
    });
    child.stdout.on('data', (chunk) => chunks.push(chunk));
    child.stderr.on('data', (chunk) => chunks.push(chunk));
    let done = false;
    const finish = (ok) => {
      if (done) return;
      done = true;
      writeFileSync(log, Buffer.concat(chunks));
      console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${id} ${((Date.now() - started) / 1000).toFixed(1)}s`);
      resolve({ id, ok, log });
    };
    child.on('error', (error) => {
      chunks.push(Buffer.from(`${error.message}\n`));
      finish(false);
    });
    child.on('close', (code) => finish(code === 0));
  });
}

async function main(argv, input) {
  // git 给钩子设的 GIT_DIR 等会被子进程继承，和 CI 一样干净，全部去掉。
  for (const name of Object.keys(process.env)) if (name.startsWith('GIT_')) delete process.env[name];
  const skip = (process.env.ARMADRA_SKIP_PREPUSH ?? '').trim();
  if (['1', 'true', 'all'].includes(skip)) return 0;
  const skipped = new Set(skip.split(',').map((part) => part.trim()).filter(Boolean));
  const remote = argv[0] && !argv[0].includes('/') ? argv[0] : 'origin';
  if (!hasChanges(input, remote)) return 0;
  if (!existsSync(join(ROOT, 'node_modules'))) {
    console.error('pre-push：没装依赖，先 pnpm install（或 git push --no-verify 跳过检查）');
    return 1;
  }
  mkdirSync(LOG_DIR, { recursive: true });
  console.log('pre-push：与 CI 相同的 check、build、check:links');
  for (const id of STEPS) {
    if (skipped.has(id)) {
      console.log(`  skip ${id}`);
      continue;
    }
    const result = await runStep(id);
    if (result.ok) continue;
    const text = readFileSync(result.log, 'utf8').trimEnd().split('\n').slice(-30).join('\n');
    console.log(`\n── ${id} 失败（完整输出：${result.log}）──\n${text}`);
    console.log(
      [
        '',
        `推送已拦下：${id} 失败。修好、提交后再推。`,
        '  设计约束与对比度：按报错改 tokens.css 或组件；死链：改链接或补页面。',
        `  确需先推：git push --no-verify，或 ARMADRA_SKIP_PREPUSH=${id} git push 只跳过这一步。`,
      ].join('\n'),
    );
    return 1;
  }
  return 0;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  process.exitCode = await main(process.argv.slice(2), readFileSync(process.stdin.fd, 'utf8'));
}
