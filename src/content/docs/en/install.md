---
title: Install
description: Download a desktop installer, or run from source.
group: start
order: 2
---

## Download an installer

Get the package for your system and architecture from [GitHub Releases](https://github.com/Owlbay/Armadra/releases/latest).

| System | Packages | Notes |
| --- | --- | --- |
| macOS | `.dmg` / `.zip` | `aarch64` for Apple silicon, `x86_64` for Intel; macOS 13.3 or later |
| Windows | `-setup.exe` / `-portable.zip` | Installer or portable, x64 and ARM64 |
| Linux | `.AppImage` / `.deb` / `.rpm` | x86_64 and aarch64 |

> Packages are **not yet signed or notarized**, so the OS warns on first launch. On macOS choose "Open Anyway" in System Settings → Privacy & Security; on Windows choose "Run anyway" in the SmartScreen prompt. Signed releases are on the [roadmap](https://github.com/Owlbay/Armadra/blob/main/docs/design/product-roadmap.md).

## Prepare an agent CLI

Armadra launches CLIs that are already installed and signed in on your machine; it does not install or sign in for you. Have at least one ready:

- Claude Code, Codex, OpenCode, Pi, Oh My Pi or GitHub Copilot;
- The `ama` coordinator ships with Armadra and needs no separate install.

Installing **tmux** is recommended: terminal sessions then survive app restarts. Without tmux Armadra falls back to a direct PTY.

## Run from source

You need Node.js ≥ 24 and the pinned pnpm; macOS also needs the Xcode Command Line Tools.

```sh
git clone https://github.com/Owlbay/Armadra.git
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

Ports, environment variables and data locations are in the [development guide](https://github.com/Owlbay/Armadra/blob/main/docs/guides/development.md) in the Armadra repository.

## Next

Once it's installed, follow the [Quickstart](/docs/quickstart/) for your first two-agent collaboration.
