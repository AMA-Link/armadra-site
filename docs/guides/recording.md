# 录屏指南

首页的软件画面是一段真实 Armadra 的录屏（`public/media/armadra-demo.webm` 与 poster `armadra-demo.jpg`）。不剪辑出软件做不到的行为：画面里的 Claude Code 与 Codex 是真实 CLI，真实地改代码、跑测试、经画布协作。

## 录了什么

在一个演示仓库 `web-app` 里：

1. 任务便签连到 Claude Code（实现），Claude Code 与 Codex（审查）对等连线，右侧终端跑 `node --test --watch`。
2. 在 Claude Code 节点里输入需求：给 `createSession` 加「记住我」（30 天 / 1 天）、补测试、跑测试，完成后用 `armadra-hook canvas send` 请 Codex 审查。
3. Claude Code 跑命令时在节点头部请求权限，由「人」在页面上点「允许」。
4. Codex 收到投递后审查，用 `canvas post` 回复；人提醒 Claude Code 读收件箱并采纳。

## 怎么重录

需要：Armadra 最新 main 的 worktree（已构建 core）、已登录的 Claude Code 与 Codex、Google Chrome。

```sh
git -C ../Armadra worktree add --detach ../worktrees/Armadra/site-recording origin/main
cd ../worktrees/Armadra/site-recording && pnpm install --frozen-lockfile && pnpm libs:build && pnpm --filter @armadra/desktop build
cd -
node scripts/record/record.mjs ../worktrees/Armadra/site-recording /tmp/armadra-rec
BITRATE=1000k node scripts/record/compose.mjs /tmp/armadra-rec /tmp/armadra-demo 32 1792
cp /tmp/armadra-demo.webm public/media/armadra-demo.webm
sips -Z 1792 -s formatOptions 80 /tmp/armadra-demo-poster-full.jpg --out public/media/armadra-demo.jpg
```

- `record.mjs`：起隔离的 core（数据目录、项目、浏览器 profile 全在临时目录）、Vite 页面与无头 Chrome，按上面的步骤驱动页面，以 2 倍设备像素逐帧截图，记下事件时间。
- `compose.mjs`：打字、第一次权限请求、提醒与结尾按原速，其余按统一倍速压到目标时长，编码为 VP8 WebM；用 Playwright 自带的 ffmpeg（`~/Library/Caches/ms-playwright/ffmpeg-*/ffmpeg-mac`）。
- 码率缺省 1000k，32 秒约 4 MB；文字发糊时调高 `BITRATE`，同时注意体积。
- poster 取结尾前两秒的画面，用 macOS 自带的 `sips` 缩到 1792 宽（Playwright 的 ffmpeg 不带 JPEG 编码器）。

## 安全

- Claude Code 用操作员自己的登录（钥匙串），会消耗真实额度；注入经数据目录里的启动器带上，不写 `~/.claude`。
- Codex 用临时 `CODEX_HOME`，只复制 `~/.codex/auth.json`；`auth.json` 超过 7 天没刷新时先在本机正常用一次 Codex 再录，避免在临时目录里轮换令牌。
- 脚本跑前跑后比对 `~/.claude/settings.json` 与 `~/.codex` 配置的指纹，不一致会打印警告。
