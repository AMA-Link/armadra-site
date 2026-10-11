# 录屏指南

首页的软件画面是一段真实 Armadra 的录屏（现为 `public/media/armadra-demo-team.webm` 与 poster `armadra-demo-team.jpg`）。资源缓存一天，换片时换文件名并改 `src/pages/index.astro` 的 `DEMO`。不剪辑出软件做不到的行为：画面里的 Claude Code 与 Codex 是真实 CLI，真实地改代码、跑测试、经画布协作。

## 录了什么

在一个演示仓库 `web-app` 里，所有 Agent 都用「完全自动」启动（Claude Code `--dangerously-skip-permissions`，Codex `--dangerously-bypass-approvals-and-sandbox`）：

1. 画布左侧是 Claude Code（主），右侧一列三个 Codex（从），主从连线。
2. 在 Claude Code 里输入一条需求：用 `armadra-hook canvas send` 给三个 Codex 各派一件活——`src/session.js` 记住我、`src/password.js` 密码规则、`src/email.js` 邮箱校验，各自补测试、跑 `node --test`、用 `canvas post` 回报。
3. 三个 Codex 并行实现；Claude Code 轮询收件箱，收齐后自己跑全部测试并总结。
4. 合成时开头、打字与结尾按原速（打字长时 3 倍速），其余等比压缩，最后停在总结画面上 5 秒（`HOLD`）。

## 怎么重录

需要：Armadra 最新 main 的 worktree（已构建 core）、已登录的 Claude Code 与 Codex、Google Chrome。

```sh
git -C ../Armadra worktree add --detach ../worktrees/Armadra/site-recording origin/main
cd ../worktrees/Armadra/site-recording && pnpm install --frozen-lockfile && pnpm libs:build && pnpm --filter @armadra/desktop build
cd -
node scripts/record/record.mjs ../worktrees/Armadra/site-recording /tmp/armadra-rec
BITRATE=1000k node scripts/record/compose.mjs /tmp/armadra-rec /tmp/armadra-demo 34 1792
cp /tmp/armadra-demo.webm public/media/armadra-demo-<场景>.webm
sips -Z 1792 -s formatOptions 80 /tmp/armadra-demo-poster-full.jpg --out public/media/armadra-demo-<场景>.jpg
```

- `record.mjs`：起隔离的 core（数据目录、项目、浏览器 profile 全在临时目录）、Vite 页面与无头 Chrome，按上面的步骤驱动页面，以 2 倍设备像素逐帧截图，记下事件时间。
- `compose.mjs`：打字、第一次权限请求、提醒与结尾按原速，其余按统一倍速压到目标时长，编码为 VP8 WebM；用 Playwright 自带的 ffmpeg（`~/Library/Caches/ms-playwright/ffmpeg-*/ffmpeg-mac`）。
- 码率缺省 1000k，约 40 秒成片 5 MB；文字发糊时调高 `BITRATE`，同时注意体积。
- poster 取最后一帧（总结画面），用 macOS 自带的 `sips` 缩到 1792 宽（Playwright 的 ffmpeg 不带 JPEG 编码器）。

## 安全

- Claude Code 用操作员自己的登录（钥匙串），会消耗真实额度；操作员的 Claude 设置需已跳过 bypass 模式的确认对话框；注入经数据目录里的启动器带上，不写 `~/.claude`。
- Codex 用临时 `CODEX_HOME`，只复制 `~/.codex/auth.json`；`auth.json` 超过 7 天没刷新时先在本机正常用一次 Codex 再录，避免在临时目录里轮换令牌。
- 脚本跑前跑后比对 `~/.claude/settings.json` 与 `~/.codex` 配置的指纹，不一致会打印警告。
- core 的 `XDG_*` 指向临时目录，终端里的 shell 包装脚本会还原它们，否则 mise 等工具在节点里找不到已安装的 Node。
