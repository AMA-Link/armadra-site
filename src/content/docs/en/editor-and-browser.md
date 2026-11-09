---
title: Files, editor and browser
description: Browse files on the canvas, edit code, use language services, and share a browser node with agents.
group: guides
order: 4
---

This page covers the three node types that deal directly with code: the file browser, the editor and the browser. They sit on the same canvas as your terminals, and links can hand their context to an agent.

## File browser and file tree

1. Right-click an empty spot on the canvas (or click `+` on the Dock) and choose "New file browser" in the "Content" group.
2. The node shows the project's file tree, with a "Filter" box and the current path at the top. File status is marked with a letter: modified, added, deleted, renamed, untracked.
3. Clicking a file opens it in an editor node; "Open file…" in the new menu does the same.

"Explorer" in the sidebar (⇧⌘E, Ctrl+Shift+E on Windows / Linux) is the same tree and can be pinned to the side.

In the tree you can:

- create files and folders, rename and move them;
- "Delete to Trash", with an "Undo" in the notification afterwards;
- "Copy path", "Copy relative path", and reveal the file in Finder / Explorer / the file manager.

Files can also be dragged: onto a terminal to insert the path, onto the canvas to open a preview.

### Finding files and text

- Quick open (⌘P, Ctrl+P on Windows / Linux): search by file name; write `:12:4` to jump to line 12, column 4.
- Search in project (⇧⌘H, Ctrl+Shift+H on Windows / Linux): switch between the "Files" and "Search" tabs; options are "Regular expression", "Match case", "Whole word", and "Include (glob)" / "Exclude (glob)". Files that are too large or binary are skipped, and the count is shown.

## Editor

An editor node views and edits a file in the project.

1. After an edit the node shows "Unsaved"; press ⌘S (Ctrl+S on Windows / Linux) to save.
2. "Find/Replace" supports case, whole-word and regular-expression matching.
3. Markdown files switch between "Preview", "Side by side" and "Edit"; images can be zoomed, and PDF and media files are previewed.
4. The gutter marks changes against Git.

The editor protects your work in these cases:

- **Draft recovery**: after an unexpected close, reopening shows "Restored an unsaved draft", with "Discard draft". If the file on disk changed in the meantime, you get an extra notice.
- **File changed on disk**: you see "The file on disk was modified" (replaced and deleted have their own notices). Click "Compare" to see "Disk → draft", then choose "Reload and discard draft" or "Keep draft"; when both sides changed, use "Three-way merge" and pick, hunk by hunk, the draft or the disk version.
- **Save as**: if the target path already has a file you are told, and nothing is overwritten silently.
- Non-UTF-8 files are read-only; very large files show "File too large".

### Language services

For common languages the editor offers completion, diagnostics, hover, go to definition, find references, rename symbol and formatting.

| Action | macOS | Windows / Linux |
| --- | --- | --- |
| Go to definition | F12 | F12 |
| Find references | ⇧F12 | Shift+F12 |
| Rename symbol | F2 | F2 |
| Format file | ⇧⌥F | Shift+Alt+F |
| Code actions | ⌘. | Ctrl+. |
| Go to line | ⌃G | Ctrl+G |

- Diagnostics are collected in the "Problems" panel and reference results in the "References" panel; neither has a default shortcut, so open them from the command palette or from the editor status bar.
- Rename and code actions show an "Apply changes" preview first; if any file cannot be changed (outside the workspace, has an unsaved draft, and so on), none of the changes is applied.
- Language services run on language servers already installed on the machine. When one is missing, the status says why, for example "No language server on this machine" or "Needs the workspace's execution permission". In "Settings → Workspace" you can enable or disable a language, set the executable path and turn on "Format on save".

## Remote files

A project can live on another machine; files, the editor, Git and language services then run there.

1. In "Settings → SSH" choose "Add host", fill in name, host, user, port and key, and save.
2. Use "Validate" in the host's actions: the status shows the Worker version and platform. On first connect, check and "Trust" the key under "Host key".
3. Use "Open remote project" and enter the "Remote project path" to get a workspace that runs on that host.
4. To move an existing workspace to another host, use "Switch" in the workspace page of Settings. Unsaved editor drafts, terminal sessions, browser sessions, Git operations or uploads still tied to the old host are listed first, and you choose "Stop and switch".

Language services work on remote hosts too; in a few cases (for example when the remote execution host has none) the status explains why not.

## Browser node

A browser node gives you and your agents one shared web session.

1. Choose "New browser" in the new menu.
2. The address bar, "Back", "Forward", "Reload", "Stop" and tabs work like an ordinary browser; "Open externally" opens the current page in the system browser.
3. The node shows who is driving: "You are driving", "Agent … is driving" or "Nobody is driving". To take the wheel click "Take over", and "Hand back" when done.
4. Agents can read the page (accessibility snapshot), navigate, click, type, drag and drop, pick dropdown options, wait, take screenshots and export PDFs, and can get Console and Network summaries. Sign-ins persist.
5. Files you download go straight to the system downloads folder; downloads started by an agent wait for your confirmation.

Common settings are in "Settings → Browser" (desktop only): "Free hidden pages" and its minutes, "Background page limit", "New node start page", and "Clear data". A freed page reloads when you return to it.

When running on a server, a browser node shows "Remote view" of Chromium on the server: it takes one viewer at a time. If the server finds no Chromium, install one or point the `ARMADRA_BROWSER_PATH` environment variable at it.

Next: [Links and context](/docs/links-and-context/) explains how agents read these nodes; [Keyboard shortcuts](/docs/keyboard-shortcuts/) lists the keys inside the editor and browser nodes.
