---
title: Canvas and nodes
description: The node types on the canvas, the whiteboard and comments.
group: concepts
order: 1
---

The canvas is an infinite plane: nodes hold agents and material, links express shared context and collaboration, and groups organize separate tasks.

## Node types

| Node | Purpose |
| --- | --- |
| Terminal (including agents) | A plain shell, or an agent node running Claude Code, Codex or another CLI |
| Note | Task descriptions, decisions, to-dos; agents can read them along links |
| Group / Frame | Frames a set of nodes; can be bound to a worktree |
| Editor | CodeMirror 6 editor with language services and Git gutter marks |
| Diff | Git diffs of the working tree or between commits |
| File tree | Browse project files |
| Browser | One browser session shared by you and your agents |
| Automation | Cron, interval or one-off schedules |
| Agent activity | Summarizes an agent's subtasks and progress |

## Whiteboard

The whiteboard layer shares the camera and undo stack with nodes: freehand, shapes such as rectangles and ellipses, lines and arrows, text and images. Mermaid flowcharts import as editable whiteboard objects; other diagram types import as images. Whiteboard objects and frames can be "referenced to an agent" and become its material as an image or text.

## Comments

Pin comments on the canvas, reply in threads and `@`-mention people. When an agent reads a node along a link, it also sees the node's unresolved comments.

## Saving and multi-user editing

The canvas saves automatically. On a self-hosted server (the server shell) several people can edit the same canvas in real time, seeing each other's cursors and selections; offline edits catch up on reconnect.

## Status

Agent node status is normalized to four states: working, waiting, blocked (needs you) and done. Data that can't be obtained is shown as unknown, never as zero or success.
