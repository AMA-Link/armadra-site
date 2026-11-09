---
title: Troubleshooting
description: What to do when a CLI shows as not installed, an agent stops responding, permission requests do not appear, remote access fails, an update fails, or macOS blocks the first launch.
group: reference
order: 2
---

Find the section that matches what you see. Only fixes with a documented basis are listed here; if none works, send the symptom and your Armadra version ("Settings → About") to [support@armadra.com](mailto:support@armadra.com).

## A CLI shows "Not installed"

Symptom: the new menu marks an agent "Not installed", or in "Settings → Agent CLI" the state is "Install needed" and the CLI row says "Not detected".

1. Armadra launches the CLI that is already installed and signed in on your machine; it does not install or sign in for you. Install it and sign in once by following that CLI's own instructions.
2. Check that running the command in a terminal starts it, and that its folder is on `PATH`.
3. Go back to "Settings → Agent CLI" and see whether the state changed to installed.
4. If the project lives on an SSH host or a server shell, the CLI must be installed and signed in on that machine.

The adapter needed for the session view can be installed on the same page. When the install fails:

| Message | What to do |
| --- | --- |
| "npm not found" | Install Node.js (which includes npm) first |
| "npm install failed (exit code …)" | Use "View output" to see why, fix it, then "Retry" |
| "The install timed out and was stopped" | Check your network and retry |
| "Installed, but the program can't be found. Check that npm's global folder is on PATH." | Add npm's global folder to `PATH` and retry |
| "Another install is running" | Wait for the current install to finish |

## An agent does not respond or its status does not update

1. **First tell a real hang from a status that never arrived.** The status in a node's header (working, needs you, done) is reported by the CLI itself, and that channel is injected only when the CLI is launched from the canvas. The same CLI started alone in a terminal outside the canvas shows no status. Create a node on the canvas to start it.
2. Open "Settings → Agent CLI" and check whether the CLI shows "Hook not generated", "Skill not generated", "Injection limited" or "Out of date". If so, click "Regenerate injection".
3. The agent may be waiting for you: look for a permission request or a question in the node header; see the next section.
4. The node may be in energy-saving hibernation: an idle agent first exits and then its process ends, and it resumes the original session when you focus the node, a delivery arrives or a schedule fires. Give it a moment.
5. Open the "Resources" panel (⇧⌘U), find the session and check whether the process is using an unusual amount; if it is no longer useful you can "End session" and resume it in a new node.
6. To catch stuck agents early, turn on "Stalled alert" in "Settings → Notifications".
7. The same agent can switch between the terminal view and the session view; try the other view.

## Permission requests do not appear

1. A permission request is produced only when the CLI's permission mode asks for confirmation. Check the node's permission mode and the "Default permission mode" in "Settings → Defaults": full-auto style modes do not ask.
2. The request appears in the node header; use "Allow", "Reject" or "Answer". In the session view it is a permission card. Armadra never answers for you.
3. If the node header shows no feedback at all, the cause is most likely the one in the previous section: the CLI was not launched from the canvas, or its injection was not generated. Check as described there and "Regenerate injection".
4. To be called back when you are away from the window, turn on "Notify when input is needed" in "Settings → Notifications".
5. If you choose a permission mode the CLI does not support, you get a clear error before launch instead of a silent downgrade; pick a mode it supports.

## Cannot connect remotely

When a phone or another computer cannot reach a desktop's sharing service, a server shell or a shared host:

