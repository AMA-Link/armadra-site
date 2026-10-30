#!/usr/bin/env node
/**
 * 从 Armadra 的 CHANGELOG.md 取一个版本段落，生成 src/data/changelog.ts 的条目草稿。
 *
 * 用法：
 *   node scripts/changelog-draft.mjs <版本> [--source <路径或 URL>] [--write]
 *   pnpm changelog:draft 0.11.0
 *
 * - 默认只打印草稿；--write 才把草稿插到 CHANGELOG 数组最前面（版本已存在则拒绝）。
 * - --source 缺省时向上逐级找同级的 Armadra/CHANGELOG.md，找不到再取 GitHub 上 main 的版本。
 * - 去掉 PR 号、迁移号、契约与协议编号；「工程」小节与依赖、探针、随包版本这类条目不进草稿，以注释列出供人工复核。
 * - 英文、标题与条目措辞要人工改写成用户能读懂的话，占位为 TODO；写入后替换全部 TODO 再提交。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA = path.join(ROOT, 'src', 'data', 'changelog.ts');
const REMOTE = 'https://raw.githubusercontent.com/AMA-Link/Armadra/main/CHANGELOG.md';
const TODO = 'TODO';

/** 不进草稿的小节与条目（内部工程、依赖、测试、随包版本） */
const SKIP_SECTIONS = /^(工程|Engineering)$/;
const SKIP_ITEMS = /^(依赖|探针|测试|CI|构建|随包|文档|协议|Docs?)[：:\s]|夜间|集成测试|^随包|^协议/;

function usage(code = 1) {
  console.error('用法：node scripts/changelog-draft.mjs <版本> [--source <路径或 URL>] [--write]');
  process.exit(code);
}

function parseArgs(argv) {
  const opts = { version: '', source: '', write: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--write') opts.write = true;
    else if (a === '--source') opts.source = argv[++i] ?? usage();
    else if (a === '-h' || a === '--help') usage(0);
    else if (a.startsWith('-')) usage();
    else if (!opts.version) opts.version = a.replace(/^v/, '');
    else usage();
  }
  if (!/^\d+\.\d+\.\d+$/.test(opts.version)) usage();
  return opts;
}

function findLocal() {
  let dir = ROOT;
  for (;;) {
    const p = path.join(path.dirname(dir), 'Armadra', 'CHANGELOG.md');
    if (fs.existsSync(p)) return p;
    const up = path.dirname(dir);
    if (up === dir) return '';
    dir = up;
  }
}

async function readSource(source) {
  const src = source || findLocal() || REMOTE;
  if (/^https?:\/\//.test(src)) {
    const res = await fetch(src);
    if (!res.ok) throw new Error(`取 ${src} 失败：HTTP ${res.status}`);
    return { src, text: await res.text() };
  }
  return { src, text: fs.readFileSync(src, 'utf8') };
}

/** 版本段落：从「## 版本（日期）」到下一个「## 」 */
function sectionOf(text, version) {
  const lines = text.split(/\r?\n/);
  const esc = version.replace(/\./g, '\\.');
  const start = lines.findIndex((l) => new RegExp(`^##\\s+v?${esc}(\\s|（|\\(|$)`).test(l));
  if (start < 0) return null;
  const date = lines[start].match(/(\d{4}-\d{2}-\d{2})/)?.[1] ?? '';
  let end = lines.findIndex((l, i) => i > start && /^##\s/.test(l));
  if (end < 0) end = lines.length;
  return { date, body: lines.slice(start + 1, end) };
}

/** 去掉 PR 号、迁移号、契约与协议编号、行内代码标记 */
function clean(s) {
  return s
    .replace(/[（(][^（）()]*#\d+[^（）()]*[）)]/g, '')
    .replace(/#\d+/g, '')
    .replace(/[，、]?\s*迁移\s*\d{4}/g, '')
    .replace(/[，、]?\s*(契约|协议)\s*(§[\d.]+|minor\s*\d+|\d+(\.\d+)*)/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/[（(]\s*[）)]/g, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/[，、；\s]+([。；]?)$/, '$1')
    .replace(/。$/, '')
    .trim();
}

function collect(body) {
  const keep = [];
  const skipped = [];
  let section = '';
  let current = null;
  const flush = () => {
    if (!current) return;
    const text = clean(current.text);
    const usable = /^[\p{L}\p{N}「“"]/u.test(text);
    if (text) (current.skip || !usable ? skipped : keep).push({ section: current.section, text });
    current = null;
  };
  for (const line of body) {
    const h = line.match(/^###\s+(.+)/);
    if (h) {
      flush();
      section = h[1].trim();
      continue;
    }
    const item = line.match(/^\s*[-*]\s+(.+)/);
    if (item && !/^\s{2,}/.test(line)) {
      flush();
      const text = item[1];
      current = { section, text, skip: SKIP_SECTIONS.test(section) || SKIP_ITEMS.test(text) };
    } else if (current && line.trim()) {
      current.text += line.trim();
    } else {
      flush();
    }
  }
  flush();
  return { keep, skipped };
}

const q = (s) => `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;

function render(version, date, keep, skipped) {
  const out = [];
  out.push('  {');
  out.push(`    version: ${q(version)},`);
  out.push(`    date: ${q(date)},`);
  out.push(`    title: { zh: ${q(TODO)}, en: ${q(TODO)} },`);
  out.push('    items: [');
  for (const it of keep) {
    const tag = it.section ? ` // ${it.section}` : '';
    out.push(`      { zh: ${q(it.text)}, en: ${q(TODO)} },${tag}`);
  }
  for (const it of skipped) out.push(`      // 已跳过（${it.section || '无小节'}）：${it.text}`);
  out.push('    ],');
  out.push('  },');
  return out.join('\n');
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const { src, text } = await readSource(opts.source);
  const sec = sectionOf(text, opts.version);
  if (!sec) {
    console.error(`${src} 里没有 ${opts.version} 这一节`);
    process.exit(1);
  }
  const { keep, skipped } = collect(sec.body);
  const draft = render(opts.version, sec.date, keep, skipped);
  console.error(`来源：${src}；保留 ${keep.length} 条，跳过 ${skipped.length} 条`);

  if (!opts.write) {
    process.stdout.write(`${draft}\n`);
    return;
  }

  const data = fs.readFileSync(DATA, 'utf8');
  if (new RegExp(`version:\\s*'${opts.version.replace(/\./g, '\\.')}'`).test(data)) {
    console.error(`src/data/changelog.ts 已有 ${opts.version}，未写入`);
    process.exit(1);
  }
  const anchor = 'export const CHANGELOG: readonly Release[] = [\n';
  if (!data.includes(anchor)) {
    console.error('src/data/changelog.ts 里找不到 CHANGELOG 数组开头，未写入');
    process.exit(1);
  }
  fs.writeFileSync(DATA, data.replace(anchor, `${anchor}${draft}\n`));
  console.error(`已写入 src/data/changelog.ts；改写标题、英文与措辞，替换全部 ${TODO} 后再提交`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
