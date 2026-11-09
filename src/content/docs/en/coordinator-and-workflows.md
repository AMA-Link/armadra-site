---
title: Coordinator
description: Split work with ama, follow it in the dispatch drawer, and let it pick up issues by rule.
group: guides
order: 3
---

When one goal has to be divided among several agents, hand it to the coordinator `ama`. This page covers how to use it, how to follow it in the dispatch drawer, and how to let it pick up issues by rule.

## The coordinator ama

`ama` is Armadra's own coordinator agent; there is nothing to install. Give it a goal and it turns subtasks into agent nodes on the canvas, dispatches them, waits and collects the results.

1. Create an ama node on the canvas ("New Armadra Agent" in the "AI assistants" group of the new menu; that is ama). ama needs a model API key; in "Settings → Agent CLI → Armadra Agent", under "Armadra Agent model keys", choose the "Provider", enter the "API key" and "Save"; see [Agents and CLIs](/docs/agents/).
2. State the goal in that node, for example "finish the tests for the login module, then have another agent review them".
3. ama creates member nodes, links them and assigns tasks as needed, then writes a summary to a sticky.

The coordinator itself only reads code and does not edit; to actually change files it can only hand work to members on the canvas. The node's "Agent settings" has a "Coordinator" switch, shown only for CLIs that can act as one; it is greyed out while the node is running.

When a member hits a permission request, ama only reports it as blocked and does not answer for you; see [Permission requests and approvals](/docs/approvals/).

## The dispatch drawer

"N members" in the ama node header opens the "Dispatch" drawer on the right.

- "Members" page: each member task's status (Running, Needs you, Done, Turn failed, Stopped, Idle) and stage (Queued, Needs answer, Ready for review, Blocked, Delivery failed, Failed). Choose "Open" to jump to the member node; a task with a failed delivery or that failed can be sent again with "Retry".
- Once the summary is written to a sticky, the drawer shows a "Summary → sticky" line; open it to read. A task's pull request appears as "Open PR #…".
- "New reply" marks fresh replies, and "Disconnected, reconnecting" shows when the connection drops.

## Team shapes

Orchestration is started by an agent on the canvas: tell ama or another agent how to divide the work and it creates member nodes and links them. The common shapes:

- **Parallel**: several members work on different parts at once;
- **Pipeline**: the next member starts when the previous one finishes;
- **Collect**: the results of several members go to one node to merge.

Each member can have its own Git worktree so they do not step on each other.

## Letting ama pick up issues by rule

Besides taking your instructions, ama can watch a repository for unclaimed issues or pull requests and take them on by rules you wrote. First connect the account for that repository's platform under Settings → Code hosting.

1. On the drawer's "Sources" page choose "Add", fill in "Repository" (like `github.com/owner/name`), pick Issue or PR, and choose the "Coordinator" in charge.
2. A new source starts in "Observe" mode: it only collects "Candidates" and lets ama give a verdict; no work is started.
3. On the "Candidates" page go through them one by one. "Verdict" is ama's opinion (Accept, Skip); you "Review" it with "Agree" or "Disagree" to judge how reliable it is. "Stats" totals "Decided · Agreed · Disagreed".
4. When you have seen enough, fill in the "Allow list" (logins that may raise requests, comma separated), choose "Confirm" beside "Rules" to confirm the rules in the repository, then switch "Mode" to "Auto". Rule states are Confirmed, Changed, Unconfirmed and Missing.
5. In auto mode ama only takes candidates raised by people on the list while the rules are unchanged; once members are started the candidate is marked "Dispatched".

If the rules file is edited, its state turns to "Changed" and automatic pickup stops until you "Confirm" again. "Auto needs an allow list and confirmed rules", or the setting does not take effect. A remote workspace cannot read the rules file and can only use "Observe". ama's verdict is only an opinion; Armadra checks the list, the rules and rate limits again before anything starts. Titles and text from outside are always treated as material, never as instructions.

## Next

- Handling agent requests: [Permission requests and approvals](/docs/approvals/).
- How links decide what can be read: [Links and context sharing](/docs/links-and-context/).
