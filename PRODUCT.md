# Product

## Platform

web（纯静态）

## Stack

Astro 7 + TypeScript，纯静态输出，部署在 Cloudflare Workers 静态资源，域名 `armadra.com`。

## Users

- **第一次听说 Armadra 的开发者**：从 GitHub、社区或分享链接过来，想在一分钟内知道它解决什么问题、和单独用 Claude Code / Codex 有什么不同。
- **准备试用的人**：要下载地址、系统要求和第一次上手的步骤。
- **已在使用的人**：查概念（连线与上下文共享、消息、交接、协调者）与自托管部署。

## Product Purpose

1. **首页**（`/`）：一列版式，先讲用户能完成什么，再讲 Agent 如何协作，最后讲技术细节——产品定位（下载与快速上手）、软件画面、协作示例、核心能力、支持的工具、部署与数据、常见问题、开始使用与联系。
2. **更新日志**（`/changelog/`）：按版本倒序，每版一句标题加几条要点。
3. **文档**（`/docs/`）：入门、概念、使用与参考，中英双语。

成功标准：访客首屏读懂定位；往下滚一遍就看懂软件的样子与主要能力；能按文档完成安装与第一次协作。

## Positioning

- 中：Armadra 是一个本地优先的 AI 编程协作工作空间，让多个 AI 助手在同一张画布上分工、共享上下文并接续任务。
- EN: Armadra is a local-first workspace for collaborative AI coding. Bring multiple coding agents onto one canvas to divide tasks, share context, and hand off work.

站点描述、文档简介首段与本节使用同一句。

## Terminology

- 中文首次出现写「AI 编程助手（Agent）」，之后用「Agent」；英文用 AI coding agent、workspace、canvas、context sharing、handoff、self-hosting。
- 首页不用内部用语：「真实 CLI」→ 直接使用你熟悉的 AI 编程工具；「连线即上下文」→ 连接 Agent，按需共享任务上下文；「代码工作面」→ 在同一工作空间查看代码、变更与运行结果；「无窗口服务器壳」→ 自托管部署与远程访问。文档讲实现时可以保留技术术语，首次出现先用面向用户的说法。

## Brand Commitments

- 名字：**Armadra**；标志为犰狳（`public/brand/`，源文件在 Armadra 仓库 `assets/brand/`）。
- 一句话：在同一张无限画布上，打破 Agent 之间的界限，让不同模型围绕同一个目标协作。
- 风格：简约、安静、大气，与桌面端共用同一套设计令牌（见 DESIGN.md）。

## Evidence on Hand

- 产品说明：AMA-Link/Armadra 的 `README.md`、`docs/guides/product-overview.md`、`agent-collaboration.md`、`server-deployment.md`。
- 发布：GitHub Releases（macOS / Windows / Linux 安装包，目前未签名）。
- 没有用户数、评价、媒体报道；不得编造。

## Accessibility & Inclusion

明暗主题都满足 WCAG AA；全站键盘可达；尊重减少动效偏好。
