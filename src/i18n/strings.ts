/** 界面文案：叶子为 { zh, en }，两种语言同步维护。 */
export const S = {
  nav: {
    home: { zh: '首页', en: 'Home' },
    docs: { zh: '文档', en: 'Docs' },
    cloud: { zh: '云服务', en: 'Cloud' },
    changelog: { zh: '更新日志', en: 'Changelog' },
    download: { zh: '下载', en: 'Download' },
    github: { zh: 'GitHub', en: 'GitHub' },
    aria: { zh: '主导航', en: 'Main navigation' },
    dockAria: { zh: '快速导航', en: 'Quick navigation' },
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
    built: { zh: 'v{version} · 构建于 {date}', en: 'v{version} · Built {date}' },
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

  /** 云服务页：事实出自 Armadra 的 docs/design/cloud-console.md 与 docs/guides/；不写价格与上线日期 */
  cloud: {
    docTitle: { zh: '云服务 · Armadra', en: 'Cloud · Armadra' },
    description: {
      zh: 'Armadra 云：不开入站端口，在浏览器里打开自己的主机，与团队按权限共享。',
      en: 'Armadra Cloud: open your hosts in the browser without inbound ports, and share them with your team by permission.',
    },
    meta: { zh: '邀请制内测', en: 'Invite-only beta' },
    title: { zh: 'Armadra 云', en: 'Armadra Cloud' },
    intro: {
      zh: '主机经中继出站连接，不开入站端口。在浏览器里打开自己的电脑或服务器，按权限分给团队。',
      en: 'Hosts connect out through a relay, with no inbound ports. Open your computer or server in the browser and share it with your team by permission.',
    },
    apply: { zh: '申请内测', en: 'Apply for the beta' },
    docs: { zh: '团队与控制台', en: 'Teams and console' },
    /** 申请邮件：收件地址与 S.contact 第一项相同 */
    mail: {
      to: 'contact@armadra.com',
      subject: { zh: '申请 Armadra 云内测', en: 'Armadra Cloud beta request' },
    },
    features: {
      title: { zh: '能做什么', en: 'What it does' },
      items: [
        {
          term: { zh: '个人空间与团队', en: 'Personal space and teams' },
          line: {
            zh: '每个账号有一个个人空间，也可以创建或加入团队。主机、授予、链接与审计都归属一个空间。',
            en: 'Every account has a personal space and can create or join teams. Hosts, grants, links and the audit log each belong to one space.',
          },
        },
        {
          term: { zh: '主机授予', en: 'Host grants' },
          line: {
            zh: '把主机授予团队全员或某位成员，权限分只读、可编辑、可执行、可接管，可以设到期。',
            en: 'Grant a host to the whole team or one member as View only, Can edit, Can run or Full control, with an optional expiry.',
          },
        },
        {
          term: { zh: '分享链接', en: 'Share links' },
          line: {
            zh: '为主机生成链接，限定权限、有效期与次数。对方在浏览器里打开即进入画布，撤销后立即停用。',
            en: 'Create a link to a host with a role, an expiry and a use limit. Whoever opens it lands on the canvas in the browser; revoking it cuts access at once.',
          },
        },
        {
          term: { zh: '控制台', en: 'Console' },
          line: {
            zh: '在浏览器里管理成员与邀请、主机、授予、链接与设备信任，查看审计。',
            en: 'Manage members and invitations, hosts, grants, links and device trust in the browser, and review the audit log.',
          },
        },
      ],
    },
    security: {
      title: { zh: '连接与信任', en: 'Connections and trust' },
      items: [
        {
          term: { zh: '端到端加密', en: 'End-to-end encryption' },
          line: {
            zh: '经中继的连接端到端加密。中继只按令牌放行与计量，看不到内容。',
            en: 'Connections through the relay are end-to-end encrypted. The relay only admits and meters by token and cannot see content.',
          },
        },
        {
          term: { zh: '设备信任', en: 'Device trust' },
          line: {
            zh: '新设备第一次进入主机，要由已受信的设备核对校验码后放行。',
            en: 'A new device reaching a host for the first time waits until a trusted device approves it by checking a code.',
          },
        },
        {
          term: { zh: '画布留在本地', en: 'Your canvas stays put' },
          line: {
            zh: '终端、Git 与 Agent 仍在你的电脑或服务器上执行，云端只管谁能以什么权限到达哪台主机。',
            en: 'Terminals, Git and agents still run on your computer or server. The cloud only decides who reaches which host, with what role.',
          },
        },
      ],
    },
    beta: {
      title: { zh: '申请内测', en: 'Join the beta' },
      text: {
        zh: '内测采用邀请制。来信写明团队人数与用途。',
        en: 'The beta is invite-only. Write to us with your team size and use case.',
      },
    },
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
  },
} as const;
