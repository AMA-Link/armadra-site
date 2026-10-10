/**
 * 首页文案。事实出自 Owlbay/Armadra 的 README 与 docs/guides/product-overview.md；
 * 改动产品描述前先核对主仓库，不写没有依据的数字或能力。
 */
export const H = {
  docTitle: { zh: 'Armadra · 多 Agent 协作的 AI Coding 画布', en: 'Armadra · An AI coding canvas for agents that work together' },
  hero: {
    eyebrow: { zh: '本地优先的 AI Coding 画布', en: 'A local-first AI coding canvas' },
    /** 两行标题，按语义断行 */
    title: [
      { zh: '让不同的 Agent，', en: 'Put your agents on one canvas,' },
      { zh: '在同一张画布上协作', en: 'and let them work together' },
    ],
    intro: {
      zh: 'Claude Code、Codex 等 CLI Agent 以真实终端节点放在无限画布上，保留各自的账户、模型与权限。连线即上下文，消息与交接组织分工，资料、过程与成果都在同一个空间里。',
      en: 'Claude Code, Codex and other CLI agents run as real terminal nodes on an infinite canvas, keeping their own accounts, models and permissions. Links carry context, messages and handoffs split the work, and the material, the process and the results share one space.',
    },
    demo: { zh: '在线体验', en: 'Try the demo' },
    download: { zh: '下载 {v}', en: 'Download {v}' },
    docs: { zh: '阅读文档', en: 'Read the docs' },
    platforms: { zh: 'macOS · Windows · Linux', en: 'macOS · Windows · Linux' },
    license: { zh: 'MIT 开源', en: 'MIT licensed' },
  },

  why: {
    title: { zh: '三个产品出发点', en: 'Three starting points' },
    items: [
      {
        title: { zh: '工作可以接续', en: 'Work carries over' },
        body: {
          zh: '相连的 Agent 按范围读取摘要、转录与相关资料，交换消息并进行阶段性交接。接手者知道已经确认的决定、失败过的方法和结果的位置。',
          en: 'Linked agents read summaries, transcripts and related material within scope, exchange messages and hand off at milestones. Whoever picks up knows what was decided, what failed and where the results are.',
        },
      },
      {
        title: { zh: '模型可以分工', en: 'Models split the work' },
        body: {
          zh: '为节点选择不同模型，让经济模型承担边界明确的工作，让更强的模型处理复杂判断。当前分工由你或任务指令安排。',
          en: 'Pick a model per node: economical models take well-bounded tasks, stronger ones handle the hard judgment calls. Today the split is arranged by you or by the task instructions.',
        },
      },
      {
        title: { zh: '过程可以查看', en: 'The process stays visible' },
        body: {
          zh: 'Agent、便签、编辑器、Git 差异、文件、浏览器和白板共同构成工作面，方便检查成果、比较方案、调整方向。',
          en: 'Agents, notes, editors, Git diffs, files, browsers and the whiteboard form one work surface, so you can check results, compare approaches and change direction.',
        },
      },
    ],
  },

  features: {
    title: { zh: '能力一览', en: 'What it does' },
    groups: [
      {
        title: { zh: '画布与白板', en: 'Canvas and whiteboard' },
        items: [
          { zh: '终端、便签、分组、编辑器、差异、文件树、浏览器、自动化等节点', en: 'Terminal, note, group, editor, diff, file tree, browser and automation nodes' },
          { zh: '手绘、几何、箭头、文字、图片与 Mermaid 导入', en: 'Freehand, shapes, arrows, text, images and Mermaid import' },
          { zh: '评论钉与 @ 提及，Agent 读节点时附上未解决的评论', en: 'Comment pins and @mentions; agents see open comments when reading a node' },
          { zh: '多人实时编辑：在线光标、选区、离线重连补齐', en: 'Real-time multi-user editing: live cursors, selections, offline catch-up' },
        ],
      },
      {
        title: { zh: 'Agent 协作', en: 'Agent collaboration' },
        items: [
          { zh: '6 种内置 CLI、协调者 ama 与自定义 CLI', en: 'Six built-in CLIs, the ama coordinator and custom CLIs' },
          { zh: '状态归一为 working / waiting / blocked / done，权限请求在节点头部直答', en: 'Status normalized to working / waiting / blocked / done; answer permission prompts right in the node header' },
          { zh: '按连线读取上下文，对等与主从两种链接', en: 'Context read along links, peer or lead–member' },
          { zh: '拉取与推送两种消息模型，对话交接可预览后接受', en: 'Pull and push messaging; handoffs are previewed before you accept them' },
        ],
      },
      {
        title: { zh: '协调者与工作流', en: 'Coordinator and workflows' },
        items: [
          { zh: 'ama 把子任务落成画布节点并收齐结果', en: 'ama turns subtasks into canvas nodes and gathers the results' },
          { zh: '并行、流水线、汇总，成员各带一条 worktree', en: 'Parallel, pipeline and fan-in teams, each member on its own worktree' },
          { zh: '协作沉淀为模板，按参数或定时重跑，关卡等人确认', en: 'Save a collaboration as a template, rerun it by parameter or schedule, with human gates' },
        ],
      },
      {
        title: { zh: '终端与主机', en: 'Terminals and hosts' },
        items: [
          { zh: 'tmux、直连 PTY、SSH 三种后端，tmux 会话跨重启存活', en: 'tmux, direct PTY and SSH backends; tmux sessions survive restarts' },
          { zh: '空闲 Agent 节能休眠，聚焦或投递时 resume 接回', en: 'Idle agents hibernate and resume when focused or messaged' },
          { zh: '远端执行主机：经 SSH 在另一台机器上运行同一份 core', en: 'Remote execution hosts run the same core on another machine over SSH' },
        ],
      },
      {
        title: { zh: '代码工作面', en: 'Code surface' },
        items: [
          { zh: 'CodeMirror 6 编辑器与语言服务', en: 'CodeMirror 6 editor with language services' },
          { zh: '多仓库 Git：提交图、hunk 级暂存、交互式 rebase、worktree', en: 'Multi-repo Git: commit graph, hunk staging, interactive rebase, worktrees' },
          { zh: 'GitHub Issues、Projects 与 PR 评审', en: 'GitHub Issues, Projects and PR review' },
          { zh: '浏览器节点：人与 Agent 共用同一会话', en: 'Browser node: you and your agents share one session' },
        ],
      },
      {
        title: { zh: '远程与多端', en: 'Remote and devices' },
        items: [
          { zh: '无窗口服务器壳：TLS、设备配对、账号与按工作空间共享', en: 'Headless server shell: TLS, device pairing, accounts and per-workspace sharing' },
          { zh: '桌面对外服务，扫码配对手机', en: 'Desktop gateway with QR pairing for phones' },
          { zh: 'passkey、TOTP、GitHub / OIDC 登录', en: 'Passkeys, TOTP, GitHub and OIDC sign-in' },
          { zh: '桌面、浏览器与手机共用同一份页面', en: 'Desktop, browser and phone share the same pages' },
        ],
      },
    ],
  },

  agents: {
    title: { zh: '支持的 Agent', en: 'Supported agents' },
    note: {
      zh: '六种 CLI 与 ama 都可经 ACP 以会话视图驱动（Copilot 不能接回会话）。自定义 Agent 可借用任一内置 CLI 的形状。',
      en: 'All six CLIs and ama can also be driven as a conversation view over ACP (Copilot cannot resume sessions). Custom agents can borrow the shape of any built-in CLI.',
    },
    cols: {
      cli: { zh: 'CLI', en: 'CLI' },
      channel: { zh: '状态通道', en: 'Status channel' },
      resume: { zh: '恢复会话', en: 'Resume' },
      modes: { zh: '非默认权限模式', en: 'Extra permission modes' },
    },
    channel: {
      hook: { zh: '命令 Hook', en: 'Command hook' },
      plugin: { zh: '插件', en: 'Plugin' },
      ext: { zh: '进程内扩展', en: 'In-process extension' },
      host: { zh: '宿主适配器', en: 'Host adapter' },
    },
    cliDefault: { zh: 'CLI 默认', en: 'CLI default' },
  },

  principles: {
    title: { zh: '设计原则', en: 'Design principles' },
    items: [
      {
        title: { zh: '一个 core，两种壳', en: 'One core, two shells' },
        body: { zh: '业务只在一份 TypeScript core 里执行；桌面壳与无窗口服务器壳装配同一份 core 与页面。', en: 'All logic runs in one TypeScript core; the desktop shell and the headless server shell assemble the same core and pages.' },
      },
      {
        title: { zh: '真实 CLI，不代替它', en: 'Real CLIs, not replacements' },
        body: { zh: '启动各 CLI 本体，保留账户、模型、权限与会话格式；Armadra 只负责身份、链接、消息与可读上下文。', en: 'Each CLI runs as itself with its own accounts, models, permissions and session format; Armadra only adds identity, links, messages and readable context.' },
      },
      {
        title: { zh: '连线即上下文', en: 'Links are context' },
        body: { zh: '读取范围由画布上的连线决定，同级消息作为资料处理。', en: 'What an agent can read is decided by links on the canvas; peer messages are treated as material.' },
      },
      {
        title: { zh: '本地优先', en: 'Local first' },
        body: { zh: '桌面安装没有服务端，记录保存在本机 SQLite 与 .armadra/；数据库未知或损坏时拒绝启动，不自动重建。', en: 'The desktop install has no server; records live in local SQLite and .armadra/. An unknown or damaged database stops startup instead of being rebuilt.' },
      },
      {
        title: { zh: '如实的状态', en: 'Honest status' },
        body: { zh: 'unknown / unsupported / stale / denied 都是有效状态，不显示为 0 或成功。', en: 'unknown / unsupported / stale / denied are real states, never shown as zero or success.' },
      },
      {
        title: { zh: '最小侵入', en: 'Minimal footprint' },
        body: { zh: 'Hook 与技能只在画布启动时注入，画布外的 CLI 行为不变；凭据与终端原文不进持久化与日志。', en: 'Hooks and skills are injected only when launched from the canvas, so CLIs outside it are untouched; credentials and raw terminal output never reach storage or logs.' },
      },
    ],
  },

  start: {
    title: { zh: '快速开始', en: 'Get started' },
    download: { zh: '下载安装包', en: 'Download' },
    downloadIntro: {
      zh: '选择系统与架构。当前安装包尚未签名，首次打开时系统会提示风险。',
      en: 'Pick your system and architecture. Packages are not yet signed, so the OS warns on first launch.',
    },
    source: { zh: '从源码运行', en: 'Run from source' },
    sourceIntro: {
      zh: '需要 Node.js ≥ 22 与项目锁定的 pnpm；建议安装 tmux。',
      en: 'Requires Node.js ≥ 22 and the pinned pnpm; tmux is recommended.',
    },
    allReleases: { zh: '全部版本', en: 'All releases' },
    guide: { zh: '安装指南', en: 'Install guide' },
    os: {
      darwin: { zh: 'macOS', en: 'macOS' },
      windows: { zh: 'Windows', en: 'Windows' },
      linux: { zh: 'Linux', en: 'Linux' },
    },
    arch: {
      aarch64: { zh: 'Apple 芯片 / ARM64', en: 'Apple silicon / ARM64' },
      x86_64: { zh: 'Intel / x64', en: 'Intel / x64' },
    },
    kind: {
      dmg: { zh: '磁盘映像', en: 'Disk image' },
      zip: { zh: '压缩包', en: 'Archive' },
      setup: { zh: '安装程序', en: 'Installer' },
      portable: { zh: '免安装版', en: 'Portable' },
      AppImage: { zh: 'AppImage', en: 'AppImage' },
      deb: { zh: 'Debian / Ubuntu', en: 'Debian / Ubuntu' },
      rpm: { zh: 'Fedora / RHEL', en: 'Fedora / RHEL' },
    },
  },

  roadmap: {
    title: { zh: '路线图', en: 'Roadmap' },
    intro: {
      zh: '协作、会话视图、协调者与多人协同的代码大部分已经合入。剩下的主要卡在外部条件上：',
      en: 'Most of the collaboration, conversation view, coordinator and multi-user work has landed. What remains mostly waits on outside prerequisites:',
    },
    cols: {
      area: { zh: '方向', en: 'Area' },
      now: { zh: '现状', en: 'Where it is' },
      needs: { zh: '缺的条件', en: 'Waiting on' },
    },
    items: [
      {
        area: { zh: '签名发布与自动更新', en: 'Signed releases and auto-update' },
        now: { zh: '签名、公证、更新清单与通道已接，未签名包只走到「暂存」', en: 'Signing, notarization, update manifests and channels are wired; unsigned builds stop at staging' },
        needs: { zh: '代码签名证书、公证凭据、发布密钥', en: 'Code-signing certificates, notarization credentials, release keys' },
      },
      {
        area: { zh: 'Windows 正式支持', en: 'Windows, officially' },
        now: { zh: '打包版验收在 Windows runner 上每晚通过', en: 'Packaged acceptance passes nightly on Windows runners' },
        needs: { zh: '真机安装与长时间运行', en: 'Real-machine installs and long runs' },
      },
      {
        area: { zh: '手机原生应用与推送', en: 'Native mobile apps and push' },
        now: { zh: '模拟器里配对到画布已通过', en: 'Pairing to a canvas works in simulators' },
        needs: { zh: '开发者账号、推送密钥、真机', en: 'Developer accounts, push keys, real devices' },
      },
      {
        area: { zh: '另外三家 CLI 的真机验证', en: 'Real runs for three more CLIs' },
        now: { zh: 'Claude / Codex / Pi 已真跑', en: 'Claude, Codex and Pi run for real' },
        needs: { zh: '装好 OpenCode / Oh My Pi / Copilot 的机器', en: 'Machines with OpenCode, Oh My Pi and Copilot installed' },
      },
    ],
    more: { zh: '完整路线图', en: 'Full roadmap' },
  },

  cta: {
    title: { zh: '先在浏览器里看一遍协作过程', en: 'Watch a collaboration in your browser first' },
    intro: {
      zh: '在线演示是一块模拟画布：协调者分派任务，两个 Agent 按连线读取上下文、互相审查，结果汇总回来。',
      en: 'The demo is a simulated canvas: a coordinator hands out work, two agents read context along links and review each other, and the results come back.',
    },
  },
} as const;
