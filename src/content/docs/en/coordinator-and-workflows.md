---
title: Coordinator and workflows
description: Use ama to split tasks and organize a team, and save a settled collaboration as a rerunnable template.
group: guides
order: 2
---

## The ama coordinator

`ama` is the coordinator agent that ships with Armadra. Give it a goal and it turns subtasks into agent nodes on the canvas, assigns them, waits and gathers the results. The "N members" badge in the ama node header opens the dispatch drawer with each member's task status and summary; failed tasks can be retried.

When a member hits a permission request, ama only reports it as blocked; it never answers for you.

## Team shapes

Agent-initiated orchestration supports several shapes:

- **Parallel**: members work on different parts at the same time;
- **Pipeline**: the next starts when the previous finishes (`open-agent --after`);
- **Fan-in**: several members' results go to one node to merge.

Each member can work on its own Git worktree so they don't step on each other.

## Workflows

When a way of collaborating settles, save it as a workflow template:

1. The coordinator proposes a draft;
2. You confirm it as a template on the Workflows page of the work panel;
3. Run it later with parameters, or on a schedule from automation.

Each run creates a frame and the role nodes on the canvas and pauses at gates for your confirmation; runs can be reviewed and compared.

## When to use a workflow

Open-ended tasks change course as you learn, so explore them on the canvas first; turn steps that are clear and repeated into a workflow. The two approaches combine well.
