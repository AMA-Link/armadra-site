/**
 * 首页文案：先讲能完成什么，再讲 Agent 如何协作，最后是技术细节。
 * 事实出自 AMA-Link/Armadra 的 README 与 docs/guides/，不写没有依据的数字。
 */
export const H = {
  docTitle: { zh: 'Armadra · 本地优先的 AI 编程协作工作空间', en: 'Armadra · A local-first workspace for collaborative AI coding' },
  hero: {
    title: { zh: '让多个 AI 编程助手，在同一张画布上协作', en: 'Bring your AI coding agents together on one canvas' },
    intro: {
      zh: '将 Claude Code、Codex 等工具集中到一个工作空间。连接 Agent 以共享上下文，分配开发与审查任务，在同一处查看进度、代码变更和结果。',
      en: 'Work with Claude Code, Codex, and other coding tools in one workspace. Connect agents to share context, divide implementation and review tasks, and keep progress, code changes, and results in view.',
    },
    download: { zh: '下载 Armadra', en: 'Download Armadra' },
    quickstart: { zh: '快速上手', en: 'Quickstart' },
    note: { zh: '本地优先 · 开源免费 · 支持现有 CLI 工具', en: 'Local-first · Free and open source · Works with existing CLI tools' },
  },
  get: {
    label: { zh: '获取方式', en: 'Get Armadra' },
    tabs: [
      { id: 'download', label: { zh: '下载', en: 'Download' } },
      { id: 'source', label: { zh: '源码', en: 'Source' } },
      { id: 'docker', label: { zh: '服务器', en: 'Server' } },
    ],
    download: { zh: '前往 GitHub Releases 下载 v{v}', en: 'Get v{v} from GitHub Releases' },
    source: 'git clone https://github.com/AMA-Link/Armadra && cd Armadra && pnpm install && ./armadra.sh run desktop',
    docker: 'curl -fsSLO https://raw.githubusercontent.com/AMA-Link/Armadra/main/apps/server/docker/compose.yml\ndocker compose up -d',
    dockerHint: { zh: '启动前先把 compose.yml 里的 ARMADRA_PUBLIC_ORIGIN 改成你的地址。', en: 'Set ARMADRA_PUBLIC_ORIGIN in compose.yml to your address first.' },
  },
  /** 首页录屏：读屏与无法播放时的说明 */
  demo: {
    zh: 'Armadra 录屏：Claude Code 作为主节点先说明分工，再一次派出三个 Codex 子节点并行完成，收齐回报后跑全部测试并总结。',
    en: 'Armadra recording: Claude Code leads, explains the split, then dispatches three Codex child nodes that work in parallel; once their reports arrive it runs every test and sums up.',
  },
  example: {
    title: { zh: '从一个任务，到多个 Agent 协作', en: 'Turn a task into a shared effort' },
    text: {
      zh: '打开项目，添加负责实现和审查的 Agent，再连接它们。实现方完成修改后，审查方可以按需读取相关上下文并反馈意见。你可以在画布上查看进展，处理需要你确认的操作。',
      en: 'Open a project, add agents for implementation and review, and connect them. Once changes are ready, the reviewing agent can read the relevant context and provide feedback. Follow progress on the canvas and respond when your input or approval is needed.',
    },
  },
  features: {
    title: { zh: '核心能力', en: 'Core capabilities' },
    items: [
      {
        term: { zh: '熟悉的工具', en: 'Familiar tools' },
        line: { zh: '继续使用你熟悉的 AI 编程工具。每个 Agent 节点直接运行对应 CLI，沿用其账户、模型和权限设置。', en: "Keep using the coding tools you know. Each agent node runs its CLI with that tool's accounts, models, and permission settings." },
      },
      {
        term: { zh: '上下文共享', en: 'Context sharing' },
        line: { zh: '让协作所需的信息跟上任务。通过画布连线，让 Agent 按需读取相连节点的对话摘要、相关资料和代码差异。', en: 'Keep relevant context with the task. Connect nodes so agents can read linked conversation summaries, reference material, and code diffs as needed.' },
      },
      {
        term: { zh: '消息与交接', en: 'Messages and handoffs' },
        line: { zh: '交换进展，让另一个 Agent 接着做。通过消息传递结果与问题；交接前可预览将传递的内容，确认后再发送。', en: 'Share progress and hand off the next step. Exchange results and questions through messages. Preview a handoff before confirming what gets sent.' },
      },
      {
        term: { zh: '任务协调', en: 'Task coordination' },
        line: { zh: '用 ama 组织多个 Agent。将目标拆分为子任务，分配给不同 Agent，并汇总进度与结果。需要权限批准时，仍由你决定。', en: 'Coordinate agents with ama. Break a goal into subtasks, assign them to agents, and gather progress and results. Permission requests still require your approval.' },
      },
      {
        term: { zh: '开发工具', en: 'Development tools' },
        line: { zh: '把代码、资料与结果放在一起。在同一工作空间使用编辑器、Git、GitHub、文件与浏览器节点，查看修改和运行结果。', en: 'Bring code, references, and results together. Use the editor, Git, GitHub, files, and browser nodes within the same workspace to inspect changes and results.' },
      },
    ],
    docs: { zh: '阅读文档', en: 'Read the docs' },
  },
  tools: {
    title: { zh: '连接你已经在用的工具', en: 'Connect the tools you already use' },
    text: {
      zh: '支持 Claude Code、Codex、OpenCode、Pi、Oh My Pi 和 GitHub Copilot，并提供内置协调者 ama。也可以添加自定义 CLI。',
      en: 'Work with Claude Code, Codex, OpenCode, Pi, Oh My Pi, and GitHub Copilot, alongside the built-in ama coordinator. You can also add custom CLIs.',
    },
    note: {
      zh: '使用外部 CLI 前，请在运行 Armadra 的电脑或服务器上完成安装和登录。',
      en: 'Install and sign in to external CLI tools on the computer or server running Armadra before using them.',
    },
  },
  deploy: {
    title: { zh: '本地使用，也能自托管部署', en: 'Run locally or host it yourself' },
    items: [
      {
        zh: '桌面模式下，工作空间记录保存在本机，无需单独部署服务器。需要远程访问或多人协作时，可以部署到自己的服务器，通过电脑或手机浏览器访问并共享工作空间。',
        en: 'In desktop mode, workspace records stay on your machine, with no separate server deployment required. For remote access or team collaboration, deploy Armadra on your own server and access shared workspaces from a desktop or mobile browser.',
      },
      {
        zh: 'Agent 在承载工作空间的电脑或服务器上运行。模型请求和相关数据处理遵循所使用 CLI 与模型服务的设置及政策。',
        en: 'Agents run on the computer or server hosting the workspace. Model requests and related data handling follow the settings and policies of the CLI tools and model services you use.',
      },
    ],
    more: { zh: '了解更多', en: 'Learn more' },
  },
  faq: {
    title: { zh: '常见问题', en: 'FAQ' },
    items: [
      {
        q: { zh: '是否包含模型服务？', en: 'Are model services included?' },
        a: { zh: 'Armadra 连接你配置的 AI 工具。外部 CLI 使用各自的账户和计费方式；ama 的模型密钥需单独配置。', en: 'Armadra works with the AI tools you configure. External CLIs use their own accounts and billing; model credentials for ama are configured separately.' },
      },
      {
        q: { zh: '会修改全局 CLI 配置吗？', en: 'Will it change my global CLI configuration?' },
        a: { zh: '不会。画布协作所需的 Hook 和技能仅在从 Armadra 启动 CLI 时注入，不影响你在画布外启动的 CLI。', en: 'No. Hooks and skills for canvas collaboration are injected only when a CLI is launched from Armadra. CLI sessions started elsewhere are unaffected.' },
      },
      {
        q: { zh: '可以多人协作吗？', en: 'Can teams use it together?' },
        a: { zh: '可以。服务器部署支持成员账号、按工作空间共享和多人实时编辑。', en: 'Yes. Server deployments support member accounts, workspace sharing, and real-time collaborative editing.' },
      },
      {
        q: { zh: '是否收费？', en: 'Is Armadra free?' },
        a: { zh: 'Armadra 采用 MIT 许可，免费开源。所使用模型或 CLI 服务的费用另行计算。', en: 'Armadra is free and open source under the MIT license. Charges for model or CLI services are separate.' },
      },
    ],
  },
  start: {
    title: { zh: '开始使用', en: 'Get started' },
    text: { zh: '当前版本 v{v}，提供 macOS、Windows 与 Linux 安装包。', en: 'Version v{v} is available for macOS, Windows, and Linux.' },
  },
} as const;
