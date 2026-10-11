// 官网首页录屏：在隔离数据目录里跑真实 Armadra（worktree 构建的 core + Vite 页面）。
// 画布上起初只有一个 Claude Code（主），全部 Agent 用「完全自动」（bypass）启动。
// 在 Claude 里输入一条需求：它先说明怎么分工，再用 `canvas team` 一次派出三个 Codex
// （软件自己建子节点和派发线、在子节点空闲时投递任务），三个 Codex 并行实现、跑测试、
// 用 canvas post 回报；收件箱提醒唤醒 Claude，它跑全部测试并总结。
// 无头 Chrome 以 2 倍设备像素逐帧截图，交给 compose.mjs 变速合成循环 WebM 与 poster。
//
// 隔离与安全照 tools/probes/agent-e2e：数据目录、项目、浏览器 profile 全在 mktemp；
// Codex 用临时 CODEX_HOME（只复制 auth.json）；Claude 用操作员自己的登录（钥匙串），
// 注入经数据目录里的启动器，不写 ~/.claude；跑前跑后比对 CLI 配置指纹。
//
// 用法：node record.mjs <Armadra worktree> <输出目录>
import { execFile, execFileSync, spawn } from "node:child_process";
import { once } from "node:events";
import {
  chmodSync,
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  realpathSync,
  rmSync,
  writeFileSync,
  createWriteStream,
} from "node:fs";
import { homedir, tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { randomUUID } from "node:crypto";
import { DatabaseSync } from "node:sqlite";

const root = resolve(process.argv[2] ?? "");
const out = resolve(process.argv[3] ?? join(process.cwd(), "out"));
mkdirSync(join(out, "frames"), { recursive: true });
const { fingerprint } = await import(join(root, "tools/probes/agent-e2e/safety.mjs"));
const { stepTrustDialog } = await import(join(root, "tools/probes/agent-e2e/trust-dialog.mjs"));

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const t0 = Date.now();
const log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(1)}s]`, ...a);
const cleanups = [];
const events = []; // { at, kind } 合成时决定哪些段落按原速
const mark = (kind) => {
  events.push({ at: Date.now(), kind });
  log("事件", kind);
};
async function waitFor(what, test, { timeout = 60_000, interval = 500 } = {}) {
  const end = Date.now() + timeout;
  for (;;) {
    const v = await test();
    if (v) return v;
    if (Date.now() > end) throw new Error(`等待超时：${what}`);
    await sleep(interval);
  }
}

const before = fingerprint();
try {
  await main();
} finally {
  for (const fn of cleanups.reverse()) {
    try {
      await fn();
    } catch {}
  }
  const after = fingerprint();
  const changed = Object.keys(before).filter((k) => before[k] !== after[k]);
  log(changed.length ? `⚠ CLI 配置有变化：${changed.join(", ")}` : "CLI 配置指纹前后一致");
}

async function main() {
  /* ------------------------------- 演示项目 ------------------------------- */
  // 项目放在短路径下：终端与 Codex 状态栏里显示的就是它
  const scratch = mkdtempSync("/tmp/aw-");
  cleanups.push(() => rmSync(scratch, { recursive: true, force: true, maxRetries: 20 }));
  const project = join(scratch, "web-app");
  mkdirSync(join(project, "src"), { recursive: true });
  mkdirSync(join(project, "test"), { recursive: true });
  writeFileSync(join(project, "package.json"), JSON.stringify({ name: "web-app", private: true, type: "module", scripts: { test: "node --test" } }, null, 2) + "\n");
  writeFileSync(
    join(project, "src/session.js"),
    `const DAY = 24 * 60 * 60;

