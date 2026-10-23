#!/usr/bin/env node
/**
 * 对比度检查：读 src/styles/tokens.css 的深浅两套值，按 WCAG 相对亮度公式算文字对表面的比值。
 * 半透明颜色先叠到所在表面上再算。门槛：正文 ≥ 11:1，次要文字与品牌文字 ≥ 5:1，
 * 状态文字与实底主按钮 ≥ 4.5:1，焦点环 ≥ 3:1。
 *
 * 用法：node scripts/check-contrast.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const css = fs.readFileSync(path.join(root, 'src/styles/tokens.css'), 'utf8');

/** 取出选择器对应的第一个声明块（不含嵌套），解析成 { 变量名: 值 } */
function block(selector) {
  const i = css.indexOf(selector + ' {');
  if (i < 0) throw new Error(`tokens.css 里找不到 ${selector}`);
  const body = css.slice(i + selector.length + 2, css.indexOf('\n}', i));
  const vars = {};
  for (const m of body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) vars[m[1]] = m[2].trim();
  return vars;
}

const dark = block(':root');
const light = { ...dark, ...block(':root[data-theme="light"]') };

function resolve(vars, v, depth = 0) {
  const m = /^var\((--[\w-]+)\)$/.exec(v);
  if (!m) return v;
  if (depth > 8) throw new Error(`变量循环引用：${v}`);
  return resolve(vars, vars[m[1]], depth + 1);
}

/** → [r, g, b, a]，0–255 与 0–1 */
function parse(v) {
  let m = /^#([0-9a-f]{6})$/i.exec(v);
  if (m) return [0, 2, 4].map((o) => parseInt(m[1].slice(o, o + 2), 16)).concat(1);
  m = /^rgb\(\s*(\d+)\s+(\d+)\s+(\d+)\s*(?:\/\s*([\d.]+)%)?\s*\)$/.exec(v);
  if (m) return [+m[1], +m[2], +m[3], m[4] == null ? 1 : +m[4] / 100];
  throw new Error(`无法解析颜色：${v}`);
}

const over = ([r, g, b, a], [br, bg, bb]) => [r * a + br * (1 - a), g * a + bg * (1 - a), b * a + bb * (1 - a)];
const lum = (c) => {
  const [r, g, b] = c.map((x) => {
    const s = x / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

/** [前景, 表面列表, 门槛, 说明] */
const CHECKS = [
  ['--text', ['--bg', '--panel'], 11, '正文'],
  ['--text', ['--card'], 7, '卡片上的正文'],
  ['--muted-foreground', ['--bg', '--panel', '--card'], 5, '次要文字'],
  ['--brand-text', ['--bg', '--panel', '--card', '--surface-raised'], 5, '品牌文字'],
  ['--success-text', ['--bg', '--card'], 4.5, '成功文字'],
  ['--danger-text', ['--bg', '--card'], 4.5, '错误文字'],
  ['--code-plain', ['--code-bg'], 4.5, '代码正文'],
  ['--code-comment', ['--code-bg'], 4.5, '代码注释'],
  ['--code-keyword', ['--code-bg'], 4.5, '代码关键字'],
  ['--code-string', ['--code-bg'], 4.5, '代码字符串'],
  ['--on-accent', ['--brand-solid'], 4.5, '主按钮文字'],
  ['--focus-ring', ['--bg', '--card'], 3, '焦点环'],
  ['--brand', ['--bg'], 3, '品牌指示器'],
];

const problems = [];
for (const [name, vars] of [['深色', dark], ['浅色', light]]) {
  const get = (k) => parse(resolve(vars, vars[k]));
  for (const [fg, surfaces, min, label] of CHECKS) {
    for (const s of surfaces) {
      const surface = get(s).slice(0, 3);
      const r = ratio(over(get(fg), surface), surface);
      if (r < min) problems.push(`${name} ${label} ${fg} 对 ${s}：${r.toFixed(2)} < ${min}`);
    }
  }
}

if (problems.length) {
  console.error(`对比度检查未通过（${problems.length} 处）：\n` + problems.join('\n'));
  process.exit(1);
}
console.log('对比度检查通过');