1. **Direct LAN connection**: in "Settings → Remote access", confirm "Allow other devices to access this computer" is on and the listen address is not "This computer only".
2. **Pairing code expired**: a code is valid for two minutes; click "New pairing code" and scan again.
3. **Certificate**: the phone must install and trust the local CA on first connection (the page has iOS and Android steps). Reload the page after installing.
4. **Port**: on "Port already in use", set "Port" to "Auto" or pick another; on "Not allowed to use this port", choose a higher port.
5. **Certificate issuance**: with ACME, "ACME challenge port unavailable" or "ACME certificate request failed" usually means the domain does not resolve to this machine or external port 80 is not forwarded to the challenge port.
6. **Server shell**: if the page opens but drops right after sign-in or returns 403, the address in the browser's address bar usually differs from `ARMADRA_PUBLIC_ORIGIN` (`--public-origin`) — port, letter case, or a reverse proxy changing `Host`. A reverse proxy also has to allow WebSocket and use long read timeouts. If a container exits right after starting, check that `ARMADRA_PUBLIC_ORIGIN` is set.
7. **Host status**: "Offline" means the other side is not online; on "Sign-in required" sign in again; on "Update needed" or "This computer runs an outdated Armadra. Update it to connect", update the other side's Armadra and connect again; on "Version not compatible. Update the app and reopen it", update the app on this device.
8. "Access was revoked" means the sharing was withdrawn; ask for a new grant or pair again.

For certificates, reverse proxies and the full troubleshooting table see [Self-hosting and remote access](/docs/server-and-devices/) and the [server deployment guide](https://github.com/AMA-Link/Armadra/blob/main/docs/guides/server-deployment.md) in the Armadra repository.

## An update fails

In the "Updates" area of "Settings → About" a failure states its reason:

| Message | What to do |
| --- | --- |
| The release source could not be read | Check the network and retry later; when it says "You can try again in N minutes", retry after that |
| The download stopped early and was discarded | Click "Retry" |
| There was not enough room to stage the package | Free some space and retry |
| The package is signed by a key this build does not carry, or the bytes that arrived are not the ones the release published | Do not force the install; check for updates again, and if it persists download from the release page |
| The background service this application started would not stop, so the install never began | Quit and reopen Armadra, then try again |
| The install failed; the running version was not replaced | Keep using the current version; install the new one by hand from the release page |
| The update was downloaded and verified, but this installation is unsigned, so it is not installed | Install it by hand from the release page |
| The update did not finish: … did not report the new version | Install by hand from the release page, or go back to the previous release package |

Some setups cannot update in place at all: a page in a web browser, a background service on another machine, the Windows portable build, and Linux deb and rpm packages. For those the Updates page offers the new installer to download. See [Settings, updates and data](/docs/settings-and-updates/).

## macOS blocks the first launch

The official macOS package is ad-hoc signed and not notarized by Apple, so the system blocks it the first time it opens.

1. Drag `Armadra.app` into "Applications" and double-click it once; the system says it cannot verify the app and blocks it.
2. Open "System Settings → Privacy & Security", scroll to "Security", and click "Open Anyway" next to the Armadra notice.
3. Confirm with your login password or Touch ID, then click "Open".

Since macOS 15, "right-click → Open" no longer works; you must use "Open Anyway" as above. If you would rather not click through Settings, run this in a terminal:

```sh
xattr -dr com.apple.quarantine /Applications/Armadra.app
```

A Homebrew install (`brew install --cask armadra`) does not remove the quarantine flag, so you still confirm once after installing, and again after upgrading. On Windows, choose "Run anyway" in the SmartScreen prompt. See [Install](/docs/install/).

## Other common cases

- **Startup reports a damaged database or one that is too new**: Armadra refuses to start and never wipes it automatically. Restore a backup, or go back to a version that can read it; the steps are in [Settings, updates and data](/docs/settings-and-updates/).
- **A browser node says the server found no Chromium**: install Chromium on the server, or point `ARMADRA_BROWSER_PATH` at it.
- **A browser node page reloaded**: pages hidden for longer than the configured minutes are freed to save memory; adjust this in "Settings → Browser".
- **Language services do not work**: the editor status states the reason, for example no language server on the machine, a missing execution permission for the workspace, or no language service on the remote host.
- **"Generate with AI" for commit messages is unavailable**: it needs the Claude CLI on the machine and `ANTHROPIC_API_KEY` set for the running service, and does not work with a custom endpoint. The interface states the specific reason.
- **The code hosting panel says there is no credential**: set one up in "Settings → Code hosting"; see [Git and GitHub](/docs/git-and-github/).
