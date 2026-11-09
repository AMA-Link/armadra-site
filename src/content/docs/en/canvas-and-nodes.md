---
title: Canvas and nodes
description: The node types on the canvas, how to create and tidy them, and how the whiteboard, comments and groups work.
group: concepts
order: 1
---

The canvas is an infinite plane: nodes hold agents and material, links express shared context and collaboration, groups organize separate tasks, and the whiteboard and comments let you annotate right on it. This page explains what is on the canvas and how to place and tidy it.

A workspace (a project folder) can hold several canvases, which the UI calls boards. Switch between them in the sidebar; each saves on its own.

## Node types

A node is a self-contained piece of content on the canvas.

| Node | Purpose | How to create it |
| --- | --- | --- |
| Terminal | A plain shell; when it runs Claude Code, Codex or another CLI it is an agent node | "New terminal", "New <agent name>"; with SSH hosts configured, one item per host under "Remote terminals" |
| Sticky | Task notes, decisions, to-dos; linked agents can read them | "New sticky" |
| Files | Browse folders and files; click a file to open an editor beside it | "New file browser" |
| Editor | Edit one file, with language services, Git gutter marks and a merge prompt when the file changes on disk | "Open file…" (click a file in the Explorer), "Import files…" or drop files in |
| Diff | View Git changes of the working tree or of a commit | "Save as diff node" on a change card in an agent's session view |
| Browser | One web session shared by you and your agents | "New browser"; only offered in the desktop app or on a server that provides a browser |
| Group | Frames a set of nodes | "New frame", or select nodes and right-click "Group" |

For the details of each node: agents in [Agents](/docs/agents/), editor, files and browser in [Editor and browser](/docs/editor-and-browser/), diffs in [Git and GitHub](/docs/git-and-github/).

## Creating and deleting nodes

- Right-click empty canvas, or click "New" (`+`) in the dock. The menu is split into "Terminal", "AI assistants", "Remote terminals", "Content" and "Canvas actions"; pick an item to create it. Right-clicking centers the node on the pointer, the dock puts it in the middle of the current view.
- Shortcuts: `⌘T` for a new terminal, `⇧⌘C` for a new agent.
- A new node that lands on top of another one moves aside a little, and if you are zoomed far out the view adjusts so the node is readable.
- Select a node and press `Delete`, or right-click "Delete"; if a session is still running in it you are asked "End the session and delete?" first. `⌘Z` undoes it.

## Placing and tidying

- **Move and resize**: drag a node's title to move it and its edges to resize. Right-click a node to "Collapse" it (only the title row stays) or "Maximize" it (it fills the canvas; choose "Restore" to go back).
- **Multi-select**: drag a box, or hold `Shift` to add one by one; `⌘A` selects all. Right-clicking a node can "Duplicate", "Collapse" or "Delete" everything selected at once.
- **Tidy up**: the dock's "Tidy up" arranges nodes in the layout direction; with nodes selected it tidies only those ("Tidy selection"). Right-click it for a one-off "Tidy vertically" or "Tidy horizontally"; the default direction is in settings.
- **Fit**: "Fit" at the dock's right end brings everything into view; right-click for zoom levels. The minimap at the bottom right helps you find your place on a large canvas.
- **Lock camera**: the lock at the dock's left end guards against accidental camera drags; while locked, every canvas tool except "Select" is disabled.
- **Focus**: with a node selected, `⇧⌘F` enters focus mode and `⇧⌘⏎` maximizes it.

## Groups

A group (also called a frame) frames related nodes so you can organize them by task.

1. Select some nodes and right-click "Group"; or right-click empty canvas and choose "New frame" for an empty frame, then right-click nodes and use "Add to group".
2. On a node, "Add to group" picks an existing group and "Remove from group" takes it out.
3. Right-click a group and choose "Ungroup" to dissolve it; the nodes inside stay.
4. When you import several files at once they are placed in a group called "Import" automatically.

A group can also be bound to a Git worktree so one worktree maps to one frame; see [Git and GitHub](/docs/git-and-github/).

## Whiteboard

The whiteboard layer shares the camera and undo stack with nodes: draw and write straight onto the canvas without creating a node. The tools are in the dock; hover for names, or switch by key:

| Tool | Key | Notes |
| --- | --- | --- |
| Select | `V` | The default tool |
| Hand | `H` | Drag to pan |
| Draw / Highlight | `D` / `⇧D` | Freehand and highlighter marks |
| Shape | `R` | Rectangle, ellipse, diamond, triangle, hexagon, star |
| Line / Arrow | `L` / `A` | Lines and lines with arrowheads |
| Text | `T` | Click once to place text |
| Import… |  | Pick an image or file to put on the canvas |

Selecting a whiteboard object brings up the "Style" panel: Colour, Weight, Stroke (Solid, Dashed, Dotted), Fill (None, Semi, Solid), Align and Arrows. Right-click an object for "Bring to front", "Send to back", "Duplicate", "Convert to sticky", "Reference in agent" and "Delete". `Esc` returns to the Select tool.

**Importing diagrams and outside content**

- **Mermaid**: "Import Mermaid…" in the New menu (`⇧⌘M`) opens a dialog; paste source to preview and import it. Flowcharts become editable whiteboard shapes, other diagram types import as images. Dropping a `.mmd` or `.mermaid` file or pasting Mermaid source opens the same dialog.
- **Images**: drop or paste an image to get a whiteboard image; SVG is converted to a bitmap first.
- **Text and links**: paste text or a URL to get whiteboard text.
- **Files and folders**: other dropped files are copied into the workspace and opened in an editor, and a dropped folder becomes a Files node. At most 256 files at a time, 16 MB each and 64 MB in total.

**Giving whiteboard content to an agent**

Right-click a whiteboard object or a group (frame), choose "Reference in agent" and pick an agent node; or drag from a node's link handle onto the whiteboard object. A reference is drawn as a grey dashed line and lets the agent read the object: text objects give their text, shapes with a label give text and an image, and freehand, lines and images give an image. Referencing the same object twice just selects the existing reference, and each agent can reference at most 64 objects; going over is blocked with a message. Right-click a reference line for "Sync references again" or "Remove reference"; the whiteboard object itself is unaffected.

## Comments

Comments let you leave notes, discuss and mention people on the canvas.

1. Click "Comment" in the dock to enter comment mode; the "Comments" drawer opens on the right.
2. Click empty canvas or a node and write your comment; type `@` to mention a member and press `⌘Enter` to send.
3. A comment pin stays on the canvas and opens as a thread you can reply to; each comment can be edited or deleted, and a thread can be resolved ("Resolve") and later reopened ("Reopen").
4. "Unresolved only" in the drawer hides resolved threads.

When an agent reads a node along a link it also sees the node's unresolved comments. Click "Comment" again or press `Esc` to leave comment mode.

## Saving and multi-user editing

The canvas saves automatically. The small dot at the dock's right end shows "Saved", "Unsaved", "Saving" or "Save failed"; when saving fails a notice with "Retry" appears at the top of the window.

On a self-hosted server several people can edit the same canvas in real time, seeing each other's cursors and selections; offline edits catch up on reconnect, and the online-devices bar at the top right shows who is there. For sharing and permissions see [Server and devices](/docs/server-and-devices/) and [Teams and console](/docs/teams-and-console/).

## Status

The status pill in an agent node's header uses one vocabulary everywhere: Running, Idle, Awaiting approval, Awaiting an answer, Done, Turn failed and so on. Data that can't be obtained shows as unknown, never as zero or success.
