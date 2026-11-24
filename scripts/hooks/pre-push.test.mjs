import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, realpathSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { after, test } from 'node:test';
import { classifyPush, isDocsOnly, isNonSitePath } from './pre-push.mjs';

const scratch = realpathSync(mkdtempSync(join(tmpdir(), 'armadra-site-pre-push-test-')));
after(() => rmSync(scratch, { recursive: true, force: true }));

const env = Object.fromEntries(
  Object.entries(process.env).filter(([name]) => !name.startsWith('GIT_')),
);

function git(cwd, args) {
  const res = spawnSync('git', args, { cwd, encoding: 'utf8', env });
  assert.equal(res.status, 0, res.stderr);
  return res.stdout.trim();
}

function commitFile(dir, relPath, content, message = `update ${relPath}`) {
  const full = join(dir, relPath);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content);
  git(dir, ['add', relPath]);
  git(dir, ['commit', '-q', '-m', message]);
  return git(dir, ['rev-parse', 'HEAD']);
}

function initRepo(name) {
  const dir = join(scratch, name);
  mkdirSync(dir, { recursive: true });
  git(dir, ['init', '-q', '-b', 'main']);
  git(dir, ['config', 'user.email', 'test@armadra.com']);
  git(dir, ['config', 'user.name', 'Test']);
  const baseSha = commitFile(dir, 'src/pages/index.astro', '<h1>hi</h1>\n', 'init');
  return { dir, baseSha };
}

const ZERO_SHA = '0000000000000000000000000000000000000000';

test('isNonSitePath 与 isDocsOnly：只放行仓库内部文档，不放行站点内容与构建配置', () => {
  const internalDocs = [
    'docs/README.md',
    'docs/guides/deployment.md',
    'docs/guides/development.md',
    '.github/ISSUE_TEMPLATE/bug.yml',
    '.github/PULL_REQUEST_TEMPLATE.md',
    '.github/CONTRIBUTING.md',
    '.github/SECURITY.md',
    'AGENTS.md',
    'CLAUDE.md',
    'DESIGN.md',
    'PRODUCT.md',
    'README.md',
  ];
  for (const file of internalDocs) {
    assert.equal(isNonSitePath(file), true, `expected non-site: ${file}`);
  }
  assert.equal(isDocsOnly(internalDocs), true);
  assert.equal(isDocsOnly([]), false);

  const siteOrCiFiles = [
    'src/content/docs/zh/install.md',
    'src/content/docs/en/index.md',
    'src/pages/index.astro',
    'src/styles/tokens.css',
    'public/_headers',
    'scripts/check-all.mjs',
    'scripts/hooks/pre-push.mjs',
    '.github/workflows/ci.yml',
    '.github/workflows/deploy.yml',
    '.github/labeler.yml',
    'package.json',
    'pnpm-lock.yaml',
    'astro.config.mjs',
    'wrangler.jsonc',
  ];
  for (const file of siteOrCiFiles) {
    assert.equal(isNonSitePath(file), false, `expected site-affecting: ${file}`);
    assert.equal(isDocsOnly(['README.md', file]), false, `mixed with ${file} must be false`);
  }
});

test('classifyPush：删分支、推 tag 或空改动返回 none', () => {
  const { dir, baseSha } = initRepo('none-cases');
  assert.equal(
    classifyPush(`(delete) ${ZERO_SHA} refs/heads/old ${baseSha}\n`, 'origin', dir),
    'none',
  );
  assert.equal(
    classifyPush(`refs/tags/v0.21.0 ${baseSha} refs/tags/v0.21.0 ${ZERO_SHA}\n`, 'origin', dir),
    'none',
  );
  assert.equal(
    classifyPush(`refs/heads/main ${baseSha} refs/heads/main ${baseSha}\n`, 'origin', dir),
    'none',
  );
});

test('classifyPush：仅内部文档改动返回 docs；触及 src/content/docs 或混合改动返回 site', () => {
  const { dir, baseSha } = initRepo('docs-vs-site');
  const docsSha = commitFile(dir, 'docs/guides/架构说明.md', '# 架构\n');
  const readmeSha = commitFile(dir, 'README.md', '# Armadra Site\n');
  assert.equal(
    classifyPush(`refs/heads/docs ${readmeSha} refs/heads/docs ${baseSha}\n`, 'origin', dir),
    'docs',
  );
  assert.equal(
    classifyPush(`refs/heads/docs ${docsSha} refs/heads/docs ${baseSha}\n`, 'origin', dir),
    'docs',
  );

  const siteDocSha = commitFile(dir, 'src/content/docs/zh/install.md', '---\ntitle: 安装\n---\n');
  assert.equal(
    classifyPush(`refs/heads/docs ${siteDocSha} refs/heads/docs ${readmeSha}\n`, 'origin', dir),
    'site',
  );
  assert.equal(
    classifyPush(`refs/heads/docs ${siteDocSha} refs/heads/docs ${baseSha}\n`, 'origin', dir),
    'site',
  );
});

test('classifyPush：新分支且找不到远端基线时保守回退为 site', () => {
  const { dir } = initRepo('unknown-base');
  const headSha = commitFile(dir, 'README.md', '# Only readme\n');
  assert.equal(
    classifyPush(`refs/heads/feat/new ${headSha} refs/heads/feat/new ${ZERO_SHA}\n`, 'origin', dir),
    'site',
  );
});
