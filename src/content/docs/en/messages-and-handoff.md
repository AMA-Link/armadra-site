---
title: Messages and handoff
description: Inbox, push delivery and conversation handoff — three ways to pass work between agents.
group: concepts
order: 3
---

Once agents are linked, they have three ways to pass work along, each for a different situation.

## Inbox (pull)

The most common and quietest way. After a milestone the sender stores a short message: the result, paths to evidence, and the specific question for the other side. The receiver checks its inbox when it needs to and acknowledges once done.

- The app never pastes the message into the other terminal or presses Enter for it.
- Reading doesn't consume a message; acknowledging means "I've taken this".
- Messages can only go to agents that are linked and in the same workspace.

In terminals launched from the canvas, agents use these actions through the bundled `armadra-hook`, for example:

```sh
armadra-hook canvas post --to <node> --key review-1 --body 'Build passes. Please review the error handling in src/api.ts.'
armadra-hook canvas inbox
armadra-hook canvas ack --id <message>
```

You usually don't type these yourself: the canvas skill tells the agent which one to use and when.

## Delivery (push)

When the other side should start right away, `canvas send` delivers one task line into the target terminal. Deliveries queue and are written only when the target is idle, sitting at its prompt and has no half-typed input; a hibernated target is woken first. The outcome returns to the sender as a receipt.

`canvas interrupt` sends the target a single Escape to stop a run that went off track; it carries no text.

## Conversation handoff

Package a stretch of work into a frozen handoff and give it to another linked agent:

1. In the agent node choose More → Agent collaboration → Hand off to…, and pick the target.
2. The preview lists the target agent, the files and Git state that travel along, the result trimmed to budget, and what is **not** included.
3. Only after you confirm does the package enter the target's inbox; what you saw and what you approved must be the same package.

Permission approvals in the session don't transfer, credentials never enter the package, and the source session keeps running.
