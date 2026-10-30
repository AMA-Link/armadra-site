---
title: 安装
description: 下载桌面安装包，或从源码运行。
group: start
order: 2
---

## 下载安装包

当前版本 [{{tag}}](https://github.com/AMA-Link/Armadra/releases/tag/{{tag}})。下载对应系统与架构的安装包。

| 系统 | 安装包 | 说明 |
| --- | --- | --- |
| macOS（Apple 芯片） | [`Armadra_{{version}}_darwin-aarch64.dmg`](https://github.com/AMA-Link/Armadra/releases/download/{{tag}}/Armadra_{{version}}_darwin-aarch64.dmg) / [`Armadra_{{version}}_darwin-aarch64.zip`](https://github.com/AMA-Link/Armadra/releases/download/{{tag}}/Armadra_{{version}}_darwin-aarch64.zip) | 需要 macOS 13.3 或更新 |
| macOS（Intel） | [`Armadra_{{version}}_darwin-x86_64.dmg`](https://github.com/AMA-Link/Armadra/releases/download/{{tag}}/Armadra_{{version}}_darwin-x86_64.dmg) / [`Armadra_{{version}}_darwin-x86_64.zip`](https://github.com/AMA-Link/Armadra/releases/download/{{tag}}/Armadra_{{version}}_darwin-x86_64.zip) | 同上 |
| Windows x64 | [`Armadra_{{version}}_windows-x86_64-setup.exe`](https://github.com/AMA-Link/Armadra/releases/download/{{tag}}/Armadra_{{version}}_windows-x86_64-setup.exe) / [`Armadra_{{version}}_windows-x86_64-portable.zip`](https://github.com/AMA-Link/Armadra/releases/download/{{tag}}/Armadra_{{version}}_windows-x86_64-portable.zip) | 安装版或免安装版 |
| Windows ARM64 | [`Armadra_{{version}}_windows-aarch64-setup.exe`](https://github.com/AMA-Link/Armadra/releases/download/{{tag}}/Armadra_{{version}}_windows-aarch64-setup.exe) / [`Armadra_{{version}}_windows-aarch64-portable.zip`](https://github.com/AMA-Link/Armadra/releases/download/{{tag}}/Armadra_{{version}}_windows-aarch64-portable.zip) | 同上 |
| Linux x86_64 | [`Armadra_{{version}}_linux-x86_64.AppImage`](https://github.com/AMA-Link/Armadra/releases/download/{{tag}}/Armadra_{{version}}_linux-x86_64.AppImage) / [`Armadra_{{version}}_linux-x86_64.deb`](https://github.com/AMA-Link/Armadra/releases/download/{{tag}}/Armadra_{{version}}_linux-x86_64.deb) / [`Armadra_{{version}}_linux-x86_64.rpm`](https://github.com/AMA-Link/Armadra/releases/download/{{tag}}/Armadra_{{version}}_linux-x86_64.rpm) | |
| Linux aarch64 | [`Armadra_{{version}}_linux-aarch64.AppImage`](https://github.com/AMA-Link/Armadra/releases/download/{{tag}}/Armadra_{{version}}_linux-aarch64.AppImage) / [`Armadra_{{version}}_linux-aarch64.deb`](https://github.com/AMA-Link/Armadra/releases/download/{{tag}}/Armadra_{{version}}_linux-aarch64.deb) / [`Armadra_{{version}}_linux-aarch64.rpm`](https://github.com/AMA-Link/Armadra/releases/download/{{tag}}/Armadra_{{version}}_linux-aarch64.rpm) | |
| Android | [`armadra-mobile_{{version}}_android.apk`](https://github.com/AMA-Link/Armadra/releases/download/{{tag}}/armadra-mobile_{{version}}_android.apk) | 手动安装，见下 |

> 当前安装包**尚未签名与公证**，首次打开时系统会提示风险。macOS 上可以在「系统设置 → 隐私与安全性」里选择「仍要打开」；Windows 上在 SmartScreen 提示里选择「仍要运行」。签名发布在[路线图](https://github.com/AMA-Link/Armadra/blob/main/docs/design/product-roadmap.md)上。

## Android 与 iOS

下载 APK 后手动安装，需要在系统设置里允许该来源安装未知来源应用。iOS 版尚未上架，暂时没有下载方式。

## 更新

从 0.6.0 起可以在应用内更新。0.5.x 及更早版本没有这个入口，需要手动装一次 0.6.0。

## 端到端加密

从 0.6.0 起，经中转的连接是端到端加密的，中转只转发密文。中转版本需要 ≥ 0.4.0。默认中转是 `https://relay.armadra.com`。

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
