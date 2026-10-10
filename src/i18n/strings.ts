/** 界面文案：叶子为 { zh, en }，两种语言同步维护。 */
export const S = {
  nav: {
    home: { zh: '首页', en: 'Home' },
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
