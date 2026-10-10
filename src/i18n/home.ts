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
