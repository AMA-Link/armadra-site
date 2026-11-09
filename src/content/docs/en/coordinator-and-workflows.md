---
title: Coordinator and workflows
description: Split work with ama, follow it in the dispatch drawer, let it pick up issues by rule, and save a stable collaboration as a workflow you can rerun.
group: guides
order: 3
---

When one goal has to be divided among several agents, hand it to the coordinator `ama`; once a way of working settles down, save it as a workflow template and run it again and again. This page covers both.

## The coordinator ama

`ama` is Armadra's own coordinator agent; there is nothing to install. Give it a goal and it turns subtasks into agent nodes on the canvas, dispatches them, waits and collects the results.

1. Create an ama node on the canvas ("New Armadra Agent" in the "AI assistants" group of the new menu; that is ama). The first time, enter a model API key under Settings → Credentials & keys; see [Agents and CLIs](/docs/agents/).
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

Orchestration started by an agent supports a few shapes:

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

## Workflows

Once a way of working has settled, save it as a workflow template:

1. The coordinator submits a draft, and a "Workflow draft" card appears;
2. Fill in "Name" and choose "Save as workflow" to confirm it as a template, or "Discard";
3. From then on, open the template library from "Workflows" in the "Content" group of the new menu, choose "Run" on the "Templates" page and fill in the parameters; or choose "Schedule" to hand it to automation.

A template consists of "Roles" (each with a name and the CLI it uses), "Steps" and "Parameters" (which can have a "Default"). There are three kinds of step: "Prompt" (hand a task to a role), "Collect" (gather the outputs of other steps) and "Gate" (stop and wait for you). Choose "Edit" to change these; steps are ordered with "Depends on" and can also be reordered by dragging.

Each run creates a Frame and role nodes on the canvas. The "Runs" page shows each step's state (Pending, Running, Needs you, Done, Failed, Skipped, Stopped). At a gate it stops at "Needs you"; add a "Note" and choose "Approve" or "Reject". A run can be stopped, and you can select two runs and choose "Compare selected" to see which outputs are the same and which differ.

When a template is revised, schedules still on the old version show "Template updated"; choose "Update to latest version" to move them over, and you are told which parameters are missing if they no longer fit.

## When to use a workflow

The path of an open-ended task changes as you learn; explore it first on the canvas with ama or a few agents. Once the steps are clear and the process needs to run repeatedly, distil it into a workflow. The two approaches combine.

## Next

- Handling agent requests: [Permission requests and approvals](/docs/approvals/).
- How links decide what can be read: [Links and context sharing](/docs/links-and-context/).
