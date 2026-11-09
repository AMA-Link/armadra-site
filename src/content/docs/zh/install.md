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

> 当前安装包**尚未签名与公证**（macOS 为 ad-hoc 签名），首次打开时系统会提示风险。Windows 上在 SmartScreen 提示里选择「仍要运行」；macOS 的打开方法见下一节。正式签名与公证推迟到公开发布，见[路线图](https://github.com/AMA-Link/Armadra/blob/main/docs/design/product-roadmap.md)。

## macOS 首次打开

官方 macOS 安装包是 ad-hoc 签名、未经 Apple 公证，系统会在第一次打开时拦下它。确认一次之后，和普通应用一样使用。

**macOS 15 及更新**

1. 把 `Armadra.app` 拖进「应用程序」，双击打开一次，系统提示无法验证并拦下。
2. 打开「系统设置 → 隐私与安全性」，滚到「安全性」，在 Armadra 的提示旁点「仍要打开」。
3. 输入登录密码或使用触控 ID 确认，再点「打开」。

macOS 15 起，旧的「右键 → 打开」绕过方式不再有效。

**用终端**：不想点设置时，执行下面一行，之后可直接双击打开。

```sh
xattr -dr com.apple.quarantine /Applications/Armadra.app
```

**Homebrew**：`brew install --cask armadra` 只负责下载并放进「应用程序」，不会去掉隔离标记，装完仍要按上面任一种方式确认一次。

**更新**：应用内更新照常可用，应用需放在「应用程序」里运行（在挂载的 dmg 里运行时只提供新安装包的下载）。Homebrew 安装的也可以在应用内更新，或执行 `brew upgrade --cask armadra`。数据目录不受影响。

## Android 与 iOS

下载 APK 后手动安装，需要在系统设置里允许该来源安装未知来源应用。iOS 版尚未上架，暂时没有下载方式。装好之后怎么连到你自己的 Armadra，见[手机 App](/docs/mobile/)。

## 更新

可以在应用内更新。macOS 与 Windows 安装版、Linux AppImage 都能原地更新；Windows 便携版和 Linux 的 deb / rpm 不能，更新页会给出新安装包的下载。更新入口与设置见[设置与更新](/docs/settings-and-updates/)。

## 端到端加密

经中转的连接是端到端加密的，中转只转发密文。默认中转是 `https://relay.armadra.com`。

## 准备 Agent CLI

Armadra 启动的是你本机已经安装并登录的 CLI，它不替你安装或登录。至少准备一个：

- Claude Code、Codex、OpenCode、Pi、Oh My Pi 或 GitHub Copilot；
- 协调者 `ama` 随 Armadra 一起打包，不需要另装。

没有找到的 CLI 会在画布的新建菜单里标为「未安装」，不影响其他 CLI。

建议安装 **tmux**：终端会话因此能跨应用重启存活；缺少 tmux 时自动退回直连 PTY，窗口上会出现「终端已降级为直连」的提示。

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
