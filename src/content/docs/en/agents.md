---
title: Agents and CLIs
description: Supported CLIs, launching and resuming sessions, permission modes, the terminal and session views, the session timeline and the built-in ama.
group: guides
order: 1
---

Armadra launches the real CLIs you have already installed and signed in to, and keeps their accounts, model choice, tool policy and session format. This page covers launching, resuming, permission modes, and how to choose between the terminal view and the session view.

## Supported agents

| CLI | Status channel | Resume | Extra permission modes |
| --- | --- | --- | --- |
| Claude Code | Command hook | `--resume ID` | Auto edit / Full auto / Plan |
| Codex | Command hook | `resume ID` | Auto edit / Full auto / Plan |
| OpenCode | Plugin | `--session ID` | CLI default only |
| Pi | In-process extension | `--session PATH_OR_ID` | CLI default only |
| Oh My Pi | In-process extension | `--resume ID` | Auto edit / Full auto |
| GitHub Copilot | Command hook | `--resume ID` | Auto edit / Full auto / Plan |
| ama | Host adapter | `--resume ID` | Auto edit / Full auto / Plan |

`ama` is Armadra's own coordinator agent. It ships with the installer, so there is nothing to install; see "The built-in ama" below. You can also add custom CLIs under Settings → Custom agents, borrowing the launch shape of any built-in one.

## Install detection and launching

Armadra does not install or sign in to CLIs for you. Install the CLI you want and sign in once in a terminal first.

1. Right-click an empty spot on the canvas (or choose "New" on the Dock) and pick "New Claude Code", "New Codex" and so on from the "AI assistants" group.
2. A CLI that was not detected is marked "Not installed" and cannot be picked.
3. The node runs the CLI directly. The status chip in its header reflects what the CLI itself reports: Starting, Running, Awaiting approval, Awaiting an answer, Done and so on.

Status comes from the CLI reporting on itself: Claude Code, Codex and Copilot through command hooks, Pi and Oh My Pi through in-process extensions, OpenCode through a plugin. All of this is injected only when launched from the canvas; a CLI you start yourself outside the canvas is untouched.

## Resuming sessions

- Press `⌘K` to open the command palette (or use the search at the top of the sidebar) and choose an entry under "Conversations"; a new node opens on the canvas and picks that session back up with the CLI's resume flag.
- To bring a session from the CLI's own history onto the canvas, open "Settings → Agent CLI", go to that CLI's page, choose "Choose…" on the "Attach a session" row, then search and pick one in the "Attach a Claude Code session…" dialog (only for CLIs that report they can list sessions; a workspace must be open).
- Resuming uses each CLI's own flags (see the table), so only sessions that CLI recognises can be picked up. Copilot cannot resume an existing session in the session view.

## Permission modes

Set "Default permission mode" and "Default agent" under Settings → Defaults; new nodes use them. The modes are Default, Auto edit, Full auto and Plan, but only those the CLI has flags for are offered. Choosing a mode the CLI does not support fails clearly before launch instead of silently downgrading.

## Choosing a model

More → Model in the node header lists the model aliases from that CLI's own docs, with "CLI default" as the default. The choice applies on the **next launch**; the running session is unaffected. If the CLI version cannot be detected, the menu does not appear.

## Two ways to drive an agent

The same agent node can switch between two ways of being driven while the session stays the same:

| | Terminal view | Session view |
| --- | --- | --- |
| What you see | The real CLI's terminal | Message stream, tool calls, file diffs, permission cards |
| Good for | CLI-native interaction and slash commands | Seeing each step clearly, and using it on a phone |
| Status source | Reported by hook, extension or plugin | Obtained directly through each CLI's ACP adapter |

- Choose "Session view" or "Terminal view" from More in the node header, or from the right-click menu. If an approval is still waiting, answer it before switching.
- Under Settings → Defaults, "Default agent view" decides which one new nodes use.
- A reply in the session view can become a sticky, a whiteboard object or an editor node in one click: under "Put on board" on a message, choose "Save as sticky", "Save as whiteboard text", "Code block → editor" or "Mermaid → whiteboard".
- Link reads, messages, delivery and hibernation behave the same in both views.

How far each CLI has been tested in the session view differs: Claude Code has been tested against the real CLI, Pi only for opening a session and switching modes, and the rest have not yet been tested against the real CLI. If something misbehaves, switch back to the terminal view at any time.

## The session timeline

The session view is a timeline arranged by turn: your messages, assistant replies, thinking, tool calls, plans and file diffs.

- Runs of reads, edits and commands fold into one group, such as "Read 3 files" or "Ran 2 commands"; open it for the details.
- Opening an existing node shows its history first, without waiting for the CLI to reattach.
- The node header status shows what the agent is doing right now: Thinking, Running a tool, Awaiting approval, Awaiting an answer, Responding, Asleep, Exited.
- Terminal-driven CLIs feed the same timeline, but at whole-message granularity rather than token by token.
- When a turn fails or is refused, the timeline offers "Retry" and "Continue".

## Eco hibernation

An idle agent can exit its CLI and end the process, then resume the same session when you focus it or when a delivery arrives. A hibernating node shows "Asleep".

## The built-in ama

`ama` is the coordinator agent: give it a goal and it turns subtasks into agent nodes on the canvas and collects the results; see [Coordinator](/docs/coordinator-and-workflows/). It needs a model API key, kept in the machine's key backend; enter it in "Settings → Agent CLI → Armadra Agent": under "Armadra Agent model keys", choose the "Provider", enter the "API key" and "Save".

## Next

- What to do when an agent asks for permission: [Permission requests and approvals](/docs/approvals/).
- Dividing work among agents: [Coordinator](/docs/coordinator-and-workflows/).
