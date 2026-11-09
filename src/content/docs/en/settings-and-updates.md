---
title: Settings, updates and data
description: What is in Settings, how to switch language and theme, update the app, and where data lives and how to back it up and restore it.
group: guides
order: 10
---

This page covers how Settings is organised, how to update the app, and where your data is and how to back it up.

## Open Settings

Press ⌘, (Ctrl+, on Windows / Linux), or search for "Settings" in the command palette (⌘K). Settings is a large window: section navigation on the left, one full page for the current section on the right; a search box at the top jumps straight to a setting by name. On a phone it fills the screen and the sections collapse into a drop-down at the top.

Each page header shows its scope: "This device" changes only this interface on this device; "Host" changes the machine running Armadra's core service; "Account" follows your sign-in. When you are connected to someone else's host, host pages change that machine, and members see only the pages that concern them.

## Main groups

| Group | Section | Contents |
| --- | --- | --- |
| Frequent | Defaults | Default agent and permission mode, default session view, theme, backdrop, language |
| Look & feel | General | "Expand sidebar on open", "Startup animation", "Restore last workspace on open", "Show system files" |
| | Notifications | "Notify when input is needed", stalled and long-unanswered alerts, sound and volume |
| | Canvas | Background, grid and snapping, input device, default colour and thickness, and so on |
| | Terminal | Colour scheme, font, size, line height, cursor, "Copy on select", and so on |
| | Browser | Memory and start page of browser nodes (desktop only); see [Files, editor and browser](/docs/editor-and-browser/) |
| | Shortcuts | View, rebind, add alternates, or turn all off; see [Keyboard shortcuts](/docs/keyboard-shortcuts/) |
| Agent | Agent CLI | Install state, canvas injection and accounts for each CLI |
| | Custom agents | Add your own CLI launch shape |
| | Sessions | Indexed sessions |
| Workspace | Workspace | Settings of the current workspace (including language services and execution host) |
| | Archive | Archived workspaces, with "Restore" and "Delete" |
| Host | Local service | Connection status, terminal session policy, power and resources, data, crash reports |
| | SSH | Remote hosts; see [Files, editor and browser](/docs/editor-and-browser/) |
| | Code hosting | Credentials for GitHub and other platforms; see [Git and GitHub](/docs/git-and-github/) |
| | Remote access | Sharing, pairing, relay accounts; see [Self-hosting and remote access](/docs/server-and-devices/) |
| Account | Account & devices | Sign-in methods, signed-in devices and sessions |
| | Members & sharing | Members and workspace sharing on a server shell |
| About | About | Version, updates, open source licences |

Some pages ("Local service", "SSH", "Agent CLI" and others) are visible only to the host's owner; "Browser" appears only in the desktop app; "Members & sharing" appears only on a server shell.

## Language and theme

In "Settings → Defaults":

1. "Theme": "Dark", "Light" or "System".
2. "Backdrop": pick a background style; on supported systems there is also "Translucent window".
3. "Language": "中文" or "English".

## Update the app

Updates live in the "Updates" area of "Settings → About".

1. The top of the page shows "App version" and "Host version". "Release channel" can be "Stable" or "Beta".
2. Click "Check for updates". The result is "This is the newest release" or "A newer release is available".
3. When there is one, click "Download"; you can first "Read the release notes", or "Skip this version".
4. When the download finishes the page shows "Downloaded; restart to apply"; click "Restart and update". Terminal sessions are kept across the restart.
5. To save effort turn on "Check automatically" and "Download automatically"; you are notified when a download completes.
6. "Release history" lower on the page lists published versions, which you can open on GitHub.

Update packages are verified against the public key built into the app; if verification fails or the download is interrupted, the package is discarded with a notice and the current version is not replaced. Updating inside the app is not possible when:

- the page is open in a web browser (it cannot replace the app itself);
- the background service runs on another machine (updating it is not updating this app);
- this kind of installation updates by downloading a new installer (the page offers "Download the new installer");
- an update was downloaded but this installation is unsigned: it is not installed, so install it from the release page.

On macOS, a Homebrew install can also run `brew upgrade --cask armadra`; for first launch and how to confirm it, see [Troubleshooting](/docs/troubleshooting/). For upgrading and rolling back a server shell, see the [server deployment guide](https://github.com/AMA-Link/Armadra/blob/main/docs/guides/server-deployment.md).

## Where data lives

The desktop app has no separate server; everything is on your machine:

| Content | Location |
| --- | --- |
| Data folder (macOS) | `~/Library/Application Support/Armadra` |
| Data folder (Windows) | `%LOCALAPPDATA%\Armadra` |
| Data folder (Linux) | `$XDG_DATA_HOME/armadra` |
| Canvases, workspaces, identity and settings index | `canvas.db` (SQLite) in the data folder |
| Account and local preferences | `settings.json` and `worker-settings.json` in the data folder |
| Workspace artefacts (assets such as images, exports) | `.armadra/` inside the project folder |
| Tokens and keys | The system's secret store (for example the macOS Keychain), not the database |

Under "Data" in "Settings → Local service" you can see "Data folder" (click "Reveal in Finder" to go straight there), "Database size" and "Log retention" (7 days / 30 days / 90 days / Forever).

## Back up and restore

1. In "Settings → Local service" click "Back up now" in the page header. The backup copies the database consistently, so you do not need to quit the app; when it finishes you see "Copied to …" with the full path, and the file is written in the data folder.
2. Save the backup file somewhere else, for example another disk or machine. The backup contains the database only; copy `settings.json`, the `.armadra/` folders and your project code yourself.

To restore (quit Armadra completely first):

1. Copy the backup file to `canvas.db` in the data folder;
2. also delete `canvas.db-wal` and `canvas.db-shm` in the same folder;
3. start the app again.

Armadra refuses to start on a damaged database, or on one newer than the program, and never wipes or rebuilds it automatically; in that case restore a backup as above, or go back to a version that can read it. A new version may bring database migrations, and migrations only go forward, so back up before upgrading.

## Move to another device

There is no one-click export or import. The dependable way described in the docs is:

1. On the old device use "Back up now", then copy the backup file, `settings.json` and the project folders you need (including `.armadra/`);
2. install the same or a newer version on the new device, start it once so it creates its data folder, then quit completely;
3. put the backup back into the new device's data folder using the restore steps above;
4. tokens and keys live in the system's secret store and do not travel with the database file: sign in to each CLI again on the new device, and set up code hosting credentials and ama's model keys again;
5. workspace records point to project folders, so make sure those folders exist on the new device at the recorded paths.

If you only want to use the same data from another device, no migration is needed: deploy Armadra as a [server shell](/docs/server-and-devices/) and open the same workspace from several devices.
