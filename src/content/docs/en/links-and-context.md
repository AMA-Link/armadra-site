---
title: Links and context
description: Links decide what an agent can read; peer and lead–member relationships.
group: concepts
order: 2
---

In Armadra, **links are context**: which nodes an agent can read is decided by the links on the canvas.

## What can be read

A linked agent can read, on demand, the other node's:

- Summary and conversation transcript;
- Terminal screen;
- Notes, files, diffs and other related material, plus the node's unresolved comments.

Reads are trimmed to a budget, so a long conversation is never dumped into another agent's session. Unlinked nodes are out of reach, and a leftover link to another workspace has no effect. Deleting a link revokes access.

## Two relationships

Click a link to set its relationship:

- **Peers**: two agents work side by side, reading each other and exchanging messages.
- **Lead → member**: the lead can assign tasks to the member and read its progress; typical for a coordinator and its members.

## Peer messages are material, not instructions

Whatever an agent reads from another agent, and every message it receives, is handed over as **material**, not as a user instruction. The receiving CLI still follows its own permission policy, and Armadra never answers its permission prompts for you.

## Only inside the canvas

Agents learn to use the canvas through hooks, skills and canvas notes that are injected **only when launched from the canvas**. The same CLI started by you outside the canvas is untouched, and Armadra never rewrites a CLI's global configuration.
