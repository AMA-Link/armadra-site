---
title: Usage and models
description: How to pick a model for a node and see machine and session load in the Resources panel.
group: guides
order: 6
---

This page answers two questions: which model a node uses, and how much of the machine the sessions take up.

## Pick a model for a node

Armadra does not provide model services; each CLI calls its own models. You can choose which model a node starts with:

1. Click "More" in the agent node's header and choose "Model".
2. Pick a model from the list; "CLI default" means none is specified and the CLI's own setting applies.
3. When you see "The next session will use …", the running session is unaffected; the new model takes effect the next time the node starts or resumes a session.

The list appears only for agents that support choosing a model. Candidates come from the CLI's own aliases and configuration (for example the model written in Codex's config file), supplemented from a public model catalogue; if that cannot be reached, a built-in list of common models is used. Which models you can actually use still depends on the account and plan you signed in with in the CLI.

The default agent and permission mode are set in "Settings → Defaults"; see [Settings, updates and data](/docs/settings-and-updates/).

## Resources panel: how much the machine and sessions use

The Resources panel shows machine and terminal-session load, not model cost.

1. Click "Resources" in the toolbar cluster at the top right, or press ⇧⌘U (Ctrl+Shift+U on Windows / Linux).
2. The "Execution host" section shows CPU, Memory, Swap, Disk and "Memory pressure" (Normal / Warning / Critical); with remote hosts you can filter by "All hosts" or "Local".
3. The "Sessions" list sorts by CPU, memory or name; a session can expand its process tree, "Find on canvas" jumps to its node, and "End session" stops it (after a confirmation). Session memory is an estimate for the process tree; shared pages are counted repeatedly, so it is not exclusive memory.
4. A hibernated session shows "Hibernated; uses no memory".
5. "Orphaned sessions" lists sessions with no node; you can "Attach to a new node" or "Terminate" them.
6. "Armadra's own processes" lists the load of Armadra's own components.

Related settings are under "Power & resources" in "Settings → Local service":

| Setting | What it does |
| --- | --- |
| Keep-awake policy | Never / while an agent session is active / while automation runs / manual |
| Stay awake while working | Holds off idle system sleep while agents work |
| Sampling interval | How often resource data refreshes |
| Memory reminder threshold | 1, 2, 4, 8 or 16 GB; a session above it changes colour and reminds you once, with no automatic action |

## Usage and cost statistics

Model usage and quota statistics are not open yet, and the interface has no entry for them. To see an account's usage and quota, use each CLI's own commands or website; when your team uses Armadra Cloud, team usage and plan are in the console; see [Teams and console](/docs/teams-and-console/).
