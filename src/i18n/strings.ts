/** 界面文案：叶子为 { zh, en }，两种语言同步维护。 */
export const S = {
  nav: {
    home: { zh: '首页', en: 'Home' },
    demo: { zh: '在线演示', en: 'Demo' },
    docs: { zh: '文档', en: 'Docs' },
    download: { zh: '下载', en: 'Download' },
    github: { zh: 'GitHub', en: 'GitHub' },
    aria: { zh: '主导航', en: 'Main navigation' },
  },
  skip: { zh: '跳到主内容', en: 'Skip to content' },
  copy: {
    idle: { zh: '复制', en: 'Copy' },
    done: { zh: '已复制', en: 'Copied' },
    aria: { zh: '复制代码', en: 'Copy code' },
    failed: { zh: '复制失败，请手动选择', en: 'Copy failed; select manually' },
  },
  lang: {
    label: { zh: 'EN', en: '中' },
    toEn: { zh: '切换到英文', en: 'Switch to English' },
    toZh: { zh: '切换到中文', en: 'Switch to Chinese' },
    row: { zh: '语言', en: 'Language' },
    zh: { zh: '中文', en: 'Chinese' },
    en: { zh: '英文', en: 'English' },
  },
  theme: {
    toLight: { zh: '切换为浅色', en: 'Switch to light theme' },
    toDark: { zh: '切换为深色', en: 'Switch to dark theme' },
    row: { zh: '主题', en: 'Theme' },
    dark: { zh: '深色', en: 'Dark' },
    light: { zh: '浅色', en: 'Light' },
  },

  site: {
    name: { zh: 'Armadra', en: 'Armadra' },
    description: {
      zh: 'Armadra 是本地优先的 AI Coding 画布：Claude Code、Codex 等 CLI Agent 以真实终端节点放在同一张无限画布上，按连线共享上下文、分工协作。',
      en: 'Armadra is a local-first AI coding canvas: Claude Code, Codex and other CLI agents run as real terminal nodes on one infinite canvas, sharing context along links and splitting the work.',
    },
  },

  footer: {
    rights: { zh: '© {year} Armadra · MIT 许可', en: '© {year} Armadra · MIT License' },
    source: { zh: '官网源码', en: 'Website source' },
    issues: { zh: '反馈问题', en: 'Report an issue' },
    releases: { zh: '版本发布', en: 'Releases' },
    built: { zh: '构建于 {date}', en: 'Built {date}' },
  },

  demo: {
    docTitle: { zh: '在线演示 · Armadra', en: 'Live demo · Armadra' },
    title: { zh: '在线演示', en: 'Live demo' },
    intro: {
      zh: '一块模拟的 Armadra 画布：协调者分派任务，两个 Agent 按连线读取上下文、互相审查。演示在浏览器里回放，不连接任何 Agent。',
      en: 'A simulated Armadra canvas: a coordinator hands out work and two agents read context along links and review each other. It replays in your browser and connects to no agent.',
    },
    canvas: { zh: '演示画布', en: 'Demo canvas' },
    canvasHelp: {
      zh: '方向键平移，加号与减号缩放，0 适应视图',
      en: 'Arrow keys pan, plus and minus zoom, 0 fits the view',
    },
    hint: {
      zh: '拖动空白处平移 · 按住 ⌘ / Ctrl 滚动或双指捏合缩放 · 拖动节点标题移动节点',
      en: 'Drag empty space to pan · ⌘ / Ctrl + scroll or pinch to zoom · drag a node title to move it',
    },
    hintCompact: {
      zh: '拖动画布或节点标题；完整演示里可以自己批准权限请求',
      en: 'Drag the canvas or node titles; approve the permission request yourself in the full demo',
    },
    step: { zh: '步骤 {n} / {total}', en: 'Step {n} / {total}' },
    ready: { zh: '按「播放」开始', en: 'Press Play to start' },
    finished: { zh: '演示结束。可以重放，或拖动节点看看连线如何跟随。', en: 'That’s the whole run. Replay it, or drag nodes to see the links follow.' },
    waitingYou: { zh: '等你批准：在 Claude Code 节点头部点「允许」', en: 'Waiting on you: click Allow in the Claude Code node header' },
    play: { zh: '播放', en: 'Play' },
    pause: { zh: '暂停', en: 'Pause' },
    restart: { zh: '重放', en: 'Replay' },
    fit: { zh: '适应视图', en: 'Fit view' },
    zoomIn: { zh: '放大', en: 'Zoom in' },
    zoomOut: { zh: '缩小', en: 'Zoom out' },
    full: { zh: '打开完整演示', en: 'Open the full demo' },
    allow: { zh: '允许', en: 'Allow' },
    deny: { zh: '拒绝', en: 'Deny' },
    denied: { zh: '已拒绝：真实使用时 Agent 会停下等你的新指示', en: 'Denied: in real use the agent stops and waits for your next instruction' },
    noDiff: { zh: '暂无改动', en: 'No changes yet' },
    permission: { zh: '权限请求', en: 'Permission request' },
    status: {
      idle: { zh: '空闲', en: 'Idle' },
      working: { zh: '运行中', en: 'Working' },
      waiting: { zh: '等待批准', en: 'Waiting' },
      done: { zh: '已完成', en: 'Done' },
    },
    about: {
      title: { zh: '演示里发生了什么', en: 'What the demo shows' },
      items: [
        {
          title: { zh: '连线即上下文', en: 'Links are context' },
          body: {
            zh: 'Codex 只读到连线给它的差异；没有连线的节点读不到。真实画布里，读取范围同样由连线决定。',
            en: 'Codex only reads the diff its link exposes; unlinked nodes stay out of reach. On the real canvas, links decide what can be read in the same way.',
          },
        },
        {
          title: { zh: '真实 CLI 在节点里运行', en: 'Real CLIs run inside nodes' },
          body: {
            zh: '每个 Agent 节点是一个真实终端，保留 CLI 自己的账户、模型和权限策略；权限请求直接在节点头部回答。',
            en: 'Each agent node is a real terminal that keeps the CLI’s own accounts, models and permission policy; permission prompts are answered in the node header.',
          },
        },
        {
          title: { zh: '协调者收拢结果', en: 'The coordinator gathers results' },
          body: {
            zh: 'ama 用 canvas team 把子任务落成节点并收齐结果；稳定下来的协作可以存成模板反复运行。',
            en: 'ama uses canvas team to turn subtasks into nodes and collect the results; a collaboration that settles can be saved as a template and rerun.',
          },
        },
      ],
    },
  },

  docs: {
    docTitle: { zh: '文档 · Armadra', en: 'Docs · Armadra' },
    title: { zh: '文档', en: 'Documentation' },
    intro: {
      zh: '从安装到多 Agent 协作：先读「入门」，再按需查概念与使用指南。',
      en: 'From installing to multi-agent collaboration: start with Getting started, then look up concepts and guides as you need them.',
    },
    groups: {
      start: { zh: '入门', en: 'Getting started' },
      concepts: { zh: '概念', en: 'Concepts' },
      guides: { zh: '使用', en: 'Guides' },
      reference: { zh: '参考', en: 'Reference' },
    },
    nav: { zh: '文档目录', en: 'Documentation' },
    toc: { zh: '本页内容', en: 'On this page' },
    prev: { zh: '上一篇', en: 'Previous' },
    next: { zh: '下一篇', en: 'Next' },
    edit: { zh: '在 GitHub 上编辑本页', en: 'Edit this page on GitHub' },
    devDocs: { zh: '开发者文档在 Armadra 仓库的 docs/ 目录', en: 'Developer docs live in the docs/ folder of the Armadra repository' },
    count: { zh: '{n} 篇', en: '{n} pages' },
  },

  notFound: {
    docTitle: { zh: '页面不存在 · Armadra', en: 'Not found · Armadra' },
    title: { zh: '这个页面不存在', en: 'This page does not exist' },
    intro: { zh: '地址可能写错了，或者页面已经移走。', en: 'The address may be mistyped, or the page has moved.' },
    home: { zh: '回到首页', en: 'Back to home' },
    docs: { zh: '查看文档', en: 'Browse the docs' },
  },
} as const;
