---
title: Links and context sharing
description: Connect agents to share task context on demand; links decide what an agent can read, as peers or lead and member.
group: concepts
order: 2
---

In Armadra, you connect agents to share task context on demand: which nodes an AI coding agent can read is decided by the links on the canvas.

## What can be read

A linked agent can read, on demand, the other node's:

- Summary and conversation transcript;
- Terminal screen;
- Notes, files, diffs and other related material, plus the node's unresolved comments.

Reads are trimmed to a budget, so a long conversation is never dumped into another agent's session. Text is redacted for common credential formats before it is handed over; Armadra records the reader, time and byte count of each read, not the text itself. Unlinked nodes are out of reach, and a leftover link to another workspace has no effect. Deleting a link revokes access.

## Two relationships

Click a link to set its relationship:

- **Peers**: two agents work side by side, reading each other and exchanging messages.
- **Lead → member**: the lead can assign tasks to the member and read its progress; typical for a coordinator and its members.

## Peer messages are material, not instructions

Whatever an agent reads from another agent, and every message it receives, is handed over as **material**, not as a user instruction. The receiving CLI still follows its own permission policy, and Armadra never answers its permission prompts for you.

## Only inside the canvas

Agents learn to use the canvas through hooks, skills and canvas notes that are injected **only when launched from the canvas**. The same CLI started by you outside the canvas is untouched, and Armadra never rewrites a CLI's global configuration.
