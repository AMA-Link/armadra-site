---
title: 常见问题
description: 数据、费用、隐私与兼容性方面的常见疑问。
group: reference
order: 1
---

## 是否包含模型服务？

不包含。Armadra 连接你配置的 AI 工具。外部 CLI 使用各自的账户和计费方式，模型调用由各 CLI 按其提供方的规则完成；协调者 `ama` 的模型密钥需单独配置，保存在本机的密钥后端，只交给 ama 进程。

## 我的数据存在哪里？

桌面模式下没有单独的服务端，工作空间记录保存在本机 SQLite 与工作区的 `.armadra/` 目录。

- **不持久化**：终端原始输出、密钥和 `.env` 不写进画布数据与日志；节点凭据与 ama 的模型密钥只放在本机的密钥后端，启动时只设给对应的 CLI 进程，数据库里只记条目名。
- **按连线读取**：相连的 Agent 可以在连线权限内按需读取对方终端最近的画面、转录与摘要。这些内容在交出前会按常见凭据格式脱敏，并计入这条连线的读取预算；Armadra 只记录谁在何时读了多少，不保存读到的正文。脱敏靠模式匹配，自造格式的密钥可能认不出，不要把机密直接打在 Agent 终端里。
- **模型服务**：Agent 调用模型时，请求和相关数据按你所用 CLI 与模型服务的设置及政策处理。

## 会修改全局 CLI 配置吗？

不会。Hook、技能和画布说明只在从画布启动 CLI 时注入，画布外启动的同一个 CLI 不受影响，Armadra 也不写 CLI 的全局配置。

## 关掉窗口后 Agent 还在跑吗？

在。关闭窗口不停止后台；使用 tmux 后端时，终端会话还能跨应用重启存活。

## 数据库损坏怎么办？

Armadra 遇到未知或损坏的数据库会拒绝启动，不会自动清空或重建，以免丢数据。可以用设置里的一致性备份恢复。

## 为什么系统提示安装包有风险？

当前安装包还没有代码签名与公证，见[安装](/docs/install/)里的处理方法。签名发布在路线图上。

## 和 Workflow 工具有什么不同？

Workflow 擅长把步骤明确的任务编排成可重复流程；Armadra 的节点运行的是完整的 Agent 产品，适合路径会随发现变化的开放任务。两者可以结合：先在画布上探索，再把稳定的协作存成[工作流](/docs/coordinator-and-workflows/)。

## 在哪里反馈问题？

使用与故障可以发邮件到 [support@armadra.com](mailto:support@armadra.com)，合作咨询发到 [contact@armadra.com](mailto:contact@armadra.com)，安全漏洞请私下发到 [security@armadra.com](mailto:security@armadra.com)。

软件问题也可以到 [AMA-Link/Armadra](https://github.com/AMA-Link/Armadra/issues/new/choose)；官网与文档的问题请到 [AMA-Link/armadra-site](https://github.com/AMA-Link/armadra-site/issues/new/choose)。
