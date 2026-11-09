---
title: Permission requests and approvals
description: Where agent permission requests appear, how to approve or reject them, who can answer, and why Armadra never answers for you.
group: guides
order: 2
---

When an agent wants to run a command, change a file or call a tool, its CLI asks you for permission. This page covers where those requests show up in Armadra, how to answer them, who is allowed to answer, and how you get notified in time.

## Where requests appear

The same request is visible in several places; answering it in one is enough:

- **Node header**: in the terminal view, the status chip becomes "Awaiting approval" and "Allow" and "Reject" appear beside it. When the agent is asking you a question rather than requesting permission, the chip reads "Awaiting an answer" and the button is "Answer", which takes you to the session to reply.
- **Permission card in the session view**: the request is a card that says what is about to happen. Command requests show the command itself, and tool calls can be expanded with "Details". Risky operations carry a "Risky" mark.
- **Sidebar notifications**: "Notifications" in the sidebar lists every node that is awaiting approval, awaiting an answer or in error; choose one to jump to that node. With nothing pending it reads "Nothing needs you".
- **System notifications and phone push**: see "Notifications" below.

## Approve or reject

1. Read what the card says: a command, a file change or a tool call. If unsure, open "Details".
2. Choose "Allow" or "Reject". Session-view cards list the options the CLI offers; common ones are:
   - "Once": applies to this request only, "Allow" or "Reject";
   - "Always": "Always allow" or "Always reject", so similar requests are no longer asked about; use with care;
   - "Allow for session": allowed only within the current session.
3. After you answer, the card shows the outcome, such as "Allowed", "Always allowed" or "Rejected", and the turn carries on.

Keyboard: with focus inside a card, Esc rejects and the digits 1-9 pick the option in that position.

Armadra only hands your choice to the CLI; the permission policy is still the CLI's. To be asked less often, choose a different permission mode at launch (see [Agents and CLIs](/docs/agents/)); what each mode means is up to the CLI.

## Questions

Some agents ask you a question instead of requesting permission. Questions also appear in the node header and in the session; answer with "Submit", "Continue", "Decline" or "Cancel".

## Who can answer

Not everyone who can see a canvas can answer for its agents:

- On your own computer, you are the one who answers.
- In a shared workspace, answering needs the Driver role (called "Full control" in the cloud); an Operator can only answer requests on terminals they started themselves. Viewers and Editors see "Waiting for a driver" and cannot answer.
- When an agent asks to close a node, an "Allow" or "Deny" confirmation appears; again only a Driver can answer. An expired request says "This request has expired."

For roles and how they are granted, see [Self-hosting and remote access](/docs/server-and-devices/) and [Teams and console](/docs/teams-and-console/). On a server shell, answering an approval is recorded in the audit log.

## Armadra never answers for you

- When a member hits a permission request, the coordinator `ama` only reports it as blocked; it does not approve on your behalf.
- Other agents, automations and workflows do not click "Allow" either. A workflow "Gate" likewise stops and waits for you to "Approve" or "Reject".
- A request waits for as long as it takes. When nobody has dealt with it for a while the node shows "Waiting too long", and an agent making no progress shows "Stalled" or "Idle, no result". Set the minutes for "Stalled alert" and "Waiting-too-long alert" under Settings → Notifications.

Canvas collaboration actions between agents, such as reading context over a link or sending a message, do not need an approval each time; they only do what the link and node permissions already allow.

## Notifications

- **System notifications**: turn on "Notify when input is needed" under Settings → Notifications and a request pops up as "<node title> needs approval". The same page has "Sound" and "Volume".
- **Phone push**: the phone has a set of "Notify me about" switches, so you can turn "Approval requests", "Waiting for an answer", "Agent errors", "Stalled agents", "Workflow gates" and so on on or off individually; registered devices are listed under "Push devices" in Settings → Notifications. Tapping a notification opens that node. See [Mobile app](/docs/mobile/).
- You can answer from the phone too, without going back to the computer, as long as your role allows it.
