# 录屏指南

首页的软件画面是一段真实 Armadra 的录屏（现为 `public/media/armadra-demo-tree.webm` 与 poster `armadra-demo-tree.jpg`）。资源缓存一天，换片时换文件名并改 `src/pages/index.astro` 的 `DEMO`。不剪辑出软件做不到的行为：画面里的 Claude Code 与 Codex 是真实 CLI，真实地改代码、跑测试、经画布协作。

## 录了什么

在一个演示仓库 `web-app` 里，所有 Agent 都用「完全自动」启动（Claude Code `--dangerously-skip-permissions`，Codex `--dangerously-bypass-approvals-and-sandbox`）：

1. 画布上一开始只有 Claude Code（主）。不预先摆子节点、不预写连线——预写的连线会被当成上下文连线显示。
2. 在 Claude Code 里输入一条需求：先用两三句话说明分工，再用一条 `armadra-hook canvas team --permission-mode full-auto` 派出三个 Codex——`src/session.js` 记住我、`src/password.js` 密码规则、`src/email.js` 邮箱校验，各自补测试、跑 `node --test`、用 `canvas post` 回报。
3. 子节点由主节点派出后出现在画布上，带派发连线与「从 @…」标记；随即点底栏「一键整理」，主节点居中在上、三个子节点在正下方排成一行，再适应窗口。镜头缩到 85% 依次拉近每个子节点，收齐回报后回到主节点看汇总，最后拉远停在全貌上。
4. 合成只截取几个片段，每段按原速播放、段间直接切，不加速：开始输入、主节点说明分工并派发、每个子节点 5 秒（取第二轮拉近，那时已有改动和测试结果）、主节点汇总、拉远看全貌，最后停在全貌上 5 秒（`HOLD`）。

## 怎么重录

需要：Armadra 最新 main 的 worktree（已构建 core）、已登录的 Claude Code 与 Codex、Google Chrome。

```sh
git -C ../Armadra worktree add --detach ../worktrees/Armadra/site-recording origin/main
cd ../worktrees/Armadra/site-recording && pnpm install --frozen-lockfile && pnpm libs:build && pnpm --filter @armadra/desktop build
cd -
node scripts/record/record.mjs ../worktrees/Armadra/site-recording /tmp/armadra-rec
BITRATE=900k node scripts/record/compose.mjs /tmp/armadra-rec /tmp/armadra-demo 1920
cp /tmp/armadra-demo.webm public/media/armadra-demo-<场景>.webm
sips -Z 1920 -s formatOptions 80 /tmp/armadra-demo-poster-full.jpg --out public/media/armadra-demo-<场景>.jpg
```

- `record.mjs`：起隔离的 core（数据目录、项目、浏览器 profile 全在临时目录）、Vite 页面与无头 Chrome（1440×900），按上面的步骤驱动页面，以 2 倍设备像素逐帧截图，记下事件时间。
- `compose.mjs`：按事件截取片段、原速拼接，编码为 VP8 WebM；用 Playwright 自带的 ffmpeg（`~/Library/Caches/ms-playwright/ffmpeg-*/ffmpeg-mac`）。
- 码率缺省 900k，约 57 秒成片 6 MB；文字发糊时调高 `BITRATE`，同时注意体积。
- poster 取最后一帧（全貌），用 macOS 自带的 `sips` 缩到 1920 宽（Playwright 的 ffmpeg 不带 JPEG 编码器）。

## 安全

- Claude Code 用操作员自己的登录（钥匙串），会消耗真实额度；操作员的 Claude 设置需已跳过 bypass 模式的确认对话框；注入经数据目录里的启动器带上，不写 `~/.claude`。
- Codex 用临时 `CODEX_HOME`，只复制 `~/.codex/auth.json`；`auth.json` 超过 7 天没刷新时先在本机正常用一次 Codex 再录，避免在临时目录里轮换令牌。
- 脚本跑前跑后比对 `~/.claude/settings.json` 与 `~/.codex` 配置的指纹，不一致会打印警告。
- core 的 `XDG_*` 指向临时目录，终端里的 shell 包装脚本会还原它们，否则 mise 等工具在节点里找不到已安装的 Node。

## 首页圆形插画

首页条目旁的圆形插画是同一份录屏里抽出的真实截图，不另行录制、不绘制内容：

```sh
node scripts/record/circles.mjs            # 默认读 public/media/armadra-demo-tree.webm
```

`scripts/record/circles.mjs` 按固定的取帧时间与裁切框抽帧、转灰度，输出到 `public/media/circles/*.jpg`（720×720）；圆形裁切、网格纸底与浅色主题反相由 `CircleFigure.astro` 的 CSS 完成。换录屏后重跑，并检查每张的裁切框仍落在对应的界面区域上。

