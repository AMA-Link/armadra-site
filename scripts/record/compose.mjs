// 把 record.mjs 抓到的帧剪成循环 WebM（VP8）与 poster：只截取几个关键片段，
// 每段都按原速播放，段与段之间直接切，不加速——终端里的字不会闪得看不清。
// 用法：node compose.mjs <run 目录> <输出前缀> [宽=1920]
// 环境变量：BITRATE（缺省 900k）、HOLD（结尾停留秒数，缺省 5）
import { spawn } from "node:child_process";
import { copyFileSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join, resolve } from "node:path";

const run = resolve(process.argv[2]);
const prefix = resolve(process.argv[3]);
const width = Number(process.argv[4] ?? 1920);
const FPS = 12;
const HOLD = Number(process.env.HOLD ?? 5);
const ffmpeg = join(homedir(), "Library/Caches/ms-playwright/ffmpeg-1011/ffmpeg-mac");

const { events, frames } = JSON.parse(readFileSync(join(run, "events.json"), "utf8"));
const first = (k) => events.find((e) => e.kind === k)?.at;
const firstPrefix = (p) => events.find((e) => e.kind.startsWith(p))?.at;
const start = first("start");
const end = first("end");
const s = 1000;

// 关键片段（墙钟毫秒）；缺了哪个事件就跳过那一段
const wanted = [
  ["开场与开始输入", first("type-begin") - 2 * s, first("type-begin") + 5 * s],
  ["输入完成、主节点开始回答", first("type-end") - 1 * s, first("type-end") + 6 * s],
  ["主节点说明分工、派出三个子节点", first("dispatched") - 12 * s, first("dispatched") + 6 * s],
  // 拉近到每个子节点后看 5 秒（只取前三次，一人一次）
  ...events.filter((e) => e.kind.startsWith("focus:")).slice(0, 3).map((e) => [e.kind.slice(6), e.at + 0.8 * s, e.at + 5.8 * s]),
  ["回到主节点看汇总", (first("focus-lead") ?? first("claude-done") - 14 * s) + 0.8 * s, end],
].filter(([, a, b]) => Number.isFinite(a) && Number.isFinite(b) && b > a);

// 合并重叠片段，裁进录制范围
const segments = [];
for (const [name, a0, b0] of wanted.sort((x, y) => x[1] - y[1])) {
  const a = Math.max(start, a0);
  const b = Math.min(end, b0);
  const last = segments.at(-1);
  if (last && a <= last.b) last.b = Math.max(last.b, b), (last.name += ` + ${name}`);
  else segments.push({ name, a, b });
}

// 每段按原速取帧：输出第 n 帧对应墙钟 a + n/FPS 秒，取不晚于它的最近一帧
const picks = [];
let i = 0;
for (const { a, b } of segments) {
  for (let t = a; t <= b; t += 1000 / FPS) {
    while (i + 1 < frames.length && frames[i + 1][0] <= t) i += 1;
    while (i > 0 && frames[i][0] > t) i -= 1;
    picks.push(frames[i][1]);
  }
}
for (let k = 0; k < HOLD * FPS; k += 1) picks.push(frames[frames.length - 1][1]);
for (const g of segments) console.log(`片段 ${((g.b - g.a) / 1000).toFixed(1)}s：${g.name}`);
console.log(`输出 ${picks.length} 帧，约 ${(picks.length / FPS).toFixed(1)} 秒（原速，段间直接切）`);

const encode = (args) =>
  new Promise((done, fail) => {
    const p = spawn(ffmpeg, args, { stdio: ["pipe", "ignore", "inherit"] });
    p.on("exit", (c) => (c === 0 ? done() : fail(new Error(`ffmpeg ${c}`))));
    (async () => {
      for (const f of picks) if (!p.stdin.write(readFileSync(f))) await new Promise((r) => p.stdin.once("drain", r));
      p.stdin.end();
    })();
  });
await encode([
  "-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "mjpeg", "-i", "pipe:0",
  "-vf", `scale=${width}:-2`, "-c:v", "libvpx", "-b:v", process.env.BITRATE ?? "900k", "-maxrate", "1400k", "-bufsize", "2800k",
  "-qmin", "8", "-qmax", "48", "-auto-alt-ref", "0", "-deadline", "good", "-cpu-used", "4", "-threads", "8", "-an", `${prefix}.webm`,
]);
copyFileSync(frames[frames.length - 1][1], `${prefix}-poster-full.jpg`);
console.log("完成", `${prefix}.webm`);
