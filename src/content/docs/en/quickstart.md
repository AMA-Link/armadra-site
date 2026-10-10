---
title: Quickstart
description: Add a project, place two agents, link them and let them review each other.
group: start
order: 3
---

This page walks through the smallest useful collaboration in about ten minutes: one agent implements, another reviews.

## 1. Add a project

Open Armadra, click "Add project" under Projects in the left sidebar and choose a code folder. Each project has its own canvas, and agents start in that folder by default.

## 2. Place two agent nodes

Right-click empty canvas (or click `+` in the dock), choose "New Claude Code" under AI assistants, then create a Codex node. CLIs that aren't installed are marked "Not installed".

Each node is a real terminal running the CLI itself: sign-in, models and permissions follow your usual setup. The node header shows its status — working, needs you, done.

## 3. Link them

Drag from one node's link handle to another node to create a link. Click the link to set its relationship:

- **Peers**: both sides can read each other's context within scope and message each other;
- **Lead → member**: the lead can assign tasks to the member, which suits a coordinator and its team.

Unlinked nodes can't see each other. Links decide what can be read; see [Links and context](/docs/links-and-context/).

## 4. Let them collaborate

Give Claude Code a task as you normally would, for example:

```text
Add "Remember me" to the login page with tests. When you're done, send the diff to the linked Codex and ask for a review.
```

Agents launched from the canvas carry Armadra's canvas skill, so they know how to list linked nodes, send messages and read their inbox. Codex reads the diff and replies with comments; you can watch both terminals as it happens.

## 5. Answer permission requests

When an agent needs to run a command or write a file and its permission mode asks for confirmation, the request appears in the node header. Answer it there instead of hunting for a dialog inside the terminal. Armadra never answers permission prompts for you.

## Next

- To have one agent organize a team, see [Coordinator and workflows](/docs/coordinator-and-workflows/).
- To continue on a phone or another computer, see [Server shell and devices](/docs/server-and-devices/).
