// 把 record.mjs 抓到的帧按段落变速合成循环 WebM（VP8）与 poster。
// 打字、权限请求前后、结尾按原速；其余按统一倍速压进剩余时长。
// 用法：node compose.mjs <run 目录> <输出前缀> [总时长秒=32] [宽=1600]；码率用环境变量 BITRATE（缺省 1000k）
import { spawn } from "node:child_process";
import { copyFileSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join, resolve } from "node:path";

const run = resolve(process.argv[2]);
const prefix = resolve(process.argv[3]);
const total = Number(process.argv[4] ?? 32);
const width = Number(process.argv[5] ?? 1600);
const FPS = 12;
const ffmpeg = join(homedir(), "Library/Caches/ms-playwright/ffmpeg-1011/ffmpeg-mac");

const { events, frames } = JSON.parse(readFileSync(join(run, "events.json"), "utf8"));
const at = (k) => events.find((e) => e.kind === k)?.at;
const start = at("start");
const end = at("end");
// 原速窗口：开头两秒、打字全程、每次权限请求前后、结尾三秒
const live = [[start, start + 2000], [at("type-begin"), at("type-end") + 1500]];
const firstAsk = events.find((e) => e.kind === "approval-shown");
if (firstAsk) live.push([firstAsk.at - 500, firstAsk.at + 4000]);
if (at("nudge-begin")) live.push([at("nudge-begin"), at("nudge-end") + 1500]);
// 结尾多停一会，让总结能读完
live.push([Math.min(end - 3000, at("claude-done") ?? end), end]);
const inLive = (t) => live.some(([a, b]) => a !== undefined && t >= a && t <= b);
const liveMs = live.reduce((s, [a, b]) => s + (a === undefined ? 0 : Math.max(0, Math.min(b, end) - Math.max(a, start))), 0);
const restMs = end - start - liveMs;
const restOut = Math.max(4, total - liveMs / 1000);
// 打字太长时按 3 倍速，保证总长
const typeMs = (at("type-end") ?? start) - (at("type-begin") ?? start);
const liveSpeed = liveMs / 1000 > total * 0.6 ? 3 : 1;
const speed = restMs / 1000 / Math.max(2, total - liveMs / 1000 / liveSpeed);
console.log({ frames: frames.length, wallSec: (end - start) / 1000, liveSec: liveMs / 1000, typeSec: typeMs / 1000, speed: speed.toFixed(1), liveSpeed, restOut });

// 逐个输出帧，按当前所处段落推进墙钟
const picks = [];
let t = start;
let i = 0;
while (t <= end) {
  while (i + 1 < frames.length && frames[i + 1][0] <= t) i += 1;
  picks.push(frames[i][1]);
  t += (1000 / FPS) * (inLive(t) ? liveSpeed : speed);
}
// 最后停在总结画面上几秒，循环回开头前读得完
const HOLD = Number(process.env.HOLD ?? 5);
for (let k = 0; k < HOLD * FPS; k += 1) picks.push(frames[frames.length - 1][1]);
console.log(`输出 ${picks.length} 帧，约 ${(picks.length / FPS).toFixed(1)} 秒`);

const encode = (args) =>
  new Promise((done, fail) => {
    const p = spawn(ffmpeg, args, { stdio: ["pipe", "inherit", "inherit"] });
    p.on("exit", (c) => (c === 0 ? done() : fail(new Error(`ffmpeg ${c}`))));
    (async () => {
      for (const f of picks) if (!p.stdin.write(readFileSync(f))) await new Promise((r) => p.stdin.once("drain", r));
      p.stdin.end();
    })();
  });
await encode([
  "-y", "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "mjpeg", "-i", "pipe:0",
  "-vf", `scale=${width}:-2`, "-c:v", "libvpx", "-b:v", process.env.BITRATE ?? "1000k", "-maxrate", "1400k", "-bufsize", "2800k",
  "-qmin", "8", "-qmax", "48", "-auto-alt-ref", "0", "-deadline", "good", "-cpu-used", "4", "-threads", "8", "-an", `${prefix}.webm`,
]);
// poster：结尾前一刻的画面（各节点都有内容）
copyFileSync(picks[Math.max(0, picks.length - FPS * 2)], `${prefix}-poster-full.jpg`);
console.log("完成", `${prefix}.webm`);
