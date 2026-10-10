#!/usr/bin/env node
/**
 * 从 GitHub 取 AMA-Link/Armadra 的最新发布，写入 src/data/release.json。
 * 构建时不联网，版本号与下载列表只在这里更新：pnpm sync:release
 * 有 GITHUB_TOKEN 时带上，避免匿名限流。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const out = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src/data/release.json');
const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'armadra-site' };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

const res = await fetch('https://api.github.com/repos/AMA-Link/Armadra/releases/latest', { headers });
if (!res.ok) {
  console.error(`GitHub API ${res.status}: ${await res.text()}`);
  process.exit(1);
}
const rel = await res.json();

/** 只收桌面安装包；更新清单（latest-*.yml）、签名与网页包不进下载列表 */
const PATTERN = /^Armadra_[\d.]+_(darwin|windows|linux)-(aarch64|x86_64)(-portable|-setup)?\.(dmg|zip|exe|AppImage|deb|rpm)$/;
const assets = rel.assets
  .map((a) => ({ name: a.name, url: a.browser_download_url, size: a.size, m: PATTERN.exec(a.name) }))
  .filter((a) => a.m)
  .map(({ name, url, size, m }) => ({
    name,
    url,
    size,
    os: m[1],
    arch: m[2],
    kind: m[4] === 'zip' && m[1] === 'windows' ? 'portable' : m[4] === 'exe' ? 'setup' : m[4],
  }));

const data = {
  version: rel.tag_name.replace(/^v/, ''),
  tag: rel.tag_name,
  published: rel.published_at.slice(0, 10),
  url: rel.html_url,
  assets,
};
fs.writeFileSync(out, JSON.stringify(data, null, 2) + '\n');
console.log(`已写入 ${path.relative(process.cwd(), out)}：${data.tag}，${assets.length} 个安装包`);
