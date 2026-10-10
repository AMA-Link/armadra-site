/**
 * 首页文案：只留标题级的短句，不写解释段落。事实出自 Owlbay/Armadra 的 README 与产品说明。
 */
export const H = {
  docTitle: { zh: 'Armadra · 多 Agent 协作的 AI Coding 画布', en: 'Armadra · An AI coding canvas for agents that work together' },
  hero: {
    title: [
      { zh: '让不同的 Agent，', en: 'Put your agents on one canvas,' },
      { zh: '在同一张画布上协作', en: 'and let them work together' },
    ],
    download: { zh: '下载', en: 'Download' },
    docs: { zh: '快速上手', en: 'Quickstart' },
  },
  /** 滚动叙事：每一步一句话，模型高亮 areas 里列出的区域 */
  story: {
    label: { zh: '软件里有什么', en: 'Inside the app' },
    steps: [
      { title: { zh: '每个 Agent 都是真实终端', en: 'Every agent is a real terminal' }, areas: ['node-claude', 'node-codex'] },
      { title: { zh: '连线决定谁能读到什么', en: 'Links decide who reads what' }, areas: ['edges', 'node-note', 'node-claude', 'node-codex'] },
      { title: { zh: '权限请求，在节点头部回答', en: 'Answer permissions in the header' }, areas: ['ask'] },
      { title: { zh: '协调者分派，结果收回', en: 'A coordinator assigns and gathers' }, areas: ['node-ama', 'edges-dispatch'] },
      { title: { zh: '代码、Git 与浏览器都在画布上', en: 'Code, Git and a browser on the canvas' }, areas: ['node-diff', 'node-browser', 'cluster'] },
      { title: { zh: '白板、评论与多人协作', en: 'Whiteboard, comments, teammates' }, areas: ['dock', 'pin', 'cursor'] },
      { title: { zh: '项目和画布，在侧栏切换', en: 'Projects and canvases in the sidebar' }, areas: ['side'] },
    ],
  },
  /** 分区带的编号与名称（带头一行） */
  bands: {
    story: { zh: '软件', en: 'The app' },
    why: { zh: '出发点', en: 'Why' },
    features: { zh: '能力', en: 'Capabilities' },
    agents: { zh: 'Agent', en: 'Agents' },
    principles: { zh: '原则', en: 'Principles' },
    start: { zh: '开始', en: 'Start' },
  },
  why: {
    title: { zh: '三个出发点', en: 'Three starting points' },
    items: [
      { title: { zh: '工作可以接续', en: 'Work carries over' }, line: { zh: '相连的 Agent 读取摘要、转录与资料，阶段性交接。', en: 'Linked agents read summaries, transcripts and material, and hand off at milestones.' } },
      { title: { zh: '模型可以分工', en: 'Models split the work' }, line: { zh: '经济模型做边界明确的事，强模型做复杂判断。', en: 'Economical models take bounded tasks; stronger ones make the hard calls.' } },
      { title: { zh: '过程可以查看', en: 'The process stays visible' }, line: { zh: 'Agent、资料、差异与成果摊在同一张画布上。', en: 'Agents, material, diffs and results on one canvas.' } },
    ],
  },
  features: {
    title: { zh: '围绕画布的一整套工作面', en: 'A whole work surface around the canvas' },
    groups: [
      { title: { zh: '画布与白板', en: 'Canvas and whiteboard' }, items: [{ zh: '九种节点', en: 'Nine node types' }, { zh: '手绘、形状与 Mermaid', en: 'Freehand, shapes, Mermaid' }, { zh: '评论与 @ 提及', en: 'Comments and @mentions' }] },
      { title: { zh: 'Agent 协作', en: 'Agent collaboration' }, items: [{ zh: '按连线读取上下文', en: 'Context along links' }, { zh: '收件箱与投递', en: 'Inbox and delivery' }, { zh: '预览后再交接', en: 'Handoffs you preview first' }] },
      { title: { zh: '协调者与工作流', en: 'Coordinator and workflows' }, items: [{ zh: '并行、流水线、汇总', en: 'Parallel, pipeline, fan-in' }, { zh: '每人一条 worktree', en: 'A worktree per member' }, { zh: '模板定时重跑', en: 'Templates on a schedule' }] },
      { title: { zh: '终端与主机', en: 'Terminals and hosts' }, items: [{ zh: 'tmux 会话跨重启', en: 'tmux sessions survive restarts' }, { zh: '空闲自动休眠', en: 'Idle agents hibernate' }, { zh: 'SSH 远端执行', en: 'Remote execution over SSH' }] },
      { title: { zh: '代码工作面', en: 'Code surface' }, items: [{ zh: '编辑器与语言服务', en: 'Editor and language services' }, { zh: '多仓库 Git', en: 'Multi-repo Git' }, { zh: 'GitHub PR 评审', en: 'GitHub PR review' }] },
      { title: { zh: '远程与多端', en: 'Remote and devices' }, items: [{ zh: '无窗口服务器壳', en: 'Headless server shell' }, { zh: '账号与共享', en: 'Accounts and sharing' }, { zh: '手机扫码配对', en: 'Pair a phone by QR' }] },
    ],
  },
  principles: {
    title: { zh: '设计原则', en: 'Design principles' },
    items: [
      { title: { zh: '一个 core，两种壳', en: 'One core, two shells' }, line: { zh: '桌面与服务器装配同一份 core 与页面。', en: 'Desktop and server assemble the same core and pages.' } },
      { title: { zh: '真实 CLI', en: 'Real CLIs' }, line: { zh: '账户、模型与权限都沿用 CLI 自己的。', en: 'Accounts, models and permissions stay the CLI’s own.' } },
      { title: { zh: '连线即上下文', en: 'Links are context' }, line: { zh: '能读到什么，由画布上的连线决定。', en: 'Links on the canvas decide what can be read.' } },
      { title: { zh: '本地优先', en: 'Local first' }, line: { zh: '桌面安装没有服务端，数据留在本机。', en: 'No server for the desktop; data stays on your machine.' } },
      { title: { zh: '如实的状态', en: 'Honest status' }, line: { zh: '未知就显示未知，不显示成 0 或成功。', en: 'Unknown shows as unknown, never as zero or success.' } },
      { title: { zh: '最小侵入', en: 'Minimal footprint' }, line: { zh: '只在画布启动时注入，画布外的 CLI 不受影响。', en: 'Injected only when launched from the canvas.' } },
    ],
  },
  agents: {
    title: { zh: '支持的 Agent', en: 'Supported agents' },
    coordinator: { zh: '协调者', en: 'Coordinator' },
  },
  cta: {
    title: [
      { zh: '把第一组 Agent', en: 'Put your first agents' },
      { zh: '放上画布', en: 'on the canvas' },
    ],
    download: { zh: '下载 Armadra', en: 'Download Armadra' },
    quickstart: { zh: '快速上手', en: 'Quickstart' },
    changelog: { zh: '更新日志', en: 'Changelog' },
  },
} as const;
