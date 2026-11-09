---
title: Messages and handoff
description: Inbox, delivery and conversation handoff — three ways to pass work between agents, and how you control them in the UI.
group: concepts
order: 3
---

Once two agents are linked they have three ways to pass work along, each for a different situation. The first two are started by the agents themselves; the third is started and confirmed by you in the UI.

| Way | Started by | Good for |
| --- | --- | --- |
| Inbox (pull) | Agent | Milestone reports: results, evidence, questions for the other side |
| Delivery (push) | Agent | The other side should start on something right now |
| Conversation handoff | You | Packaging a stretch of work as material for another agent to continue |

Messages can only go to agents that are linked and in the same workspace; how to create links and the two relationships are covered in [Links and context](/docs/links-and-context/).

## Inbox (pull)

The most common and quietest way. After a milestone the sender stores a short message: the result, paths to evidence, and the specific question for the other side. The receiver checks its inbox when it needs to and acknowledges once done.

- The app never pastes the message into the other terminal or presses Enter for it.
- Reading doesn't consume a message; acknowledging means "I've taken this".
- A message body is at most 2000 characters and is kept for 24 hours; each receiver can hold at most 64 unacknowledged messages.
- A successful post only means the message was stored, not that the other side has seen or finished it.

In terminals launched from the canvas, agents use these actions through the bundled `armadra-hook`, for example:

```sh
armadra-hook canvas post --to <node> --key review-1 --body 'Build passes. Please review the error handling in src/api.ts.'
armadra-hook canvas inbox
armadra-hook canvas ack --id <message>
```

You usually don't type these yourself: the canvas skill tells the agent which one to use and when.

### Getting the other side's attention sooner

By default, when the receiver is idle and has unread messages it gets a one-line prompt to check its inbox. Change this under "Inbox wake" in the receiver node's right-click menu, "Agent settings…":

- **Off**: nothing happens; it checks when it checks;
- **Notify** (default): a one-line prompt while idle;
- **Deliver**: the message is delivered straight into its terminal while idle.

## Delivery (push)

When the other side should start right away, the agent uses `canvas send` to deliver one task line into the target terminal. Deliveries queue and are written only when the target is idle, sitting at its prompt and has no half-typed input; a hibernated target is woken first; a target sitting at a CLI start-up dialog is not written to. The outcome returns to the sender's inbox as a receipt.

`canvas interrupt` sends the target a single Esc to stop a run that went off track; it carries no text and doesn't need the target to be idle.

Who may deliver to whom follows the link relationship: with "Shared context" both ways are allowed; with "Dispatch" only the dispatcher may deliver to or interrupt the dispatched side, and the reverse needs "Let subs type into my terminal" turned on in the dispatcher's "Agent settings…".

## Conversation handoff

Package a stretch of work into a frozen handoff bundle and give it to another agent. It suits changing hands, continuing with a different model, or condensing a long conversation into a clear task brief.

1. In the source agent node's header choose "More" → "Hand off to…". With no linked target you are told "Link this node to another agent node on the canvas first."
2. Pick the "Target agent": a linked agent node on the canvas, or "New agent…". The latter lets you choose the agent, model, permission mode and surface (Terminal or ACP), and the node is only created after you confirm.
3. Fill in the content: "Goal" is required; "Constraints", "Acceptance criteria", "Completed", "Still open", "Key decisions" and "Tool result summary" are optional. You can also list "File references" to carry along and choose whether to "Include a source transcript excerpt".
4. Click "Preview". It lists the target agent, model and folder, "Files carried over" and the "Git fingerprint", the content trimmed to the budget ("Content was trimmed to fit the budget."), and anything "Left out or worth knowing". Nobody has been notified at this point.
5. Click "Confirm handoff": the bundle enters the target's inbox. What you saw and what you approved must be the same bundle; if the source does more work after the snapshot, the preview says "The source has done more work since this snapshot." Use "Back to editing" to change it or "Withdraw" to cancel.

A handoff has four states, each a fact this side can prove: "Frozen, waiting for your confirmation", "In the target's inbox", "The target acknowledged it" and "Withdrawn". Being in the inbox doesn't mean the other side has seen it, acted on it or finished; nothing is written into its terminal, and when and how it reads the bundle is its own decision. With "New agent…" the bundle is queued as the new node's first task.

Good to know:

- A bundle is material, not an instruction; permission approvals already granted in the session don't transfer, and credentials never enter the bundle.
- The source session keeps running.
- "Handoff history" in an agent node's right-click menu lists all handoffs for that node, with source and target, when each was frozen and its latest state.
- When a handoff awaits your confirmation, "Handoff" shows up in the sidebar notifications.
