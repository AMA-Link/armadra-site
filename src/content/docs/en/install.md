---
title: Install
description: Download a desktop installer, or run from source.
group: start
order: 2
---

## Download an installer

Current version: [{{tag}}](https://github.com/AMA-Link/Armadra/releases/tag/{{tag}}). Download the package for your system and architecture.

| System | Packages | Notes |
| --- | --- | --- |
| macOS (Apple silicon) | [`Armadra_{{version}}_darwin-aarch64.dmg`](https://github.com/AMA-Link/Armadra/releases/download/{{tag}}/Armadra_{{version}}_darwin-aarch64.dmg) / [`Armadra_{{version}}_darwin-aarch64.zip`](https://github.com/AMA-Link/Armadra/releases/download/{{tag}}/Armadra_{{version}}_darwin-aarch64.zip) | macOS 13.3 or later |
| macOS (Intel) | [`Armadra_{{version}}_darwin-x86_64.dmg`](https://github.com/AMA-Link/Armadra/releases/download/{{tag}}/Armadra_{{version}}_darwin-x86_64.dmg) / [`Armadra_{{version}}_darwin-x86_64.zip`](https://github.com/AMA-Link/Armadra/releases/download/{{tag}}/Armadra_{{version}}_darwin-x86_64.zip) | Same |
| Windows x64 | [`Armadra_{{version}}_windows-x86_64-setup.exe`](https://github.com/AMA-Link/Armadra/releases/download/{{tag}}/Armadra_{{version}}_windows-x86_64-setup.exe) / [`Armadra_{{version}}_windows-x86_64-portable.zip`](https://github.com/AMA-Link/Armadra/releases/download/{{tag}}/Armadra_{{version}}_windows-x86_64-portable.zip) | Installer or portable |
| Windows ARM64 | [`Armadra_{{version}}_windows-aarch64-setup.exe`](https://github.com/AMA-Link/Armadra/releases/download/{{tag}}/Armadra_{{version}}_windows-aarch64-setup.exe) / [`Armadra_{{version}}_windows-aarch64-portable.zip`](https://github.com/AMA-Link/Armadra/releases/download/{{tag}}/Armadra_{{version}}_windows-aarch64-portable.zip) | Same |
| Linux x86_64 | [`Armadra_{{version}}_linux-x86_64.AppImage`](https://github.com/AMA-Link/Armadra/releases/download/{{tag}}/Armadra_{{version}}_linux-x86_64.AppImage) / [`Armadra_{{version}}_linux-x86_64.deb`](https://github.com/AMA-Link/Armadra/releases/download/{{tag}}/Armadra_{{version}}_linux-x86_64.deb) / [`Armadra_{{version}}_linux-x86_64.rpm`](https://github.com/AMA-Link/Armadra/releases/download/{{tag}}/Armadra_{{version}}_linux-x86_64.rpm) | |
| Linux aarch64 | [`Armadra_{{version}}_linux-aarch64.AppImage`](https://github.com/AMA-Link/Armadra/releases/download/{{tag}}/Armadra_{{version}}_linux-aarch64.AppImage) / [`Armadra_{{version}}_linux-aarch64.deb`](https://github.com/AMA-Link/Armadra/releases/download/{{tag}}/Armadra_{{version}}_linux-aarch64.deb) / [`Armadra_{{version}}_linux-aarch64.rpm`](https://github.com/AMA-Link/Armadra/releases/download/{{tag}}/Armadra_{{version}}_linux-aarch64.rpm) | |
| Android | [`armadra-mobile_{{version}}_android.apk`](https://github.com/AMA-Link/Armadra/releases/download/{{tag}}/armadra-mobile_{{version}}_android.apk) | Manual install, see below |

> Packages are **not yet signed or notarized** (macOS builds are ad-hoc signed), so the OS warns on first launch. On Windows choose "Run anyway" in the SmartScreen prompt; for macOS see the next section. Signing and notarization are deferred until a public launch; see the [roadmap](https://github.com/AMA-Link/Armadra/blob/main/docs/design/product-roadmap.md).

## First launch on macOS

Official macOS packages are ad-hoc signed and not notarized by Apple, so macOS blocks the first launch. Confirm it once and the app behaves like any other.

**macOS 15 and later**

1. Drag `Armadra.app` into Applications and open it once; macOS says it cannot verify the app and blocks it.
2. Open System Settings → Privacy & Security, scroll to Security, and click "Open Anyway" next to the Armadra notice.
3. Authenticate with your password or Touch ID, then click Open.

From macOS 15 the old right-click → Open bypass no longer works.

**Terminal**: if you prefer not to click through Settings, run this once and then open the app normally.

```sh
xattr -dr com.apple.quarantine /Applications/Armadra.app
```

**Homebrew**: `brew install --cask armadra` only downloads the app into Applications and does not clear the quarantine flag, so confirm it once with either method above.

**Updating**: macOS does not accept an ad-hoc signed package as an update, so the in-app updater can check and download but does not replace the app. Download the new installer (or run `brew upgrade --cask armadra`) over the old one, then confirm once more. Your data directory is untouched.

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
