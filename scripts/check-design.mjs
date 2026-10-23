#!/usr/bin/env node
/**
 * 设计约束检查：组件与页面样式只能引用 src/styles/tokens.css 中的变量。
 * 报错项：写死的字号/行高/间距、字面颜色、transition: all、ease-in、字面 cubic-bezier、
 * 不走 --dur-* 的时长、非 var(--r-*) 的圆角、非 var(--shadow-*) 的阴影、非 --font-ui / --font-code 的字体，
 * 以及（STRICT 开启后）过渡期别名。
 * 确有必要的例外，在同一行加注释 design-ok 并写明原因。
 *
 * 用法：node scripts/check-design.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SKIP = new Set(['src/styles/tokens.css']);

/** 过渡期别名（tokens.css 末尾的旧名）。STRICT 打开后，组件里再出现就报错。 */
const STRICT = false;
const LEGACY = /var\(--(ink(-[234])?|bg-raised|bg-panel|accent(-ui|-text)?|line(-soft|-strong)?|hover-row|selected-(bg|ink)|selection|focus|scrollbar|font-(sans|prose|mono)|dur-[123]|sp-\d+|bar-h|page-(col|inset)|docs-main-max|fs-[a-z0-9-]+|lh-(body-lg|body-sm|mono(-nav|-sm|-xs)?|ui))\)/;

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(astro|css)$/.test(e.name)) out.push(p);
  }
  return out;
}

/** 返回 [起始行号, 样式文本] 列表；.astro 只取 <style> 块 */
function styleBlocks(file, text) {
  if (file.endsWith('.css')) return [[1, text]];
  const blocks = [];
  const re = /<style[^>]*>([\s\S]*?)<\/style>/g;
  let m;
  while ((m = re.exec(text))) {
    const line = text.slice(0, m.index).split('\n').length;
    blocks.push([line, m[1]]);
  }
  return blocks;
}

const isMask = (l) => /mask(-image)?\s*:/.test(l);
const decl = (l, re) => re.exec(l)?.[1]?.trim().replace(/\s*!important$/, '');

const RULES = [
  {
    name: '字号或行高写死（请用 --text-* / --lh-*）',
    test: (l) => /\b(font-size|line-height)\s*:[^;]*\b\d+(\.\d+)?px/.test(l) || /\bfont\s*:[^;]*\b\d+(\.\d+)?px/.test(l),
  },
  {
    name: '间距写死（请用 --space-*）',
    test: (l) => {
      const m = /\b(padding|margin|gap|column-gap|row-gap)(-[a-z-]+)?\s*:([^;]+)/.exec(l);
      if (!m) return false;
      const px = m[3].match(/\b\d+(\.\d+)?px\b/g) ?? [];
      return px.some((v) => !['0px', '1px', '2px'].includes(v));
    },
  },
  {
    name: '字面颜色（请用颜色变量）',
    test: (l) => !isMask(l) && /(#[0-9a-fA-F]{3,8}\b|\b(rgb|rgba|hsl|hsla|oklch)\()/.test(l),
  },
  { name: 'transition: all', test: (l) => /transition(-property)?\s*:[^;]*\ball\b/.test(l) },
  { name: '禁止 ease-in（进出场用 --ease-out，移动用 --ease-in-out）', test: (l) => /\bease-in\b(?!-out)/.test(l) },
  { name: '字面 cubic-bezier（请用 --ease-*）', test: (l) => /cubic-bezier\(/.test(l) },
  {
    name: '时长不走 --dur-*',
    test: (l) =>
      /\b(transition|animation)(-duration|-delay)?\s*:/.test(l) &&
      (l.replace(/var\([^)]*\)/g, '').match(/(?<![\w.-])\d*\.?\d+m?s\b/g) ?? []).some((v) => !/^0m?s$/.test(v)),
  },
  {
    name: '圆角只允许 var(--r-*) 与 0',
    test: (l) => {
      const v = decl(l, /border(?:-[a-z]+)*-radius\s*:\s*([^;]+)/);
      return v != null && !/^(0(px)?|inherit|(var\(--r-[a-z]+\)\s*)+)$/.test(v);
    },
  },
  {
    name: '阴影只允许 var(--shadow-*) 与 none',
    test: (l) => {
      const v = decl(l, /\bbox-shadow\s*:\s*([^;]+)/);
      return v != null && !/^(none|var\(--shadow-[a-z]+\))$/.test(v);
    },
  },
  {
    name: '字体只允许 var(--font-ui) / var(--font-code)',
    test: (l) => {
      const fam = decl(l, /\bfont-family\s*:\s*([^;]+)/);
      if (fam != null) return !(STRICT ? /^(inherit|var\(--font-(ui|code)\))$/ : /^(inherit|var\(--font-(ui|code|sans|prose|mono)\))$/).test(fam);
      if (/\bfont\s*:/.test(l) && !/\bfont\s*:\s*inherit/.test(l) && /var\(--font-/.test(l)) {
        return !/var\(--font-(ui|code)\)/.test(l.replace(/var\(--font-(sans|prose|mono)\)/g, STRICT ? '' : 'var(--font-ui)'));
      }
      return false;
    },
  },
  { name: '过渡期别名已删除，请改用新 token', test: (l) => STRICT && LEGACY.test(l) },
];

const problems = [];
for (const file of walk(path.join(root, 'src'))) {
  const rel = path.relative(root, file).split(path.sep).join('/');
  if (SKIP.has(rel)) continue;
  const text = fs.readFileSync(file, 'utf8');
  for (const [start, css] of styleBlocks(file, text)) {
    css.split('\n').forEach((line, i) => {
      if (line.includes('design-ok') || /^\s*(\/\*|\*)/.test(line)) return;
      for (const r of RULES) if (r.test(line)) problems.push(`${rel}:${start + i}  ${r.name}  ${line.trim()}`);
    });
  }
}

if (problems.length) {
  console.error(`设计约束检查未通过（${problems.length} 处）：\n` + problems.join('\n'));
  process.exit(1);
}
console.log('设计约束检查通过');
