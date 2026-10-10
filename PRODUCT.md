# Product

## Platform

web（纯静态）

## Stack

Astro 7 + TypeScript，纯静态输出，部署在 Cloudflare Workers 静态资源，域名 `armadra.com`。

## Users

- **第一次听说 Armadra 的开发者**：从 GitHub、社区或分享链接过来，想在一分钟内知道它解决什么问题、和单独用 Claude Code / Codex 有什么不同。
- **准备试用的人**：要下载地址、系统要求和第一次上手的步骤。
- **已在使用的人**：查概念（连线、消息、交接、协调者）与服务器壳部署。

## Product Purpose

1. **首页**（`/`）：定位、三个产品出发点、能力一览、支持的 Agent、设计原则、快速开始、路线图。
2. **在线演示**（`/demo/`）：浏览器里的模拟画布，演示多个 Agent 经连线协作。
3. **文档**（`/docs/`）：入门、概念、使用与参考，中英双语。

成功标准：访客首屏读懂定位；不安装就能看到「连线即上下文」的协作过程；能按文档完成安装与第一次协作。

## Positioning

Armadra 是本地优先的 AI Coding 画布：Claude Code、Codex、OpenCode、Pi、Oh My Pi、GitHub Copilot 与协调者 `ama` 以真实终端节点放在同一张无限画布上，保留各自的账户、模型与权限策略，通过连线共享上下文、通过消息和交接分工。

## Brand Commitments

- 名字：**Armadra**；标志为犰狳（`public/brand/`，源文件在 Armadra 仓库 `assets/brand/`）。
- 一句话：在同一张无限画布上，打破 Agent 之间的界限，让不同模型围绕同一个目标协作。
- 风格：简约、安静、大气，与作者个人站同一套设计语言。

## Evidence on Hand

- 产品说明：Owlbay/Armadra 的 `README.md`、`docs/guides/product-overview.md`、`agent-collaboration.md`、`server-deployment.md`。
- 发布：GitHub Releases（macOS / Windows / Linux 安装包，目前未签名）。
- 没有用户数、评价、媒体报道；不得编造。

## Accessibility & Inclusion

明暗主题都满足 WCAG AA；全站键盘可达；演示画布提供键盘操作与 `aria-live` 状态播报；尊重减少动效偏好。
