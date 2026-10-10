---
title: 安装
description: 下载桌面安装包，或从源码运行。
group: start
order: 2
---

## 下载安装包

在 [GitHub Releases](https://github.com/AMA-Link/Armadra/releases/latest) 下载对应系统与架构的安装包。

| 系统 | 安装包 | 说明 |
| --- | --- | --- |
| macOS | `.dmg` / `.zip` | Apple 芯片选 `aarch64`，Intel 选 `x86_64`；需要 macOS 13.3 或更新 |
| Windows | `-setup.exe` / `-portable.zip` | 安装版或免安装版，x64 与 ARM64 |
| Linux | `.AppImage` / `.deb` / `.rpm` | x86_64 与 aarch64 |

> 当前安装包**尚未签名与公证**，首次打开时系统会提示风险。macOS 上可以在「系统设置 → 隐私与安全性」里选择「仍要打开」；Windows 上在 SmartScreen 提示里选择「仍要运行」。签名发布在[路线图](https://github.com/AMA-Link/Armadra/blob/main/docs/design/product-roadmap.md)上。

## 准备 Agent CLI

Armadra 启动的是你本机已经安装并登录的 CLI，它不替你安装或登录。至少准备一个：

- Claude Code、Codex、OpenCode、Pi、Oh My Pi 或 GitHub Copilot；
- 协调者 `ama` 随 Armadra 一起打包，不需要另装。

建议安装 **tmux**：终端会话因此能跨应用重启存活；缺少 tmux 时自动退回直连 PTY。

## 从源码运行

需要 Node.js ≥ 24 与项目锁定的 pnpm；macOS 还需要 Xcode Command Line Tools。

```sh
git clone https://github.com/AMA-Link/Armadra.git
cd Armadra
pnpm install
./armadra.sh doctor        # 检查工具链
./armadra.sh run desktop   # 启动桌面壳（热更新）
./armadra.sh run web       # 或：core + 浏览器前端
```

自己打包：

```sh
pnpm --filter @armadra/desktop dist    # 桌面安装包 → apps/desktop/release/
pnpm --filter @armadra/server build    # 服务器壳 → apps/server/out/main.js
```

端口、环境变量与数据位置见 Armadra 仓库的[开发指南](https://github.com/AMA-Link/Armadra/blob/main/docs/guides/development.md)。

## 下一步

装好之后，跟着[快速上手](/docs/quickstart/)完成第一次两个 Agent 的协作。
