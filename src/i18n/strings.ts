/** 界面文案：叶子为 { zh, en }，两种语言同步维护。 */
export const S = {
  nav: {
    home: { zh: '首页', en: 'Home' },
    docs: { zh: '文档', en: 'Docs' },
    changelog: { zh: '更新日志', en: 'Changelog' },
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
      zh: 'Armadra 是一个本地优先的 AI 编程协作工作空间，让多个 AI 助手在同一张画布上分工、共享上下文并接续任务。',
      en: 'Armadra is a local-first workspace for collaborative AI coding. Bring multiple coding agents onto one canvas to divide tasks, share context, and hand off work.',
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
      zh: '从安装到多个 AI 编程助手（Agent）协作：先读「入门」，再按需查概念与使用指南。',
      en: 'From installing to collaborating with several AI coding agents: start with Getting started, then look up concepts and guides as you need them.',
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

  changelog: {
    docTitle: { zh: '更新日志 · Armadra', en: 'Changelog · Armadra' },
    title: { zh: '更新日志', en: 'Changelog' },
    latest: { zh: '最新', en: 'Latest' },
    release: { zh: '发布说明', en: 'Release notes' },
    full: { zh: '完整记录', en: 'Full history' },
  },

  /** 联系邮箱：首页「联系」分区、页脚与安全策略共用 */
  contact: {
    title: { zh: '联系我们', en: 'Contact us' },
    band: { zh: '联系', en: 'Contact' },
    items: [
      { email: 'contact@armadra.com', label: { zh: '咨询合作', en: 'Partnerships' }, line: { zh: '合作、采购与媒体', en: 'Partnerships, purchasing and press' } },
      { email: 'support@armadra.com', label: { zh: '技术支持', en: 'Support' }, line: { zh: '安装、使用与故障', en: 'Installation, usage and problems' } },
      { email: 'security@armadra.com', label: { zh: '安全报告', en: 'Security' }, line: { zh: '漏洞请私下报告', en: 'Report vulnerabilities privately' } },
    ],
  },

  notFound: {
    docTitle: { zh: '页面不存在 · Armadra', en: 'Not found · Armadra' },
    title: { zh: '这个页面不存在', en: 'This page does not exist' },
    intro: { zh: '地址可能写错了，或者页面已经移走。', en: 'The address may be mistyped, or the page has moved.' },
    home: { zh: '回到首页', en: 'Back to home' },
    docs: { zh: '查看文档', en: 'Browse the docs' },
  },
} as const;
