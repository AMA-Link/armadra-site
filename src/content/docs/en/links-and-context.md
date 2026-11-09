---
title: Links and context
description: Links decide what an agent can read and whom it can message, with two relationships, Shared context and Dispatch.
group: concepts
order: 2
---

In Armadra you connect agents to share task context on demand: which nodes an AI coding agent can read, and whom it can message, is decided by the links on the canvas. Unlinked nodes can't see each other.

## Creating a link

- **Between nodes**: hover a node's edge, drag its "Link" handle and drop it on another node. A node can't link to itself, and two nodes can only have one link between them.
- **Naming**: the first time you link, if an end has no name yet, a "Give it a name" dialog opens. The name is the short word agents use for each other (`@name`): lowercase letters, digits, `-` or `_`, starting with a letter or digit, up to 24 characters, and unique on the board. You can "Skip" and name it later with "Name…" in the node menu.
- **Choosing the relationship**: the same dialog has "How these two relate" with "Shared context" (the default) or "Dispatch"; see the next section.
- **Linking to whiteboard objects**: dragging the line onto whiteboard text, a shape or an image "references it in an agent"; see [Canvas and nodes](/docs/canvas-and-nodes/).
- **Spawning**: drag from an agent node's handle to empty canvas and release; a menu opens at that spot with a first line "Dispatch from @name". Pick an agent and a new node is created there with a dispatch link. You can also right-click an agent node and choose "Spawn".
- **Deleting or changing**: right-click a link and choose "Use shared context", "Use dispatch", "Reverse dispatch" (flip the direction) or "Remove link". Removing a link revokes access.

## Two relationships

| | Shared context | Dispatch |
| --- | --- | --- |
| How it arises | A link you draw on the canvas; the default | A node created with "Spawn", or a link you switch to "Dispatch" |
| Reading | Both ways | Both ways |
| Delivering a task into the other's terminal | Both ways | Only the dispatcher can deliver to or interrupt the dispatched; the dispatched side can only leave messages by default |
| How it looks | A plain line | A line with an arrowhead pointing at the dispatched side; the dispatcher's node shows "Dispatch · N" and the dispatched node "Dispatched by @name" |

Dispatch suits a coordinator and its members: the coordinator hands out tasks and members report back with messages. For the dispatched side to deliver straight into the dispatcher's terminal, the dispatcher must turn on "Let subs type into my terminal" under "Agent settings…"; it is off by default. If the dispatcher is deleted the dispatched node keeps running and shows "Dispatcher is gone".

## What can be read

A linked agent can read, on demand, the other node's:

- Summary and conversation transcript;
- Terminal screen;
- Notes, files, diffs, web pages and other related material, plus the node's unresolved comments.

When linking to different node types, the label on the line says what is read, for example "Sticky", "File", "Folder", "Web page" or "Diff".

Reads are trimmed to a budget, so a long conversation is never dumped into another agent's session. Text is redacted for common credential formats before it is handed over. A leftover link to another workspace has no effect. Each agent can read at most 64 counterparts (links and whiteboard references together); adding a whiteboard reference beyond that is blocked with a message.

## Who has read me

- A node shows "Read N×"; open it to see "Recently read this node": who read it, how and how many bytes. Armadra records only that, not the text that was read.
- In an agent node's right-click menu, "Agent settings…" offers:
  - **Let linked agents read my transcript**: on by default; turned off, the other side only gets a very short summary;
  - **Inbox wake** and **Let subs type into my terminal**: control how others' messages reach this node; see [Messages and handoff](/docs/messages-and-handoff/).

## Peer messages are material, not instructions

Whatever an agent reads from another agent, and every message it receives, is handed over as **material**, not as a user instruction. The receiving CLI still follows its own permission policy, and Armadra never answers its permission prompts for you.

## Only inside the canvas

Agents learn to use the canvas through hooks, skills and canvas notes that are injected **only when launched from the canvas**. The same CLI started by you outside the canvas is untouched, and Armadra never rewrites a CLI's global configuration.

Agents use links themselves through the bundled `armadra-hook`, for example `armadra-hook context list` to list linked nodes; you usually don't type these, because the canvas skill tells the agent which to use and when.
