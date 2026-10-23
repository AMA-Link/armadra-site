#!/usr/bin/env node
/**
 * 首页圆形插画：从首页录屏里抽帧、裁成正方形、转灰度，输出到 public/media/circles/。
 * 画面全部来自真实录屏，不加任何绘制内容。圆形裁切与浅色主题反相由 CSS 完成。
 *
 * 用法：node scripts/record/circles.mjs [录屏路径]
 * 依赖：Playwright 自带的 ffmpeg（~/Library/Caches/ms-playwright/ffmpeg-*）与 macOS 的 sips。
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const src = process.argv[2] ?? path.join(root, 'public/media/armadra-demo-tree.webm');
const out = path.join(root, 'public/media/circles');
const cache = path.join(os.homedir(), 'Library/Caches/ms-playwright');
const dir = fs.readdirSync(cache).find((d) => d.startsWith('ffmpeg-'));
if (!dir) throw new Error('找不到 Playwright 的 ffmpeg，先运行一次 playwright install ffmpeg');
const ffmpeg = path.join(cache, dir, 'ffmpeg-mac');

/** 名称、取帧时间（秒）、裁切左上角与边长（像素，源画面 1920×1200） */
const CROPS = [
  ['canvas', 56.5, 360, 0, 1200], // 协作示例：全貌
  ['cli', 14, 80, 40, 960], // 熟悉的工具：节点里运行的 CLI
  ['link', 56.5, 640, 560, 640], // 上下文共享：主节点与子节点之间的连线
  ['message', 44, 540, 175, 850], // 消息与交接：收件箱消息与汇总
  ['lead', 56.5, 620, 100, 700], // 任务协调：主节点
  ['diff', 32, 430, 330, 760], // 开发工具：代码差异与测试结果
  ['corner', 56.5, 1180, 500, 700], // 部署与数据：子节点与小地图
];

fs.mkdirSync(out, { recursive: true });
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'armadra-circles-'));
for (const [name, t, x, y, w] of CROPS) {
  const png = path.join(tmp, `${name}.png`);
  execFileSync(ffmpeg, ['-v', 'error', '-y', '-ss', String(t), '-i', src, '-vf', `crop=${w}:${w}:${x}:${y},scale=720:720:flags=lanczos,format=gray`, '-frames:v', '1', png]);
  execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '80', png, '--out', path.join(out, `${name}.jpg`)], { stdio: 'ignore' });
  console.log(`${name}.jpg`);
}
fs.rmSync(tmp, { recursive: true, force: true });
