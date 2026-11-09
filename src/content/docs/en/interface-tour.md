---
title: Interface tour
description: What the sidebar, canvas, dock, right-hand tool cluster and panels are in the main window, and how to move between them.
group: start
order: 4
---

This page walks you through Armadra's main window: what each area holds, where to open it and how to get back. Most buttons are icon-only and show their name on hover; the names below are those names. `⌘` in a shortcut means `Ctrl` on Windows and Linux; the full list is in [Keyboard shortcuts](/docs/keyboard-shortcuts/).

## How the window is laid out

- **Left sidebar**: the list of workspaces and boards, search, notifications and the entry to settings.
- **Canvas**: the large area in the middle, holding nodes, links and the whiteboard.
- **Dock**: a toolbar centered along the bottom of the canvas.
- **Right-hand tool cluster**: a column of icons at the canvas's top right that opens panels.
- **Panels and drawers**: slide in from the right or dock at the bottom, for files, Git, resources and more.
- **Minimap**: at the canvas's bottom right.

`⇧⌘L` or the "Collapse sidebar" / "Expand sidebar" button in the title bar folds the sidebar to give the canvas room.

## Left sidebar

- **New board**: opens another canvas ("board") in the current workspace and switches to it.
- **Pinned**: boards you pinned are collected at the top.
- **Workspace groups**: "This computer" holds the projects on this machine, and "Add project" next to its heading adds a new one. When other machines are connected or someone shared a workspace with you, "My other computers" and "Shared with me" appear too; the latter shows your permission (View only, Can edit, Can run, Full control).
- **Workspaces and boards**: a workspace is a project folder, with its boards listed underneath. Click a workspace name to fold or unfold it and a board to switch to it. The "Workspace menu" that appears on hover offers Rename, Share, Pin, Archive and Delete; a board row has "Board actions" for rename, pin and delete. A small dot at the end of a board row means an agent on it needs you, or something finished that you haven't looked at.
- **Search** (the magnifier at the top): one box that searches boards, nodes, workspaces, whiteboard content, files and settings; click a result to jump to it.
- **Notifications** (the bell at the top): opens in place of the project list and shows only what needs you: approvals, answers, errors and handoffs, grouped by workspace, board and node with counts. Click an entry to jump to its node; it disappears once handled. The bell carries a dot while something is waiting; click it again or press `Esc` to return to the project list.
- **Settings** (bottom left): opens settings, shortcut `⌘,`.

## The canvas

The canvas is an infinite plane you can pan and zoom. What you can put on it and how to work with it is covered in [Canvas and nodes](/docs/canvas-and-nodes/).

- Right-click empty canvas for the New menu; nodes, links and whiteboard objects each have their own right-click menu.
- `⌘` plus the scroll wheel zooms, holding `Space` and dragging pans, or pick the "Hand" tool in the dock.
- The minimap at the bottom right can be expanded or collapsed and helps you find your place on a large canvas.
- When several devices or people have the same board open, the online devices show at the top right; a workspace shared with you is headed "<owner>'s <workspace>".

## The dock

From left to right the dock holds:

1. **Lock camera** / **Unlock camera**: freezes the canvas camera against accidental drags.
2. **New** (`+`): the same New menu as right-clicking empty canvas.
3. **Undo** and **Redo**.
4. **Tidy up**: arranges nodes in the layout direction; with nodes selected it becomes "Tidy selection", and right-click offers a one-off "Tidy vertically" or "Tidy horizontally".
5. **Canvas tools**: Select, Hand, Draw / Highlight, Shape, Line / Arrow, Text and "Import…".
6. **Comment**: toggles comment mode and opens the comments drawer on the right.
7. At the right end: the save indicator (Saved, Unsaved, Saving, Save failed) and zoom controls; "Fit" brings everything into view and right-click offers zoom levels.

On a phone the same items sit in one row that scrolls sideways when it doesn't fit.

## The right-hand tool cluster

A column of icons at the canvas's top right, from top to bottom:

| Icon name | What it opens |
| --- | --- |
| Nodes and progress | A list of every node on this board with its last update; "Locate node" jumps to it |
| Explorer | The project file tree, `⇧⌘E`; works with Quick open `⌘P` and Search in project `⇧⌘H` |
| Source control | The Git tool window, docked at the bottom of the window, `⇧⌘G` |
| Code hosting | Issues and pull requests from your code host account |
| Resources | Memory, CPU and session processes on this machine and on execution hosts, `⇧⌘U` |
| Share | Shares the current workspace with others (only for the workspace's owner, and only while it is on this machine) |
| Exit focus mode | Appears only while in focus mode |
| Canvas preferences | Canvas options such as snapping, grid, distraction-free mode, paste position and input device |

How each panel works is covered in [Editor and browser](/docs/editor-and-browser/) and [Git and GitHub](/docs/git-and-github/).

## Command palette and quick open

- **Command palette** (`⌘K`): run any command by name; it also searches past conversations, and recently used entries come first.
- **Quick open** (`⌘P`): jump to a file in the project by name.
- **Search in project** (`⇧⌘H`): search the contents of project files.

## Status and notices

- Node headers carry a status pill that uses one vocabulary everywhere: Running, Idle, Awaiting approval, Awaiting an answer, Done, Turn failed, Asleep and so on.
- A notice occasionally appears at the top of the window: "Board save failed" (click "Retry"), "Local runtime disconnected" (click "Reconnect") or "Terminals fell back to direct mode" (when tmux is missing; click "Settings" to look).
- When an agent needs you, the request appears in the node header and is collected in the sidebar notifications; see [Approvals](/docs/approvals/).

## Moving between areas

- Jump straight in with `⌘K`, `⌘P`, `⇧⌘E`, `⇧⌘G` and the other shortcuts instead of reaching for the mouse.
- Click the same icon again, or press `Esc`, to close an open panel.
- `⌘` plus the arrow keys moves the selection between nodes; with a node selected, `⇧⌘⏎` maximizes it and `⇧⌘F` enters focus mode ("Exit focus mode" appears at the top right).
- On a narrow screen (a phone) the sidebar is a slide-over drawer and "Main navigation" appears at the bottom: Canvas, Files, Git and Settings; see [Mobile app](/docs/mobile/).
