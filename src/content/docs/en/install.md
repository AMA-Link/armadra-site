---
title: Install
description: Download a desktop installer, or run from source.
group: start
order: 2
---

## Download an installer

Current version: [v0.9.3](https://github.com/AMA-Link/Armadra/releases/tag/v0.9.3). Download the package for your system and architecture.

| System | Packages | Notes |
| --- | --- | --- |
| macOS (Apple silicon) | [`Armadra_0.9.3_darwin-aarch64.dmg`](https://github.com/AMA-Link/Armadra/releases/download/v0.9.3/Armadra_0.9.3_darwin-aarch64.dmg) / [`Armadra_0.9.3_darwin-aarch64.zip`](https://github.com/AMA-Link/Armadra/releases/download/v0.9.3/Armadra_0.9.3_darwin-aarch64.zip) | macOS 13.3 or later |
| macOS (Intel) | [`Armadra_0.9.3_darwin-x86_64.dmg`](https://github.com/AMA-Link/Armadra/releases/download/v0.9.3/Armadra_0.9.3_darwin-x86_64.dmg) / [`Armadra_0.9.3_darwin-x86_64.zip`](https://github.com/AMA-Link/Armadra/releases/download/v0.9.3/Armadra_0.9.3_darwin-x86_64.zip) | Same |
| Windows x64 | [`Armadra_0.9.3_windows-x86_64-setup.exe`](https://github.com/AMA-Link/Armadra/releases/download/v0.9.3/Armadra_0.9.3_windows-x86_64-setup.exe) / [`Armadra_0.9.3_windows-x86_64-portable.zip`](https://github.com/AMA-Link/Armadra/releases/download/v0.9.3/Armadra_0.9.3_windows-x86_64-portable.zip) | Installer or portable |
| Windows ARM64 | [`Armadra_0.9.3_windows-aarch64-setup.exe`](https://github.com/AMA-Link/Armadra/releases/download/v0.9.3/Armadra_0.9.3_windows-aarch64-setup.exe) / [`Armadra_0.9.3_windows-aarch64-portable.zip`](https://github.com/AMA-Link/Armadra/releases/download/v0.9.3/Armadra_0.9.3_windows-aarch64-portable.zip) | Same |
| Linux x86_64 | [`Armadra_0.9.3_linux-x86_64.AppImage`](https://github.com/AMA-Link/Armadra/releases/download/v0.9.3/Armadra_0.9.3_linux-x86_64.AppImage) / [`Armadra_0.9.3_linux-x86_64.deb`](https://github.com/AMA-Link/Armadra/releases/download/v0.9.3/Armadra_0.9.3_linux-x86_64.deb) / [`Armadra_0.9.3_linux-x86_64.rpm`](https://github.com/AMA-Link/Armadra/releases/download/v0.9.3/Armadra_0.9.3_linux-x86_64.rpm) | |
| Linux aarch64 | [`Armadra_0.9.3_linux-aarch64.AppImage`](https://github.com/AMA-Link/Armadra/releases/download/v0.9.3/Armadra_0.9.3_linux-aarch64.AppImage) / [`Armadra_0.9.3_linux-aarch64.deb`](https://github.com/AMA-Link/Armadra/releases/download/v0.9.3/Armadra_0.9.3_linux-aarch64.deb) / [`Armadra_0.9.3_linux-aarch64.rpm`](https://github.com/AMA-Link/Armadra/releases/download/v0.9.3/Armadra_0.9.3_linux-aarch64.rpm) | |
| Android | [`armadra-mobile_0.9.3_android.apk`](https://github.com/AMA-Link/Armadra/releases/download/v0.9.3/armadra-mobile_0.9.3_android.apk) | Manual install, see below |

> Packages are **not yet signed or notarized**, so the OS warns on first launch. On macOS choose "Open Anyway" in System Settings → Privacy & Security; on Windows choose "Run anyway" in the SmartScreen prompt. Signed releases are on the [roadmap](https://github.com/AMA-Link/Armadra/blob/main/docs/design/product-roadmap.md).

## Android and iOS

Download the APK and install it manually; allow installing apps from unknown sources for that source in system settings. The iOS app is not published yet, so there is no download.

## Updating

From 0.6.0 you can update inside the app. 0.5.x and earlier have no such entry, so install 0.6.0 manually once.

## End-to-end encryption

From 0.6.0, connections through a relay are end-to-end encrypted, so the relay only forwards ciphertext. The relay must be version 0.4.0 or later. The default relay is `https://relay.armadra.com`.

## Prepare an agent CLI

Armadra launches CLIs that are already installed and signed in on your machine; it does not install or sign in for you. Have at least one ready:

- Claude Code, Codex, OpenCode, Pi, Oh My Pi or GitHub Copilot;
- The `ama` coordinator ships with Armadra and needs no separate install.

Installing **tmux** is recommended: terminal sessions then survive app restarts. Without tmux Armadra falls back to a direct PTY.

## Run from source

You need Node.js ≥ 24 and the pinned pnpm; macOS also needs the Xcode Command Line Tools.

```sh
git clone https://github.com/AMA-Link/Armadra.git
cd Armadra
pnpm install
./armadra.sh doctor        # check the toolchain
./armadra.sh run desktop   # start the desktop shell (hot reload)
./armadra.sh run web       # or: core + browser front end
```

Build packages yourself:

```sh
pnpm --filter @armadra/desktop dist    # desktop installers → apps/desktop/release/
pnpm --filter @armadra/server build    # server shell → apps/server/out/main.js
```

Ports, environment variables and data locations are in the [development guide](https://github.com/AMA-Link/Armadra/blob/main/docs/guides/development.md) in the Armadra repository.

## Next

Once it's installed, follow the [Quickstart](/docs/quickstart/) for your first two-agent collaboration.
