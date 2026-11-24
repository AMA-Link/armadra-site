/**
 * 推送前本地把关（#81）。`.githooks/pre-push` 调用，`pnpm install` 时由
 * `scripts/hooks/install.mjs` 把 `core.hooksPath` 指到 `.githooks`。
 *
 * 规则与 `.github/workflows/ci.yml` 的 `changes` 快路径一致：
 * - 删除分支、只推 tag、推送范围里没有改动：直接放行。
 * - 只改了仓库内部文档与治理文件（顶层 `docs/**`、Issue/PR 模板、CONTRIBUTING、
 *   SECURITY、AGENTS/CLAUDE/DESIGN/PRODUCT/README，不含站点文档 `src/content/docs/**`）：
 *   只跑轻量钩子自测（`node --test scripts/hooks/*.test.mjs`），跳过构建。
 * - 其余改动（或基线不可达）：依次跑 `pnpm check`、`pnpm build`、`pnpm check:links`。
 *
 * 失败就拦下推送（退出码 1）。临时跳过：`git push --no-verify`，或
 * `ARMADRA_SKIP_PREPUSH=1`（全部）/ `ARMADRA_SKIP_PREPUSH=check:links`（指定步骤）。
 * 每步完整输出在 node_modules/.cache/pre-push/<步骤>.log。
 */
import { spawn, spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../../', import.meta.url));
const ZERO = /^0+$/;
const STEPS = ['check', 'build', 'check:links'];

const NON_SITE_EXACT = new Set([
  '.github/PULL_REQUEST_TEMPLATE.md',
  '.github/CONTRIBUTING.md',
  '.github/SECURITY.md',
  'AGENTS.md',
  'CLAUDE.md',
  'DESIGN.md',
  'PRODUCT.md',
  'README.md',
]);

/**
 * 判断单个相对路径是否属于不参与 Astro 站点构建的仓库内部文档 / 治理文件。
 * 注意：站点对外文档在 `src/content/docs/**`，必须返回 false 以触发完整构建与死链检查。
 */
export function isNonSitePath(file) {
  const normalized = file.replace(/\\/g, '/').replace(/^\.\//, '').trim();
  if (!normalized) return false;
  if (normalized.startsWith('docs/')) return true;
  if (normalized.startsWith('.github/ISSUE_TEMPLATE/')) return true;
  return NON_SITE_EXACT.has(normalized);
}

/** 非空改动列表且全部为非站点内部文档时走快路径。 */
export function isDocsOnly(files) {
  return files.length > 0 && files.every(isNonSitePath);
}

function git(args, cwd = ROOT) {
  const result = spawnSync('git', args, { cwd, encoding: 'utf8' });
  return result.status === 0 ? result.stdout.trim() : null;
}

/**
 * 判定本次推送所需的检查级别：
 * - `'none'`：无分支改动（删分支、推 tag 或空 diff）
 * - `'docs'`：仅改动非站点内部文档 / 治理文件
 * - `'site'`：涉及站点代码、内容、脚本、工作流，或基线不可达（保守全量）
 */
export function classifyPush(input, remote, cwd = ROOT) {
  const changed = new Set();
  for (const line of input.split('\n')) {
    const [, localSha, remoteRef, remoteSha] = line.trim().split(/\s+/);
    if (!localSha || ZERO.test(localSha) || !remoteRef?.startsWith('refs/heads/')) continue;
    const known =
      Boolean(remoteSha) &&
      !ZERO.test(remoteSha) &&
      git(['cat-file', '-e', `${remoteSha}^{commit}`], cwd) !== null;
    const base = known
      ? git(['merge-base', remoteSha, localSha], cwd)
      : git(['merge-base', `${remote}/main`, localSha], cwd);
    if (base === null) return 'site';
    const diff = git(['-c', 'core.quotePath=false', 'diff', '--name-only', base, localSha], cwd);
    if (diff === null) return 'site';
    for (const file of diff.split('\n')) {
      const trimmed = file.trim();
      if (trimmed) changed.add(trimmed);
    }
  }
  if (changed.size === 0) return 'none';
  return isDocsOnly([...changed]) ? 'docs' : 'site';
}

function resolveLogDir(cwd) {
  const nm = join(cwd, 'node_modules');
  return existsSync(nm) ? join(nm, '.cache/pre-push') : join(tmpdir(), 'armadra-site-pre-push');
}

function runCommand(id, cmd, args, cwd, logDir) {
  const started = Date.now();
  const log = join(logDir, `${id.replace(/[^\w.-]/g, '_')}.log`);
  return new Promise((resolve) => {
    const chunks = [];
    const child = spawn(cmd, args, {
      cwd,
      shell: cmd === 'pnpm' && process.platform === 'win32',
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

export async function main(argv, input, { cwd = ROOT } = {}) {
  // git 给钩子设的 GIT_DIR 等会被子进程继承，和 CI 一样干净，全部去掉。
  for (const name of Object.keys(process.env)) if (name.startsWith('GIT_')) delete process.env[name];
  const skip = (process.env.ARMADRA_SKIP_PREPUSH ?? '').trim();
  if (['1', 'true', 'all'].includes(skip)) return 0;
  const skipped = new Set(skip.split(',').map((part) => part.trim()).filter(Boolean));
  const remote = argv[0] && !argv[0].includes('/') ? argv[0] : 'origin';
  const kind = classifyPush(input, remote, cwd);
  if (kind === 'none') return 0;

  const logDir = resolveLogDir(cwd);
  mkdirSync(logDir, { recursive: true });

  if (kind === 'docs') {
    console.log('pre-push：仅仓库内部文档改动，跑轻量钩子自测');
    if (skipped.has('docs') || skipped.has('hooks:test')) {
      console.log('  skip hooks:test');
      return 0;
    }
    const hookTests = readdirSync(join(cwd, 'scripts/hooks'))
      .filter((name) => name.endsWith('.test.mjs'))
      .sort()
      .map((name) => join(cwd, 'scripts/hooks', name));
    const result = await runCommand('hooks:test', process.execPath, ['--test', ...hookTests], cwd, logDir);
    if (!result.ok) {
      const text = readFileSync(result.log, 'utf8').trimEnd().split('\n').slice(-30).join('\n');
      console.log(`\n── hooks:test 失败（完整输出：${result.log}）──\n${text}`);
      return 1;
    }
    return 0;
  }

  if (!existsSync(join(cwd, 'node_modules'))) {
    console.error('pre-push：没装依赖，先 pnpm install（或 git push --no-verify 跳过检查）');
    return 1;
  }
  console.log('pre-push：与 CI 相同的 check、build、check:links');
  for (const id of STEPS) {
    if (skipped.has(id)) {
      console.log(`  skip ${id}`);
      continue;
    }
    const result = await runCommand(id, 'pnpm', [id], cwd, logDir);
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
