/**
 * 首页文案：参考 opencode.ai 的写法——一个标题、两行说明、一组 [*] 条目、一组常见问题。
 * 事实出自 AMA-Link/Armadra 的 README 与 docs/guides/，不写没有依据的数字。
 */
export const H = {
  docTitle: { zh: 'Armadra · 多 Agent 协作的 AI Coding 画布', en: 'Armadra · An AI coding canvas for agents that work together' },
  hero: {
    title: { zh: '多 Agent 协作的 AI Coding 画布', en: 'The AI coding canvas for agents that work together' },
    intro: [
      { zh: '把 Claude Code、Codex 等 CLI Agent 放在同一张无限画布上，', en: 'Put Claude Code, Codex and other CLI agents on one infinite canvas,' },
      { zh: '用连线共享上下文，用消息和交接组织分工。', en: 'share context along links, and split the work with messages and handoffs.' },
    ],
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
    zh: 'Armadra 录屏：Claude Code 实现「记住我」并跑测试，在节点头部批准命令，经画布请 Codex 审查，审查结果回到 Claude。',
    en: 'Armadra recording: Claude Code implements “Remember me” and runs the tests, the command is approved in the node header, Codex reviews over the canvas, and the review goes back to Claude.',
  },
  what: {
    title: { zh: '什么是 Armadra？', en: 'What is Armadra?' },
    intro: {
      zh: 'Armadra 是本地优先的画布，让多个 CLI Agent 围绕同一个目标协作。',
      en: 'Armadra is a local-first canvas where several CLI agents work toward one goal.',
    },
    items: [
      { term: { zh: '真实 CLI', en: 'Real CLIs' }, line: { zh: '每个节点运行 CLI 本身，账户、模型与权限都沿用它自己的', en: 'Each node runs the CLI itself, with its own accounts, models and permissions' } },
      { term: { zh: '连线即上下文', en: 'Links are context' }, line: { zh: '能读到什么由画布上的连线决定', en: 'Links on the canvas decide what can be read' } },
      { term: { zh: '消息与交接', en: 'Messages and handoffs' }, line: { zh: '收件箱、投递与预览后再接受的交接', en: 'Inbox, delivery and handoffs you preview first' } },
      { term: { zh: '协调者 ama', en: 'The ama coordinator' }, line: { zh: '拆分任务、组队并行、收回结果', en: 'Splits tasks, runs teams in parallel, gathers results' } },
      { term: { zh: '代码工作面', en: 'Code surface' }, line: { zh: '编辑器、多仓库 Git、GitHub 与浏览器节点', en: 'Editor, multi-repo Git, GitHub and a browser node' } },
      { term: { zh: '服务器与多端', en: 'Server and devices' }, line: { zh: '无窗口服务器壳，浏览器与手机访问同一份页面', en: 'A headless server shell; browsers and phones open the same pages' } },
      { term: { zh: '开源', en: 'Open source' }, line: { zh: 'MIT 许可，代码在 GitHub', en: 'MIT licensed, on GitHub' } },
    ],
    docs: { zh: '阅读文档', en: 'Read the docs' },
  },
  agents: {
    title: { zh: '支持的 Agent', en: 'Supported agents' },
    note: { zh: '另可添加自定义 CLI。', en: 'Custom CLIs can be added too.' },
  },
  local: {
    title: { zh: '本地优先', en: 'Local first' },
    line: {
      zh: '桌面安装没有服务端，记录保存在本机；凭据与终端原文不进画布、日志或接口响应。',
      en: 'The desktop install has no server and keeps records on your machine; credentials and raw terminal output never reach the canvas, logs or API responses.',
    },
    more: { zh: '了解更多', en: 'Learn more' },
  },
  faq: {
    title: { zh: '常见问题', en: 'FAQ' },
    items: [
      {
        q: { zh: 'Armadra 会替我调用模型吗？', en: 'Does Armadra call models for me?' },
        a: { zh: '不会。它启动你本机已经安装并登录的 CLI，模型调用与费用都按各 CLI 提供方的规则。', en: 'No. It launches CLIs already installed and signed in on your machine; model calls and billing follow each provider.' },
      },
      {
        q: { zh: '会改动我的 CLI 配置吗？', en: 'Will it change my CLI configuration?' },
        a: { zh: '不会。Hook 与技能只在从画布启动时注入，画布外启动的 CLI 不受影响。', en: 'No. Hooks and skills are injected only when launched from the canvas; the same CLI started elsewhere is untouched.' },
      },
      {
        q: { zh: '关掉窗口后 Agent 还在跑吗？', en: 'Do agents keep running after I close the window?' },
        a: { zh: '在。关闭窗口不停止后台；用 tmux 后端时会话还能跨应用重启存活。', en: 'Yes. Closing the window keeps the background running; with tmux, sessions survive restarts.' },
      },
      {
        q: { zh: '可以多人一起用吗？', en: 'Can several people use it together?' },
        a: { zh: '可以。服务器壳支持账号、按工作空间共享和多人实时编辑。', en: 'Yes. The server shell supports accounts, per-workspace sharing and real-time multi-user editing.' },
      },
      {
        q: { zh: 'Armadra 收费吗？', en: 'How much does it cost?' },
        a: { zh: 'Armadra 本身以 MIT 许可开源，免费使用；模型费用由你使用的 CLI 提供方收取。', en: 'Armadra is MIT-licensed and free; model costs are billed by the CLI providers you use.' },
      },
    ],
  },
} as const;
