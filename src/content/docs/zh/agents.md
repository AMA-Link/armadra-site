---
title: Agent 与 CLI
description: 支持的 CLI、状态通道、恢复会话、权限模式与会话视图。
group: guides
order: 1
---

Armadra 启动真实 CLI，保留各自的账户、模型选择、工具策略与会话格式。

## 支持的 Agent

| CLI | 状态通道 | 恢复会话 | 非默认权限模式 |
| --- | --- | --- | --- |
| Claude Code | 命令 Hook | `--resume ID` | auto-edit / full-auto / plan |
| Codex | 命令 Hook | `resume ID` | auto-edit / full-auto / plan |
| OpenCode | 插件 | `--session ID` | CLI 默认 |
| Pi | 进程内扩展 | `--session PATH_OR_ID` | CLI 默认 |
| Oh My Pi | 进程内扩展 | `--resume ID` | auto-edit / full-auto |
| GitHub Copilot | 命令 Hook | `--resume ID` | auto-edit / full-auto / plan |
| ama | 宿主适配器 | `--resume ID` | auto-edit / full-auto / plan |

`ama` 是 Armadra 自带的协调 Agent。也可以添加自定义 CLI，借用任一内置 CLI 的启动形状。

## 状态通道

节点头部的状态与自动化的空闲判断，都来自 CLI 自己的回报：Claude Code、Codex、Copilot 通过命令 Hook，Pi 与 Oh My Pi 通过进程内扩展，OpenCode 通过插件。这些只在从画布启动时注入。

## 模型与权限

- 节点头部的「更多 → 模型」列出该 CLI 文档里的模型别名，选择后在**下一次启动**时生效。
- 权限模式只提供 CLI 有对应参数的那些；不支持的模式会在启动前明确报错，不静默降级。
- 节点可以绑定 Claude 或 Copilot 的第二个账号。

## 会话视图（ACP）

同一个 Agent 可以在终端视图与会话视图之间切换。会话视图里是消息流、工具调用、文件差异和权限卡；助手回复可以一键落成便签、白板对象或编辑器节点。连线读取、消息、投递与休眠在两种视图下一样。Copilot 在会话视图下不能接回已有会话。

## 节能休眠

空闲的 Agent 可以先退出 CLI 再结束进程，聚焦、收到投递或计划到点时用 resume 接回原会话。
