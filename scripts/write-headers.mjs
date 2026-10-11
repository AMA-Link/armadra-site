#!/usr/bin/env node
/**
 * 构建后生成 dist/_headers（Cloudflare 静态资源的响应头）。
 * CSP 只放行本站资源；Astro 内联的少量脚本按内容算 sha256 放进 script-src，
 * 所以内联脚本一改，哈希随构建自动更新，不需要 'unsafe-inline'。
 */
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

const hashes = new Set();
for (const file of walk(dist)) {
  const html = fs.readFileSync(file, 'utf8');
  for (const m of html.matchAll(/<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (/type="application\/(ld\+)?json"/.test(m[1]) || !m[2].trim()) continue;
    hashes.add(`'sha256-${crypto.createHash('sha256').update(m[2]).digest('base64')}'`);
  }
}

const csp = [
  "default-src 'self'",
  `script-src 'self' ${[...hashes].sort().join(' ')}`,
  // 演示画布与布局脚本会写元素的 style 属性
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'none'",
  'upgrade-insecure-requests',
].join('; ');

const headers = `/*
  Content-Security-Policy: ${csp}
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
  Cross-Origin-Opener-Policy: same-origin
  Strict-Transport-Security: max-age=31536000; includeSubDomains

/_astro/*
  Cache-Control: public, max-age=31536000, immutable

/brand/*
  Cache-Control: public, max-age=86400

/media/*
  Cache-Control: public, max-age=86400
`;

fs.writeFileSync(path.join(dist, '_headers'), headers);
console.log(`已写入 dist/_headers（${hashes.size} 个内联脚本哈希）`);
