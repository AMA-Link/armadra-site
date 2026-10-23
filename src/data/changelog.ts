/**
 * 更新日志：取自 AMA-Link/Armadra 的 CHANGELOG.md，只留用户能感知的改动，不写契约号、迁移号与 PR 号。
 * 新版本加在最前面。
 */
import type { Bi } from '../lib/types';

export interface Release {
  version: string;
  date: string;
  title: Bi;
  items: Bi[];
}

export const CHANGELOG: readonly Release[] = [
  {
    version: '0.10.0',
    date: '2026-10-23',
    title: { zh: '窗口色板与半透明', en: 'Window palettes and translucency' },
    items: [
      { zh: '新增窗口背景色板：素、花瓣、雾、草地、黄昏，画布换同色调淡底', en: 'Window background palettes: Plain, Petal, Mist, Meadow and Dusk, with a matching tint on the canvas' },
      { zh: 'macOS 可开启半透明窗口，侧栏材质跟随应用主题', en: 'On macOS, turn on a translucent window; the sidebar material follows the app theme' },
      { zh: '设置、抽屉、对话框、登录与工作流的间距按层级重排', en: 'Spacing in settings, drawers, dialogs, sign-in and workflows follows one hierarchy' },
      { zh: '配套的个人中转换成 Go 实现，数据不变，可以回退', en: 'The companion personal relay is rewritten in Go; data stays the same and you can roll back' },
    ],
  },
  {
    version: '0.9.3',
    date: '2026-10-23',
    title: { zh: '新建 Agent 跟随默认视图', en: 'New agents follow the default view' },
    items: [
      { zh: '派发、团队、工作流与手动新建的 Agent 节点都按「Agent 默认视图」打开', en: 'Agent nodes from dispatch, teams, workflows or created by hand all open in the Default agent view' },
      { zh: '手动切换过的视图优先保留', en: 'A view you switched by hand takes precedence' },
      { zh: '修复成员加入后偶发的 403', en: 'Fixed an occasional 403 right after a member joins' },
    ],
  },
  {
    version: '0.9.2',
    date: '2026-10-23',
    title: { zh: '权限确认重做', en: 'Reworked permission prompts' },
    items: [
      { zh: '「本次允许」为唯一主按钮并获得焦点，「始终允许」退为次要，数字键直接作答', en: '“Allow once” is the only primary button and takes focus, “Always allow” steps back, and number keys answer directly' },
      { zh: '命令等宽显示、可以展开，读屏软件会播报', en: 'Commands show in monospace and expand, and screen readers announce them' },
      { zh: '加载态统一：短于 200 ms 不出骨架屏，有缓存先显示', en: 'Unified loading: no skeleton under 200 ms, cached content first' },
      { zh: '修复浅色主题打开时闪一下深色', en: 'Fixed a dark flash when opening in the light theme' },
      { zh: '画布终端里 Ctrl+Enter 打断 ama 并立即发送', en: 'Ctrl+Enter in canvas terminals interrupts ama and sends right away' },
    ],
  },
  {
    version: '0.9.1',
    date: '2026-10-22',
    title: { zh: '同一份会话时间线', en: 'One conversation timeline' },
    items: [
      { zh: '会话视图与终端里的 Agent 共用一份时间线，重连、恢复、多端同看不丢不重', en: 'Agents in the conversation view and in terminals share one timeline, with nothing lost or repeated across reconnects, resumes and devices' },
      { zh: '状态逐阶段显示：启动、恢复历史、思考、调用工具、等待审批、输出、完成', en: 'Status shows each stage: starting, restoring history, thinking, calling tools, awaiting approval, writing, done' },
      { zh: '计划、差异、终端输出、思考、图片与音频结构化展示，工具输入不再是原始 JSON', en: 'Plans, diffs, terminal output, thinking, images and audio render as structured content; tool input is no longer raw JSON' },
      { zh: '终端里的 Claude Code、Codex、OpenCode 等也能切到会话视图', en: 'Claude Code, Codex, OpenCode and others in a terminal can switch to the conversation view' },
      { zh: '打开 300 回合的会话从 2.1 秒降到 0.43 秒', en: 'A 300-turn conversation opens in 0.43 s instead of 2.1 s' },
    ],
  },
  {
    version: '0.9.0',
    date: '2026-10-20',
    title: { zh: '节点与进度', en: 'Nodes and progress' },
    items: [
      { zh: '画布右上新增「节点与进度」：按分组列出节点与 Agent 状态，点一行即可定位', en: 'Nodes and progress at the top right of the canvas lists nodes by group with agent status; click a row to jump to it' },
      { zh: 'Armadra、中转与 ama 自本版起共用一个版本号', en: 'Armadra, the relay and ama share one version number from this release on' },
      { zh: '修复打包版启动时偶发的崩溃', en: 'Fixed an occasional crash at startup in packaged builds' },
    ],
  },
  {
    version: '0.6.2',
    date: '2026-10-17',
    title: { zh: 'Codex 沙箱与 Copilot 成本', en: 'Codex sandbox and Copilot cost' },
    items: [
      { zh: 'Codex 在默认沙箱里也能使用画布工具', en: 'Codex can use canvas tools inside its default sandbox' },
      { zh: 'Copilot 成本按每次请求的 token 统计，非高级模型不再显示为空', en: 'Copilot cost counts tokens per request; non-premium models no longer show empty' },
    ],
  },
  {
    version: '0.6.1',
    date: '2026-10-17',
    title: { zh: '更柔和的连线，只提醒要处理的事', en: 'Softer links, and only the alerts that need you' },
    items: [
      { zh: '新建 Agent 节点不再误显示「已退出」，启动失败会写明原因', en: 'New agent nodes no longer show “Exited” by mistake, and a failed start says why' },
      { zh: '退出应用时一并结束全部会话，应用内更新与崩溃后会话仍保留', en: 'Quitting ends every session; sessions still survive in-app updates and crashes' },
      { zh: '连线拐角改为平滑曲线，同组派发只显示一个标签', en: 'Link corners are smooth curves, and a dispatch group shows a single label' },
      { zh: '节点标题栏只留名称、状态、关闭与更多', en: 'Node title bars keep only name, status, close and more' },
      { zh: '通知只提醒等待审批、等待回答、出错与交接，按工作空间分组；手机与平板同步推送', en: 'Notifications only cover approvals, questions, errors and handoffs, grouped by workspace; phones and tablets get the same pushes' },
    ],
  },
  {
    version: '0.6.0',
    date: '2026-10-17',
    title: { zh: '端到端加密与应用内更新', en: 'End-to-end encryption and in-app updates' },
    items: [
      { zh: '经中转的连接全部端到端加密，中转读不到内容', en: 'Everything through a relay is end-to-end encrypted, so the relay cannot read it' },
      { zh: '新设备经扫码、已信任设备批准或核对 6 位码接入', en: 'New devices join by QR code, approval from a trusted device or a 6-digit code' },
      { zh: '应用内更新：校验签名后重启替换，关于页显示版本历史', en: 'In-app updates verify signatures before restarting, with version history in About' },
      { zh: '远程访问重新设计：一个开关允许其他设备访问这台电脑，画布与工作空间可直接分享，默认只读 7 天', en: 'Remote access redesigned: one switch lets other devices access this computer, and canvases and workspaces share directly, read-only for 7 days by default' },
      { zh: '按设备、账号与访客链接统计经中转的流量', en: 'Relay traffic counted by device, account and guest link' },
    ],
  },
  {
    version: '0.5.1',
    date: '2026-10-11',
    title: { zh: '通行密钥修复与 Android 安装包', en: 'Passkey fix and an Android package' },
    items: [
      { zh: '修复部分浏览器登记通行密钥时注册失败', en: 'Fixed passkey registration failing in some browsers' },
      { zh: '服务器镜像改用 Node 24，发布到 ghcr.io/ama-link/armadra-server', en: 'The server image moves to Node 24, published at ghcr.io/ama-link/armadra-server' },
      { zh: '发布页附带签名的 Android 安装包', en: 'Releases include a signed Android package' },
      { zh: '仓库迁到 GitHub 组织 AMA-Link，旧地址自动跳转', en: 'The repository moves to the AMA-Link organization on GitHub; old links redirect' },
    ],
  },
  {
    version: '0.5.0',
    date: '2026-10-10',
    title: { zh: '修改中转口令', en: 'Change your relay password' },
    items: [
      { zh: '中转账号可以修改口令，其他设备随之下线，本设备保持登录；手机与平板同步支持', en: 'Relay accounts can change their password; other devices sign out while this one stays signed in. Phones and tablets get the same' },
      { zh: '官方中转缺省不再要求人机验证', en: 'The official relay no longer asks for a human check by default' },
      { zh: '修复桌面端人机验证弹窗空白与闪烁，中转不要求时不再弹出', en: 'Fixed a blank, flickering human check on the desktop; it no longer appears when the relay does not ask' },
    ],
  },
  {
    version: '0.4.0',
    date: '2026-10-10',
    title: { zh: '中转迁到 Cloudflare', en: 'The relay moves to Cloudflare' },
    items: [
      { zh: '登录远程服务时支持人机验证', en: 'Signing in to a remote service supports a human check' },
      { zh: '服务可以改名，主机可以设置默认名称', en: 'Services can be renamed and hosts can set a default name' },
      { zh: '手机与平板同步支持', en: 'Phones and tablets get the same' },
    ],
  },
  {
    version: '0.3.0',
    date: '2026-10-10',
    title: { zh: '桌面、服务器与手机统一版本', en: 'One version for desktop, server and mobile' },
    items: [
      { zh: '分享整台主机、一个工作区或一个会话，可以设为只读', en: 'Share a whole host, a workspace or a session, optionally read-only' },
      { zh: '账号、设备与会话按签发来源分组', en: 'Accounts, devices and sessions grouped by where they were issued' },
      { zh: 'Claude Code 输入框上方显示上下文与待收消息，新增 /armadra-* 斜杠命令', en: 'Claude Code shows context and pending messages above the prompt, with new /armadra-* slash commands' },
    ],
  },
  {
    version: '0.2.6',
    date: '2026-10-10',
    title: { zh: '多端切换与附件', en: 'Switching services and attachments' },
    items: [
      { zh: '手机和 iPad 启动先选服务，桌面可在新窗口打开另一个服务', en: 'Phones and iPads pick a service at launch; the desktop can open another service in a new window' },
      { zh: '同一台主机可以经多个中转到达，凭据互不覆盖', en: 'One host can be reached through several relays without credentials overwriting each other' },
      { zh: '画布里的 Agent 可以粘贴、拖入图片与文件', en: 'Paste or drop images and files into agents on the canvas' },
    ],
  },
  {
    version: '0.2.5',
    date: '2026-10-10',
    title: { zh: '更快、更省内存', en: 'Faster, with less memory' },
    items: [
      { zh: '资源采样不再卡住界面', en: 'Resource sampling no longer stalls the interface' },
      { zh: '移出视野的终端分阶段释放，会话保留', en: 'Off-screen terminals are released in stages while sessions stay alive' },
      { zh: '终端支持程序状态与进度显示', en: 'Terminals show program status and progress' },
      { zh: 'Codex 启动不再出现警告', en: 'Codex starts without warnings' },
    ],
  },
  {
    version: '0.2.4',
    date: '2026-10-09',
    title: { zh: '设置重组与 Agent 连线', en: 'Reorganized settings and agent links' },
    items: [
      { zh: '设置重组为 8 组，新增终端外观', en: 'Settings regrouped into eight sections, with terminal appearance' },
      { zh: '上下文线与派发线分色，节点四边都能连线', en: 'Context and dispatch links have their own colors; every side of a node can link' },
      { zh: '整理画布支持纵向与横向', en: 'Tidy the canvas vertically or horizontally' },
      { zh: '会话视图节点一出现就能输入', en: 'Conversation-view nodes accept input as soon as they appear' },
    ],
  },
  {
    version: '0.2.3',
    date: '2026-10-08',
    title: { zh: '只动自己的注入', en: 'Only touches its own injections' },
    items: [
      { zh: '只识别 Armadra 自己写入的 Hook 与技能，其他工具的配置不再展示、修改或删除', en: 'Only recognizes hooks and skills written by Armadra; other tools’ configuration is never shown, changed or removed' },
    ],
  },
  {
    version: '0.2.2',
    date: '2026-10-08',
    title: { zh: '界面与多端修整', en: 'Interface and multi-device polish' },
    items: [
      { zh: '在设置里一键安装或重装各家 CLI 与适配器', en: 'Install or reinstall each CLI and adapter from Settings' },
      { zh: '会话视图可以复制、编辑后重发、重新生成、查看差异', en: 'Conversation view: copy, edit and resend, regenerate, view diffs' },
      { zh: '整理画布时分组整块移动，一次撤销', en: 'Tidying moves groups as a whole, undone in one step' },
    ],
  },
  {
    version: '0.2.1',
    date: '2026-10-07',
    title: { zh: '个人中转补齐', en: 'Personal relay, completed' },
    items: [
      { zh: 'iPad 经中转发消息更稳定', en: 'Messages from iPad over a relay are more reliable' },
      { zh: '视频与音频边下边播，经中转同样可用', en: 'Video and audio stream while downloading, also over a relay' },
      { zh: '点开推送直接切到对应主机', en: 'Opening a notification switches to its host' },
    ],
  },
  {
    version: '0.2.0',
    date: '2026-10-07',
    title: { zh: '一份 core，两种壳', en: 'One core, two shells' },
    items: [
      { zh: '桌面壳换成 Electron，新增无窗口服务器壳，安装包可直接 Armadra serve', en: 'Electron desktop shell plus a headless server shell; installers can run Armadra serve' },
      { zh: '会话视图、协调者 ama 与工作流', en: 'Conversation view, the ama coordinator and workflows' },
      { zh: '多人实时编辑、评论与提及', en: 'Real-time multi-user editing, comments and mentions' },
      { zh: 'passkey、TOTP、GitHub / OIDC 登录', en: 'Passkeys, TOTP, GitHub and OIDC sign-in' },
      { zh: '个人中转、远程服务与分享链接', en: 'Personal relay, remote services and share links' },
    ],
  },
];
