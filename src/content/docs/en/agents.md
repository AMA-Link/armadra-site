---
title: Agents and CLIs
description: Supported CLIs, status channels, resuming sessions, permission modes and the conversation view.
group: guides
order: 1
---

Armadra launches real CLIs and keeps their accounts, model choice, tool policy and session format.

## Supported agents

| CLI | Status channel | Resume | Extra permission modes |
| --- | --- | --- | --- |
| Claude Code | Command hook | `--resume ID` | auto-edit / full-auto / plan |
| Codex | Command hook | `resume ID` | auto-edit / full-auto / plan |
| OpenCode | Plugin | `--session ID` | CLI default |
| Pi | In-process extension | `--session PATH_OR_ID` | CLI default |
| Oh My Pi | In-process extension | `--resume ID` | auto-edit / full-auto |
| GitHub Copilot | Command hook | `--resume ID` | auto-edit / full-auto / plan |
| ama | Host adapter | `--resume ID` | auto-edit / full-auto / plan |

`ama` is Armadra's own coordinator agent. You can also add custom CLIs that borrow the launch shape of any built-in one.

## Status channels

Node header status and the idle checks used by automation both come from the CLI reporting on itself: Claude Code, Codex and Copilot through command hooks, Pi and Oh My Pi through in-process extensions, OpenCode through a plugin. All of these are injected only when launched from the canvas.

## Models and permissions

- More → Model in the node header lists the model aliases from that CLI's own docs; the choice applies on the **next launch**.
- Only permission modes the CLI has flags for are offered; an unsupported mode fails clearly before launch instead of silently downgrading.
- A node can be bound to a second Claude or Copilot account.

## Conversation view (ACP)

The same agent can switch between a terminal view and a conversation view. The conversation view shows the message stream, tool calls, file diffs and permission cards; a reply can become a note, a whiteboard object or an editor node in one click. Link reads, messages, delivery and hibernation behave the same in both views. Copilot cannot resume an existing session in the conversation view.

## Eco hibernation

An idle agent can exit its CLI and end the process, then resume the same session when focused, when a delivery arrives or when a schedule fires.
