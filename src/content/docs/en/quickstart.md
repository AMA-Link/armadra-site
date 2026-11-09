---
title: Quickstart
description: Add a project, place two agents, link them and let them review each other.
group: start
order: 3
---

This page walks through the smallest useful collaboration in about ten minutes: one AI coding agent implements, another reviews. Before you start, [install](/docs/install/) Armadra and make sure at least two agent CLIs (for example Claude Code and Codex) are installed and signed in on your machine.

## 1. Add a project

A project is a code folder; Armadra calls it a workspace. A workspace can hold several canvases, and agents start in that folder by default.

1. Open Armadra and click "Add project" (`+`) next to the "This computer" heading in the left sidebar.
2. Pick a source in the dialog:
   - **Local**: enter a folder path; on desktop, click "Choose" to use the system folder picker;
   - **Repository**: search and pick a repository from a connected code host account;
   - **URL**: enter a repository URL, choose a parent folder and click "Clone".
3. The project opens right after it is added. On desktop you can also drag a folder onto the sidebar's project area.

"New board" at the top of the sidebar opens another canvas in the current workspace; see the [Interface tour](/docs/interface-tour/) for where everything sits.

## 2. Place two agent nodes

A node is a piece of content on the canvas; an agent node runs the matching CLI.

1. Right-click empty canvas, or click "New" (`+`) in the dock at the bottom.
2. Under "AI assistants" choose "New Claude Code".
3. Create a Codex node the same way. CLIs that aren't installed are marked "Not installed".

Sign-in, models and permissions follow your usual setup. The status pill in the node header shows what it is doing, for example "Running", "Awaiting approval", "Awaiting an answer" or "Done".

## 3. Link them

Links decide who can read whose content.

1. Hover the edge of a node, drag its "Link" handle and drop it on the other node.
2. A "Give it a name" dialog opens: give each end a short name (lowercase letters, digits, `-` or `_`, up to 24 characters); agents address each other as `@name`. You can also click "Skip" and name them later from the node menu.
3. The same dialog has "How these two relate" with two choices:
   - **Shared context** (the default): both sides are peers and can read each other and exchange messages;
   - **Dispatch**: one side assigns tasks to the other, which suits a coordinator and its members.

Unlinked nodes can't see each other. You can change the relationship later: right-click the link and choose "Use shared context", "Use dispatch" or "Reverse dispatch". See [Links and context](/docs/links-and-context/).

## 4. Let them collaborate

Give Claude Code a task as you normally would, for example:

```text
Add "Remember me" to the login page with tests. When you're done, send the diff to the linked Codex and ask for a review.
```

Agents launched from the canvas carry Armadra's canvas skill, so they know how to list linked nodes, send messages and read their inbox. Codex reads the diff and replies with comments; you can watch both nodes as it happens. How messages travel is covered in [Messages and handoff](/docs/messages-and-handoff/).

## 5. Answer permission requests

When an agent needs to run a command or write a file and its permission mode asks for confirmation, the request appears in the node header. Use "Allow", "Reject" or "Answer" right there instead of hunting for a dialog inside the terminal. When the node is out of view, "Notifications" (the bell) at the top of the sidebar shows a dot; open it to see every node that awaits approval, awaits an answer or hit an error, and click one to jump to it. Armadra never answers permission prompts for you; see [Approvals](/docs/approvals/).

## Next

- To learn what each area of the window is: [Interface tour](/docs/interface-tour/).
- To pass a stretch of work from one agent to another: [Messages and handoff](/docs/messages-and-handoff/).
- To have one agent organize a team: [Coordinator and workflows](/docs/coordinator-and-workflows/).
- To continue on a phone or another computer: [Server and devices](/docs/server-and-devices/) and [Mobile app](/docs/mobile/).
