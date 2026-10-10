#!/usr/bin/env node
/**
 * 构建产物的站内死链检查：dist/ 里每个 href="/…" 都要对应一个文件，
 * 带 #片段 的还要在目标页里找到同名 id。外链不检查（构建不联网）。
 * 用法：pnpm build && node scripts/check-links.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
if (!fs.existsSync(dist)) {
  console.error('没有 dist/，先运行 pnpm build');
  process.exit(1);
}

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

function targetFile(urlPath) {
  const clean = decodeURIComponent(urlPath);
  const candidates = [path.join(dist, clean), path.join(dist, clean, 'index.html'), path.join(dist, `${clean}.html`)];
  return candidates.find((c) => fs.existsSync(c) && fs.statSync(c).isFile()) ?? null;
}

const ids = new Map();
function idsOf(file) {
  if (!ids.has(file)) ids.set(file, new Set([...fs.readFileSync(file, 'utf8').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  return ids.get(file);
}

const problems = [];
for (const file of walk(dist)) {
  const html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(dist, file);
  for (const [, href] of html.matchAll(/\shref="([^"]+)"/g)) {
    if (/^(https?:|mailto:|data:)/.test(href)) continue;
    if (href.startsWith('#')) {
      if (href.length > 1 && !idsOf(file).has(decodeURIComponent(href.slice(1)))) problems.push(`${rel}: 本页没有锚点 ${href}`);
      continue;
    }
    if (!href.startsWith('/')) continue;
    const [p, hash] = href.split('#');
    const t = targetFile(p);
    if (!t) problems.push(`${rel}: 找不到 ${href}`);
    else if (hash && t.endsWith('.html') && !idsOf(t).has(decodeURIComponent(hash))) problems.push(`${rel}: ${p} 没有锚点 #${hash}`);
  }
}

if (problems.length) {
  console.error(`站内链接检查未通过（${problems.length} 处）：\n` + problems.join('\n'));
  process.exit(1);
}
console.log('站内链接检查通过');