/** Creates a session token and the cookie that carries it. */
export function createSession(user, opts = {}) {
  const token = \`\${user.id}.\${Date.now().toString(36)}\`;
  const maxAge = DAY;
  return { token, cookie: { name: "sid", value: token, httpOnly: true, maxAge } };
}
`,
  );
  writeFileSync(
    join(project, "src/password.js"),
    `/** Returns true when the password is acceptable. */
export function validatePassword(password) {
  return typeof password === "string" && password.length >= 6;
}
`,
  );
  writeFileSync(
    join(project, "src/email.js"),
    `/** Normalizes an email address for storage. */
export function normalizeEmail(email) {
  return email;
}
`,
  );
  writeFileSync(
    join(project, "test/session.test.js"),
    `import { test } from "node:test";
import assert from "node:assert/strict";
import { createSession } from "../src/session.js";

test("session cookie is http-only", () => {
  const { cookie } = createSession({ id: "u1" });
  assert.equal(cookie.httpOnly, true);
});
`,
  );
  writeFileSync(join(project, "README.md"), "# web-app\n\nLogin and sessions.\n");
  writeFileSync(join(project, ".gitignore"), "node_modules/\n.armadra/\n");
  const git = (...a) => execFileSync("git", ["-C", project, ...a], { stdio: "ignore" });
  git("init", "-q");
  git("-c", "user.name=Armadra", "-c", "user.email=demo@armadra.com", "add", ".");
  git("-c", "user.name=Armadra", "-c", "user.email=demo@armadra.com", "commit", "-qm", "feat: sessions");
  // 一律用真实路径：/tmp 是 /private/tmp 的链接，文件监听与差异按真实路径对账
  const projectReal = realpathSync(project);

  /* ----------------------------- Codex 临时家目录 ----------------------------- */
  const codexHome = join(scratch, "codex-home");
  mkdirSync(codexHome);
  copyFileSync(join(homedir(), ".codex/auth.json"), join(codexHome, "auth.json"));
  writeFileSync(
    join(codexHome, "config.toml"),
    `model_reasoning_effort = "low"\ncheck_for_update_on_startup = false\n\n[projects."${projectReal}"]\ntrust_level = "trusted"\n`,
  );
  log("Codex 预热（迁移临时 CODEX_HOME 的库）");
  execFileSync("codex", ["exec", "--skip-git-repo-check", "Reply with just OK."], {
    cwd: project,
    env: { ...process.env, CODEX_HOME: codexHome },
    stdio: "ignore",
    timeout: 180_000,
  });
  const claudeInstallHome = join(scratch, "claude-install-home");
  mkdirSync(claudeInstallHome);
  const shell = join(scratch, "rec-shell");
  writeFileSync(shell, `#!/bin/zsh -f\nexport CODEX_HOME='${codexHome}'\nunset CLAUDE_CONFIG_DIR\n# core 的 XDG 指向临时目录（隔离它自己的迁移查找）；终端里还原，mise 等工具才找得到安装\nunset XDG_CONFIG_HOME XDG_DATA_HOME\nexport PS1='%~ %# '\nexport PATH='${process.execPath.replace(/\/node$/, "")}':$PATH\nexec /bin/zsh -f "$@"\n`);
  chmodSync(shell, 0o755);

  /* --------------------------------- core --------------------------------- */
  const binary = join(root, "apps/desktop/out/core/main.js");
  if (!existsSync(binary)) throw new Error(`core 未构建：${binary}`);
  const data = join(scratch, "runtime");
  mkdirSync(data);
  cleanups.push(() => execFileSync("tmux", ["-S", join(data, "tmux.sock"), "kill-server"], { stdio: "ignore" }));
  const environment = {
    ...process.env,
    ARMADRA_DATA_DIR: data,
    ARMADRA_LOG: "info",
    CODEX_HOME: codexHome,
    CLAUDE_CONFIG_DIR: claudeInstallHome,
    XDG_CONFIG_HOME: join(scratch, "xdg"),
    XDG_DATA_HOME: join(scratch, "xdg-data"),
    COPILOT_HOME: join(scratch, "copilot-home"),
    PI_CODING_AGENT_DIR: join(scratch, "pi-agent"),
    SHELL: shell,
    ARMADRA_LOOPBACK_OWNER: "1",
    // 真 node 放最前、去掉 mise 的 shim：Codex 的沙箱里 shim 跑不起来
    PATH: [process.execPath.replace(/\/node$/, ""), ...String(process.env.PATH).split(":").filter((d) => !d.includes("mise/shims"))].join(":"),
  };
  delete environment.TMUX;
  delete environment.TMUX_PANE;
  delete environment.CLAUDECODE;
  const coreLog = createWriteStream(join(out, "core.log"));
  const core = spawn(process.execPath, [binary, "--listen", "tcp:127.0.0.1:0", "--data-dir", data], {
    cwd: root,
    stdio: ["ignore", "pipe", "pipe"],
    env: environment,
  });
  cleanups.push(() => core.kill("SIGKILL"));
  core.stdout.pipe(coreLog, { end: false });
  core.stderr.pipe(coreLog, { end: false });
  const origin = await waitFor("core 就绪", () => {
    if (core.exitCode !== null) throw new Error("core 退出，见 core.log");
    try {
      return JSON.parse(readFileSync(join(data, "endpoints.json"), "utf8")).runtime.http;
    } catch {
      return undefined;
    }
  }, { timeout: 30_000, interval: 100 });
  const api = async (path, init = {}) => {
    const r = await fetch(new URL(path, origin), {
      headers: { "Content-Type": "application/json" },
      ...init,
      ...(init.body === undefined ? {} : { body: JSON.stringify(init.body) }),
    });
    const text = await r.text();
    if (!r.ok) throw new Error(`${init.method ?? "GET"} ${path} → ${r.status} ${text}`);
    return text === "" ? null : JSON.parse(text);
  };
  await api("/api/settings", { method: "PATCH", body: { terminal: { ecoMode: false } } });
  for (const agent of ["claude", "codex"]) await api(`/api/agents/${agent}/integration/install`, { method: "POST" });
  const runDir = join(data, "integration", "run");
  const agents = await api("/api/agents");
  if (agents.find((a) => a.id === "claude")?.launcher !== join(runDir, "claude"))
    throw new Error("Claude 没有经临时数据目录里的启动器注入，不能用真实配置目录");
  log("core", origin);

  /* ------------------------------ 工作空间与画布 ------------------------------ */
  const workspace = await api("/api/workspaces", {
    method: "POST",
    body: { name: "web-app", rootPath: projectReal, permissions: { read: true, write: true, execute: true } },
  });
  const boards = await api(`/api/workspaces/${workspace.id}/boards`);
  const board = boards[0] ?? (await api(`/api/workspaces/${workspace.id}/boards`, { method: "POST", body: { name: "Remember me" } }));
  const documentPath = `/api/workspaces/${workspace.id}/boards/${board.id}/document`;
  const initial = await api(documentPath);
  const stamp = new Date().toISOString();
  const node = (type, title, x, y, w, h, data, color = "#0a84ff") => ({
    id: randomUUID(), boardId: board.id, type, title, color, position: { x, y }, size: { width: w, height: h },
    labels: [], note: "", data, createdAt: stamp, updatedAt: stamp,
  });
  const claude = node("terminal", "Claude Code · lead", 0, 0, 760, 820, { kind: "terminal", agent: { id: "claude", permissionMode: "full-auto" } });
  await api(documentPath, {
    method: "PUT",
    body: {
      expectedUpdatedAt: initial.board.updatedAt,
      nodes: [claude],
      edges: [],
      viewport: { x: 60, y: 30, zoom: 1 },
      whiteboard: "",
    },
  });

  const db = new DatabaseSync(join(data, "canvas.db"), { readOnly: true });
  cleanups.push(() => db.close());
  const one = (sql, ...p) => db.prepare(sql).get(...p);
  const liveSession = (id) => one("SELECT * FROM terminal_sessions WHERE owner_node_id = ? ORDER BY (status = 'running') DESC, generation DESC, created_at DESC LIMIT 1", id);
  const status = (id) => one("SELECT * FROM agent_status WHERE node_id = ?", id);
  const screen = async (id, lines = 60) => {
    const s = liveSession(id);
    if (!s || s.status !== "running") return "";
    try {
      return (await api(`/api/terminals/${s.id}/capture?lines=${lines}`)).data;
    } catch {
      return "";
    }
  };

  /* ------------------------------ Vite 与 Chrome ------------------------------ */
  const port = 5600 + Math.floor(Math.random() * 300);
  const vite = spawn("pnpm", ["--filter", "@armadra/web", "exec", "vite", "--port", String(port), "--strictPort"], {
    cwd: root, stdio: ["ignore", "pipe", "pipe"], env: environment, detached: true,
  });
  cleanups.push(() => {
    try { process.kill(-vite.pid, "SIGKILL"); } catch { vite.kill("SIGKILL"); }
  });
  let served = false;
  vite.stdout.on("data", (c) => { if (String(c).includes("ready in")) served = true; });
  await waitFor("Vite 就绪", () => served || vite.exitCode !== null, { timeout: 90_000, interval: 100 });
  if (vite.exitCode !== null) throw new Error("Vite 退出");
  const pageUrl = `http://127.0.0.1:${port}/?workspace=${workspace.id}&board=${board.id}`;

  const profile = mkdtempSync(join(tmpdir(), "armadra-site-rec-profile-"));
  cleanups.push(() => rmSync(profile, { recursive: true, force: true, maxRetries: 20 }));
  const browser = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", [
    "--headless=new", "--use-mock-keychain", "--password-store=basic", "--no-first-run", "--no-default-browser-check",
    "--disable-background-networking", "--hide-scrollbars", "--font-render-hinting=none",
    "--remote-debugging-address=127.0.0.1", "--remote-debugging-port=0", `--user-data-dir=${profile}`, "about:blank",
  ], { stdio: ["ignore", "ignore", "pipe"] });
  cleanups.push(() => browser.kill("SIGKILL"));
  const devtools = await waitFor("Chrome 调试端口", () => {
    try { return readFileSync(join(profile, "DevToolsActivePort"), "utf8").split("\n")[0].trim(); } catch { return undefined; }
  }, { timeout: 20_000, interval: 100 });
  const target = await (await fetch(`http://127.0.0.1:${devtools}/json/new?about:blank`, { method: "PUT" })).json();
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await once(socket, "open");
  let seq = 0;
  const pending = new Map();
  const listeners = [];
  socket.addEventListener("message", (event) => {
    const m = JSON.parse(event.data);
    if (m.id !== undefined) {
      const w = pending.get(m.id);
      if (w) { pending.delete(m.id); w(m); }
      return;
    }
    for (const l of listeners) l(m);
  });
  const call = (method, params = {}) => new Promise((done, fail) => {
    const id = (seq += 1);
    pending.set(id, (m) => (m.error ? fail(new Error(`${method}: ${m.error.message}`)) : done(m.result)));
    socket.send(JSON.stringify({ id, method, params }));
  });
  const evaluate = async (expr) => {
    const a = await call("Runtime.evaluate", { expression: `(() => { ${expr} })()`, returnByValue: true, awaitPromise: true });
    if (a.exceptionDetails) throw new Error(a.exceptionDetails.text ?? "页面表达式抛错");
    return a.result.value;
  };
  const W = 1440, H = 900;
  await call("Page.enable");
  await call("Runtime.enable");
  await call("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 2, mobile: false });
  await call("Page.navigate", { url: pageUrl });
  await waitFor("画布节点渲染", () => evaluate(`return document.querySelectorAll(".react-flow__node").length >= 1;`), { timeout: 90_000 });

  await waitFor("启动画面消失", async () => !(await evaluate(`return document.getElementById("splash-root") ? 1 : 0;`)), { timeout: 30_000, interval: 250 });

  const click = async (x, y) => {
    for (const type of ["mousePressed", "mouseReleased"])
      await call("Input.dispatchMouseEvent", { type, x, y, button: "left", buttons: type === "mousePressed" ? 1 : 0, clickCount: 1 });
  };
  const nodePoint = (id) => evaluate(`
    const n = document.querySelector('.react-flow__node[data-id="${id}"]');
    if (!n) return null;
    const a = n.querySelector('.xterm-screen') ?? n.querySelector('.xterm') ?? n;
    const r = a.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height * 0.6 };`);
  const focusNode = async (id) => {
    const p = await waitFor(`节点 ${id} 可见`, () => nodePoint(id), { timeout: 10_000, interval: 200 });
    await click(p.x, p.y);
    await sleep(250);
  };
  const key = async (k, code) => {
    await call("Input.dispatchKeyEvent", { type: "rawKeyDown", key: k, code: k, windowsVirtualKeyCode: code });
    await call("Input.dispatchKeyEvent", { type: "keyUp", key: k, code: k, windowsVirtualKeyCode: code });
  };
  const enter = async () => {
    await call("Input.dispatchKeyEvent", { type: "keyDown", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13, text: "\r" });
    await call("Input.dispatchKeyEvent", { type: "keyUp", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
  };
  const typeSlow = async (text, ms = 28) => {
    for (const ch of text) {
      await call("Input.insertText", { text: ch });
      await sleep(ms);
    }
  };

  /* ----------------------------- 等两个 Agent 起来 ----------------------------- */
  let trusted = false;
  await waitFor("Claude 起到提示符", async () => {
    const text = await screen(claude.id);
    if (!trusted) {
      const step = await stepTrustDialog(text, {
        capture: () => screen(claude.id),
        focus: () => focusNode(claude.id),
        down: () => key("ArrowDown", 40),
        enter,
        type: (v) => call("Input.insertText", { text: v }),
        sleep,
      });
      if (step === "answered") { trusted = true; log("已在页面里答 Claude 的目录信任"); await sleep(1500); return false; }
    }
    return /for shortcuts|bypass permissions|accept edits/i.test(text) || status(claude.id)?.state === "idle";
  }, { timeout: 180_000, interval: 800 });

  await sleep(4000);

  // 收起侧栏，给画布腾地方（软件自己的按钮）
  await evaluate(`const b = document.querySelector('button[aria-label="收起侧栏"], button[aria-label="Collapse sidebar"]'); b?.click(); return !!b;`).then((ok) => log("收起侧栏", ok));
  await sleep(1200);

  /* ------------------------------- 开始抓帧 ------------------------------- */
  const frames = []; // { at, file }
  let frameNo = 0;
  let capturing = true;
  // 屏幕投射只给 CSS 像素；逐帧截图拿到 2 倍设备像素，文字才清楚
  const captureLoop = (async () => {
    while (capturing) {
      const began = Date.now();
      try {
        const shot = await call("Page.captureScreenshot", { format: "jpeg", quality: 80, captureBeyondViewport: false });
        const file = join(out, "frames", `${String((frameNo += 1)).padStart(6, "0")}.jpg`);
        writeFileSync(file, Buffer.from(shot.data, "base64"));
        frames.push({ at: began, file });
      } catch {}
      const spent = Date.now() - began;
      if (spent < 110) await sleep(110 - spent);
    }
  })();
  mark("start");
  await sleep(2500);

  /* ------------------------------ 给 Claude 派活 ------------------------------ */
  const prompt =
    "You're the lead for three Codex workers. First tell me in two or three sentences how you'll split this work. " +
    "Then open all three at once with one `armadra-hook canvas team --permission-mode full-auto` command, one --member \"codex|<title>|<task>\" each: " +
    "src/session.js — add a remember-me option, 30-day cookie when opts.remember is true, otherwise 1 day; " +
    "src/password.js — require at least 10 characters with a letter and a digit; " +
    "src/email.js — trim and lowercase, throw on an invalid address. " +
    "Each task should say: add tests, run `node --test`, then report to your main with `armadra-hook canvas post`. " +
    "After that, wait — you'll be notified when reports arrive. When all three are in, run `node --test` yourself and give me a short summary.";
  await focusNode(claude.id);
  mark("type-begin");
  await typeSlow(prompt, 22);
  await sleep(600);
  await enter();
  mark("type-end");

  /* ---------------------- 守着：等派发、三人回报与总结 ---------------------- */
  const subs = () => db.prepare("SELECT id, title FROM nodes WHERE board_id = ? AND id != ? AND type = 'terminal'").all(board.id, claude.id);
  // 镜头：用软件自己的「居中到节点」事件与 ⌘/Ctrl 滚轮缩放（与人在画布上操作同一条路）
  const zoomNow = () => evaluate(`const b = [...document.querySelectorAll('button')].find((x) => /^适应$|^Fit$/.test(x.getAttribute('aria-label') ?? '')); return b ? parseInt(b.textContent, 10) : 100;`);
  const zoomTo = async (target) => {
    for (let k = 0; k < 40; k += 1) {
      const z = await zoomNow();
      if (Math.abs(z - target) <= 4) return;
      await call("Input.dispatchMouseEvent", { type: "mouseWheel", x: W / 2, y: H / 2, deltaX: 0, deltaY: z < target ? -60 : 60, modifiers: 2 });
      await sleep(60);
    }
  };
  const centerOn = async (id) => {
    await evaluate(`window.dispatchEvent(new CustomEvent("armadra:canvas:center-node", { detail: { nodeId: "${id}" } })); return 1;`);
    await sleep(700);
  };
  const fitView = async () => {
    const ok = await evaluate(`const b = [...document.querySelectorAll('button')].find((x) => /^适应$|^Fit$/.test(x.getAttribute('aria-label') ?? '')); b?.click(); return !!b;`);
    log("适应窗口", ok);
  };
  // 底栏「一键整理」：按主从树排，主节点居中在子节点那一行的正上方
  const tidy = async () => {
    const ok = await evaluate(`const b = [...document.querySelectorAll('button')].find((x) => /^一键整理$|^Tidy up$/.test(x.getAttribute('aria-label') ?? '')); b?.click(); return !!b;`);
    log("一键整理", ok);
  };
  const deadline = Date.now() + 20 * 60_000;
  let workers = [];
  const started = new Set();
  const finished = new Set();
  let allDone = 0;
  let focusIndex = 0;
  let lastFocus = 0;
  let leadFocused = false;
  while (Date.now() < deadline) {
    // 三人开工后轮流拉近看每个子节点；都完成后回到主节点看汇总
    if (started.size > 0 && !allDone && Date.now() - lastFocus > 7000 && focusIndex < 6) {
      const w = workers[focusIndex % workers.length];
      await zoomTo(85);
      await centerOn(w.id);
      mark(`focus:${w.title}`);
      focusIndex += 1;
      lastFocus = Date.now();
    }
    if (allDone && !leadFocused) {
      await zoomTo(85);
      await centerOn(claude.id);
      mark("focus-lead");
      leadFocused = true;
    }
    if (workers.length < 3) {
      const now = subs();
      if (now.length > workers.length) {
        workers = now;
        if (workers.length >= 3) {
          mark("dispatched");
          await sleep(1200);
          await tidy();
          await sleep(800);
          await fitView();
        }
      }
    }
    for (const w of workers) {
      const st = status(w.id)?.state ?? "";
      if (!started.has(w.id) && st === "working") { started.add(w.id); mark(`worker-start:${w.title}`); }
      if (started.has(w.id) && !finished.has(w.id) && st !== "working") { finished.add(w.id); mark(`worker-done:${w.title}`); }
    }
    if (workers.length >= 3 && finished.size === workers.length && !allDone) { allDone = Date.now(); mark("workers-done"); }
    if (allDone && Date.now() - allDone > 5000 && (status(claude.id)?.state ?? "") !== "working") {
      // Claude 一轮结束时状态栏打印「<动词> for 1m 15s · done 8:47 PM」：以它为准
      if (/· done \d{1,2}:\d{2}/.test(await screen(claude.id, 40))) { mark("claude-done"); break; }
    }
    await sleep(1000);
  }
  // 汇总在主节点特写里停留几秒，再拉远到全貌（主节点与三个已完成的子节点），结尾停在全貌上
  await sleep(4000);
  await fitView();
  await sleep(600);
  mark("overview");
  await sleep(4000);
  mark("end");
  capturing = false;
  await captureLoop;
  writeFileSync(join(out, "events.json"), JSON.stringify({ events, frames: frames.map((f) => [f.at, f.file]) }, null, 1));
  log(`抓到 ${frames.length} 帧，事件 ${events.map((e) => e.kind).join(" → ")}`);
  writeFileSync(join(out, "diff.txt"), execFileSync("git", ["-C", project, "diff"]).toString());
  for (const [name, id] of [["claude", claude.id], ...subs().map((w, i) => [`codex-${i + 1}`, w.id])]) writeFileSync(join(out, `${name}-screen.txt`), await screen(id, 200));
}
