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
    version: '0.17.1',
    date: '2026-11-10',
    title: { zh: '修复：远程电脑上可新建项目与画布', en: 'Fixes: create projects and boards on a remote computer' },
    items: [
      { zh: '侧栏「我的其他电脑」里在线的每台电脑都能添加项目，建好的项目与之后新建的画布都落在那台电脑上', en: 'Each online computer under “My other computers” in the sidebar can add projects, and the project and any boards created next land on that computer' },
      { zh: '切走含浏览器节点的画布后，缩略图里不再多出一块看不见的灰色方块，「适应」视图也不再被它撑大', en: 'After switching away from a board with a browser node, the minimap no longer shows an invisible grey box and fit view is no longer stretched by it' },
    ],
  },
  {
    version: '0.17.0',
    date: '2026-11-10',
    title: { zh: '升级到 Electron 45，ama 的模型密钥有了自己的入口', en: 'Electron 45, and a home for ama’s model keys' },
    items: [
      { zh: '桌面升级到 Electron 45（Chromium 156）；macOS 最低系统要求升到 13.3，macOS 12 请停留在 0.16.0', en: 'The desktop app moves to Electron 45 (Chromium 156); the minimum macOS version rises to 13.3, so stay on 0.16.0 on macOS 12' },
      { zh: '选择文件夹时从上次所在的目录打开，不再总是跳到「下载」', en: 'The folder picker opens in the last directory you used instead of always jumping to Downloads' },
      { zh: 'ama 的模型密钥可以在「设置 → Agent CLI → Armadra Agent」里直接填写', en: 'ama’s model keys can be entered directly under Settings → Agent CLI → Armadra Agent' },
      { zh: '防休眠设置不再列出已下线的「有自动化运行时」；说明文档与实际界面对齐；依赖与工具链升级', en: 'The keep-awake setting no longer lists the retired “while automations run” option; the docs match the actual interface; dependency and toolchain upgrades' },
    ],
  },
  {
    version: '0.16.0',
    date: '2026-11-09',
    title: { zh: '交接 v2，画布协作免逐次确认，协调者读账本更省', en: 'Handoff v2, canvas collaboration without per-call approval, and a leaner coordinator' },
    items: [
      { zh: '交接：批准后立即唤醒接手的 Agent，并给它一份任务简报（要做的事、约束、完成标准）；接手方能按页读到交出方的原始对话；可以交给新开的 Agent，并选模型、权限与形态', en: 'Handoff: the receiving agent is woken as soon as you approve and gets a task brief (goal, constraints, acceptance criteria); it can page through the original conversation of the handing-off agent; and you can hand off to a newly opened agent with its model, permissions and surface chosen up front' },
      { zh: '终端里的 Claude、OpenCode、Copilot、omp 与 ama 调用画布协作时不再逐次要你确认；开着 Claude 沙箱也能用', en: 'Claude, OpenCode, Copilot, omp and ama in the terminal no longer ask you to confirm each canvas collaboration call, and it works with the Claude sandbox turned on' },
      { zh: '协调者（ama）改用资源方式读工作账本与事件，工具表更短，长时间运行更省上下文', en: 'The coordinator (ama) reads the work ledger and events as resources, with a shorter tool list that saves context in long runs' },
      { zh: '会话还没开好时输入的第一句话不再丢失；经互联网中转打开画布时能接回之前的终端会话', en: 'The first message typed before a session is ready is no longer lost, and reopening a canvas over the internet relay reattaches earlier terminal sessions' },
    ],
  },
  {
    version: '0.15.1',
    date: '2026-11-06',
    title: { zh: 'macOS 安装包签名修复，协调者主动接单，手机体验修正', en: 'Properly signed macOS packages, active pickup for the coordinator, and phone fixes' },
    items: [
      { zh: 'macOS：安装包现在整体签名，系统校验能通过；0.14.0、0.15.0 的 macOS 安装包签名不完整，建议升级', en: 'macOS: packages are now signed as a whole and pass the system’s signature check; the 0.14.0 and 0.15.0 macOS packages were incompletely signed, so upgrading is recommended' },
      { zh: '协调者可以主动接单：在分派抽屉里给它配要盯的仓库、允许名单与规则文件，新的 issue 与 PR 先进候选；缺省只观察、只记判定，确认规则后才切到自动接单', en: 'The coordinator can pick up work on its own: point it at repositories with an allow list and a rules file in the dispatch drawer, and new issues and pull requests become candidates; it only observes and records decisions by default, and picks up automatically only after you confirm the rules' },
      { zh: '手机与平板：打开时恢复上次的工作空间；设置铺满整屏，新增界面方向（跟随系统 / 竖屏 / 横屏）；浮层、面板与表格按统一比例缩小，与电脑一致', en: 'Phone and tablet: the last workspace opens again on launch; settings fill the screen and gain an orientation option (system, portrait, landscape); overlays, panels and tables are scaled down to match the desktop' },
      { zh: '互联网中转在电脑繁忙时不再误断；依赖的安全更新', en: 'The internet relay no longer drops while the computer is busy; dependency security updates' },
    ],
  },
  {
    version: '0.15.0',
    date: '2026-11-06',
    title: { zh: 'Pi 走 ama 的桥，协调者会回话，工作项能绑定 PR', en: 'Pi through the ama bridge, a coordinator that reports back, and work items bound to pull requests' },
    items: [
      { zh: 'Pi 的 ACP 改走随包 ama 的桥，不再需要另装适配器；Pi 的模式与思考强度可以直接选，Pi 超出已验证的版本时提示一次', en: 'Pi over ACP now runs through the bundled ama bridge, with no separate adapter to install; Pi modes and thinking level are selectable, and a Pi outside the verified versions is flagged once' },
      { zh: '协调者只在有成果等你验收、有事要你决定或回答你的追问时发话，手机会收到推送；分派抽屉标出未读的回复', en: 'The coordinator speaks up only when a result is ready for review, a decision is needed or your follow-up is answered, with a push to your phone; the dispatch drawer marks unread replies' },
      { zh: '电脑重启后，中断的工作项在成员续接时收到一次恢复提示，不会自动重跑', en: 'After a restart, interrupted work items get one recovery prompt when the member resumes; nothing is re-run automatically' },
      { zh: '工作项可以绑定 PR（GitHub、Gitea / Forgejo、GitLab）：评论、评审与检查结论转给负责的成员，自己开的 PR 合并或关闭后工作项结束', en: 'Work items can be bound to pull requests (GitHub, Gitea / Forgejo, GitLab): comments, reviews and check results go to the responsible member, and an item finishes when its own pull requests are merged or closed' },
      { zh: '安全：hook 密钥存进系统凭据库；Windows 上各条本机通道改走私有命名管道，也终于能用 hook 与需要口令的 SSH 主机。升级当次，Windows 上正在运行的终端会话会丢失一次', en: 'Security: the hook secret now lives in the system credential store; on Windows every local channel uses a private named pipe, which also brings hooks and password-protected SSH hosts to Windows. Running Windows terminal sessions are lost once at this upgrade' },
      { zh: 'macOS：开发与隔离运行的实例不再读写真实应用的钥匙串，也不再弹出「找不到钥匙串」窗口', en: 'macOS: development and isolated instances no longer read or write the real app’s Keychain items, and never raise the "Keychain Not Found" dialog' },
      { zh: '云端控制台：账号页可以绑定、解绑第三方登录，只用第三方登录的账号也能再验证与改邮箱', en: 'Cloud console: link and unlink third-party sign-in on the account page; accounts that only use third-party sign-in can re-verify and change their email' },
      { zh: '侧栏「这台电脑」列出全部工作空间，在手机上建的也能在电脑上看到；手机上用手指拉伸节点会正确保存，并继续收到别处的改动', en: 'The This computer sidebar lists every workspace, including ones created on the phone; finger-resizing a node on the phone now saves and keeps receiving changes from elsewhere' },
      { zh: '上下文用量统一用 K / M 单位，例如 12.3K / 200K；ama 的驱动表收录 omp', en: 'Context usage is shown in K / M units, such as 12.3K / 200K; ama adds omp to its driver catalog' },
    ],
  },
  {
    version: '0.14.0',
    date: '2026-11-05',
    title: { zh: '一张二维码连接手机，Pi 接入 ACP', en: 'One QR code to connect a phone, and Pi over ACP' },
    items: [
      { zh: '连接手机只剩一张二维码：设置里点「连接手机」才生成，局域网与互联网两条路装在同一张码里，手机自动选能连上的那条；手机相机扫到也能直接在浏览器打开', en: 'Connecting a phone takes one QR code: it is generated when you open Connect a phone in Settings, carries both the LAN and the internet route, and the phone picks whichever works; the phone camera can also open it straight in the browser' },
      { zh: '手机与电脑要一起升到 0.14.0 才能扫码连接，已经连上的设备不受影响', en: 'Phone and computer both need 0.14.0 to connect by QR code; devices that are already connected are unaffected' },
      { zh: 'ama 新增 Pi 的 ACP 桥：ama --mode acp --bridge pi 把本机的 Pi 作为 ACP Agent 使用，不需要 ama 自己的 key', en: 'ama adds a Pi ACP bridge: ama --mode acp --bridge pi exposes your local Pi as an ACP agent, without an ama key' },
      { zh: '修复：ACP 会话里接管与交还输入的顺序偶尔颠倒，导致消息投递超时', en: 'Fixed: taking over and handing back input in an ACP session could land out of order and time out message delivery' },
      { zh: '文档：新增 macOS 首次打开说明', en: 'Docs: new macOS first-launch notes' },
    ],
  },
  {
    version: '0.13.0',
    date: '2026-11-04',
    title: { zh: '设置整理、ACP 会话改版与全局搜索', en: 'Tidier settings, a redesigned ACP view and search everywhere' },
    items: [
      { zh: '设置整理：账号、设备与登录会话合并到「账号与设备」一页；每家 Agent 一个启用开关，关掉后不出现在新建菜单，也不会被其他 Agent 派发', en: 'Tidier settings: account, devices and sign-in sessions share one Account & devices page; each agent has an enable switch, and a disabled agent leaves the create menus and cannot be dispatched by other agents' },
      { zh: '快捷键页改为紧凑分组列表，新增画布全选；弹窗开着时画布快捷键不再生效', en: 'The shortcuts page is a compact grouped list, with a new canvas select-all; canvas shortcuts pause while a dialog is open' },
      { zh: 'ACP 会话视图改版：两行输入区，模型与思考强度合成一个控件，计划条在输入框上方，审批直接在工具行里答；Armadra 自己的画布工具不再每次都要审批', en: 'A redesigned ACP session view: a two-row composer, one control for model and thinking level, the plan bar above the input and approvals answered inline on the tool row; Armadra’s own canvas tools no longer ask for approval every time' },
      { zh: '侧栏搜索与 ⌘K 共用一份索引：别的工作空间、画布、节点、白板文字、文件与设置都搜得到，支持拼音首字母与模糊匹配', en: 'Sidebar search and ⌘K share one index: other workspaces, canvases, nodes, whiteboard text, files and settings are all searchable, with pinyin initials and fuzzy matching' },
      { zh: '画布：多选拖动整组跟着走，一键整理按视口横竖排成方正网格，双击空白不再留下空文字', en: 'Canvas: multi-selection drags as a group, tidy lays nodes out in a grid that follows the viewport shape, and double-clicking empty space no longer leaves empty text behind' },
      { zh: '手机与平板：横屏铺满整屏，竖屏 Dock 一行横向滚动、工具一个不少，打开画布时字号可读，长按与双击新建', en: 'Phone and tablet: landscape uses the full screen, the portrait Dock is one scrolling row with every tool, canvases open at a readable zoom, and long-press or double-tap creates' },
      { zh: '修复：桌面版不再不断累积登录会话，旧的闲置会话会自动清理；接管会话只列出当前工作空间内的会话', en: 'Fixed: the desktop app no longer piles up sign-in sessions, and idle old ones are cleaned up automatically; taking over a session only lists sessions inside the current workspace' },
    ],
  },
  {
    version: '0.12.0',
    date: '2026-11-02',
    title: { zh: '手机补齐、黄金比例画布与协调者账本', en: 'Phone polish, golden-ratio canvas and the coordinator ledger' },
    items: [
      { zh: '画布节点按黄金比例取尺寸并对齐点阵，新建节点后相机自动居中并缩放', en: 'Canvas nodes use golden-ratio sizes aligned to the dot grid, and the camera centres and zooms on a new node' },
      { zh: 'ACP 会话补齐：新建后立即选择模式与模型，支持 Agent 登录与登出，可列出并接管 Agent 自己的会话，审批按钮显示 Agent 给的选项名', en: 'ACP sessions filled out: pick the mode and model right after creating one, sign in to and out of an agent, list and take over the agent’s own sessions, and approval buttons show the agent’s own option names' },
      { zh: '协调者的工作项账本：成员结构化汇报与交回，协调者读账本，节点头与分派抽屉显示阶段；进展看门狗提示久无上报、久无结论或等待过久，只提示不处置', en: 'A work-item ledger for the coordinator: members report and hand back in a structured way, the coordinator reads the ledger, and node headers and the dispatch drawer show the stage; a progress watchdog flags stalled, unanswered or long-waiting work without acting on it' },
      { zh: '远程访问以 Armadra 云（邀请制内测）为缺省：未登录走设备码登录，控制台支持第三方登录（GitHub / Google，按服务端配置启用）', en: 'Remote access defaults to Armadra Cloud (invite-only beta): sign in with a device code, and the console supports third-party sign-in (GitHub / Google, enabled by server configuration)' },
      { zh: '工作空间可以归档，归档后可撤销，也可在设置里恢复或删除', en: 'Workspaces can be archived, with undo, and restored or deleted from Settings' },
      { zh: '手机与平板：挂载云主机走端到端通道，横屏仍用手机布局', en: 'Phone and tablet: cloud hosts mount over the end-to-end channel, and landscape keeps the phone layout' },
      { zh: '修复：Windows 上同时关闭多个终端会让其它终端一起断开；macOS 发布包每关一个终端泄漏一个 pty 设备，累计后开不出新终端；浏览器节点默认拒绝站点权限请求', en: 'Fixed: closing several terminals at once on Windows no longer drops the others; the macOS build no longer leaks a pty device per closed terminal, which could end in no new terminals opening; browser nodes deny site permission requests by default' },
    ],
  },
  {
    version: '0.11.0',
    date: '2026-10-30',
    title: { zh: '界面统一与终端深浅色', en: 'Unified interface and light / dark terminals' },
    items: [
      { zh: '整套界面换上统一的设计系统：新字体 Inter 与 Geist Mono、分级的面与投影、统一的圆角与动效', en: 'The whole interface moves to one design system: Inter and Geist Mono, layered surfaces and shadows, consistent corner radii and motion' },
      { zh: '设置改为工作台：左侧导航、面包屑与设置搜索，弹窗四周留出边距', en: 'Settings become a workspace with side navigation, breadcrumbs and settings search, in a dialog that leaves room around it' },
      { zh: 'Agent 状态更精简：节点、通知与分派抽屉只显示状态，有子 Agent 时带一棵缩略树', en: 'Leaner agent status: nodes, notifications and the dispatch drawer show only the status, with a small tree when there are sub-agents' },
      { zh: '终端跟随深浅色主题，也可以选择始终深色', en: 'Terminals follow the light or dark theme, or stay dark if you prefer' },
      { zh: '多台设备同看一个终端时不再互相干扰：不再出现多余的应答字符，新设备加入也不会让已打开的终端整屏重绘', en: 'Several devices on one terminal no longer get in each other’s way: no stray reply characters, and a device joining no longer redraws terminals that are already open' },
      { zh: 'Armadra 云（邀请制内测）：网页控制台可管理个人空间、团队、主机授予、设备信任与链接，并能直接打开主机；新设备可在控制台背书', en: 'Armadra Cloud (invite-only beta): the web console manages personal spaces, teams, host grants, device trust and links, and opens a host directly; new devices can be endorsed from the console' },
      { zh: '手机与平板：按钮与输入框改为触控尺寸，设备背书会推送提醒', en: 'Phone and tablet: buttons and inputs use touch sizes, and device endorsements arrive as push notifications' },
    ],
  },
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
