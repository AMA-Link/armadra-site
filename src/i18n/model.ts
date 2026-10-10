/**
 * 软件模型里的界面文字：照 Armadra 软件的真实文案（apps/web/src/i18n）取，中英两份。
 * 终端里的命令与输出是示例，不翻译命令本身。
 */
export const M = {
  aria: { zh: 'Armadra 软件界面模型', en: 'Model of the Armadra app' },
  side: {
    toggle: { zh: '收起侧栏', en: 'Collapse sidebar' },
    search: { zh: '搜索', en: 'Search' },
    bell: { zh: '通知', en: 'Notifications' },
    newCanvas: { zh: '新建画布', en: 'New canvas' },
    projects: { zh: '项目', en: 'Projects' },
    addProject: { zh: '添加项目', en: 'Add project' },
    settings: { zh: '设置', en: 'Settings' },
  },
  projects: [
    { name: 'web-app', canvases: [{ zh: '登录改版', en: 'Login revamp' }, { zh: '支付回调', en: 'Payment hooks' }] },
    { name: 'api-server', canvases: [{ zh: '限流', en: 'Rate limits' }] },
  ],
  /** 右上工具簇：顺序照 apps/web/src/shell/ControlsCluster.tsx（竖排） */
  cluster: {
    explorer: { zh: '资源管理器', en: 'Explorer' },
    scm: { zh: '源码控制', en: 'Source control' },
    github: { zh: 'GitHub', en: 'GitHub' },
    resources: { zh: '资源', en: 'Resources' },
    usage: { zh: '用量', en: 'Usage' },
    prefs: { zh: '画布偏好', en: 'Canvas preferences' },
    close: { zh: '关闭', en: 'Close' },
  },
  prefs: [
    { zh: '显示网格', en: 'Show grid' },
    { zh: '显示小地图', en: 'Show minimap' },
    { zh: '对齐吸附', en: 'Snap to align' },
  ],
  github: {
    prs: [
      { n: '#42', title: { zh: '登录页记住我', en: 'Remember me on login' }, state: { zh: '检查通过', en: 'Checks passed' } },
      { n: '#41', title: { zh: '会话过期提示', en: 'Session expiry notice' }, state: { zh: '待评审', en: 'Review requested' } },
    ],
  },
  resources: {
    rows: [
      { name: 'Claude Code', mem: '412 MB', cpu: 38 },
      { name: 'Codex', mem: '268 MB', cpu: 21 },
      { name: 'ama', mem: '96 MB', cpu: 4 },
    ],
  },
  scm: {
    branch: 'feat/remember-me',
    graph: { zh: '提交图', en: 'Commit graph' },
    commits: ['feat(auth): 记住我 30 天', 'test(auth): session 用例', 'fix(auth): 登出清 cookie'],
    changes: { zh: '更改', en: 'Changes' },
    message: { zh: '提交信息', en: 'Commit message' },
    commit: { zh: '提交', en: 'Commit' },
    committed: { zh: '已提交', en: 'Committed' },
  },
  explorer: {
    files: ['src/', '  auth/', '    login.tsx', '    session.ts', 'tests/', '  session.test.ts', 'package.json'],
  },
  node: {
    more: { zh: '更多', en: 'More' },
    close: { zh: '关闭节点', en: 'Close node' },
    menu: [
      { zh: '模型', en: 'Model' },
      { zh: '权限模式', en: 'Permission mode' },
      { zh: '会话视图', en: 'Conversation view' },
      { zh: '交接到…', en: 'Hand off to…' },
      { zh: '打断这一轮', en: 'Interrupt this turn' },
    ],
    lead: { zh: '主 · 2 从', en: 'Lead · 2' },
    member: { zh: '从 @ama', en: 'Member @ama' },
    coordinator: { zh: '协调者', en: 'Coordinator' },
    implement: { zh: '实现', en: 'Implement' },
    review: { zh: '审查', en: 'Review' },
    note: { zh: '约定', en: 'Agreement' },
    noteBody: { zh: '保持现有 session 接口；改完互相审查。', en: 'Keep the session API as is; review each other when done.' },
    status: {
      working: { zh: '运行中', en: 'Working' },
      waiting: { zh: '需要你', en: 'Needs you' },
      done: { zh: '已完成', en: 'Done' },
    },
  },
  ask: {
    label: { zh: '权限请求', en: 'Permission' },
    prompt: 'pnpm test',
    allow: { zh: '允许', en: 'Allow' },
    deny: { zh: '拒绝', en: 'Deny' },
    passed: { zh: '✓ 42 个通过', en: '✓ 42 passed' },
    denied: { zh: '已拒绝，等待新指示', en: 'Denied, waiting for instructions' },
  },
  edge: {
    context: { zh: '上下文', en: 'context' },
    dispatch: { zh: '派发', en: 'assign' },
    peer: { zh: '对等', en: 'peers' },
  },
  dock: {
    lock: { zh: '锁定画布', en: 'Lock canvas' },
    add: { zh: '新建', en: 'New' },
    undo: { zh: '撤销', en: 'Undo' },
    redo: { zh: '重做', en: 'Redo' },
    tidy: { zh: '整理', en: 'Tidy' },
    zoomOut: { zh: '缩小', en: 'Zoom out' },
    zoomIn: { zh: '放大', en: 'Zoom in' },
    fit: { zh: '适应窗口', en: 'Fit' },
    /** 白板工具：顺序照 apps/web/src/shell/DockTools.tsx */
    tools: [
      { id: 'select', zh: '选择', en: 'Select' },
      { id: 'hand', zh: '手形', en: 'Hand' },
      { id: 'draw', zh: '画笔', en: 'Draw' },
      { id: 'highlight', zh: '高亮', en: 'Highlight' },
      { id: 'shape', zh: '形状', en: 'Shapes' },
      { id: 'line', zh: '直线', en: 'Line' },
      { id: 'arrow', zh: '箭头', en: 'Arrow' },
      { id: 'text', zh: '文字', en: 'Text' },
    ],
    comment: { zh: '评论模式', en: 'Comment mode' },
    saved: { zh: '已保存', en: 'Saved' },
  },
  add: {
    groups: [
      { title: { zh: '终端', en: 'Terminal' }, items: [{ zh: '新建终端', en: 'New terminal' }] },
      {
        title: { zh: 'AI 助手', en: 'AI assistants' },
        items: ['Claude Code', 'Codex', 'OpenCode', 'Pi', 'Oh My Pi', 'GitHub Copilot', 'ama'].map((n) => ({ zh: `新建 ${n}`, en: `New ${n}` })),
      },
      {
        title: { zh: '内容', en: 'Content' },
        items: [
          { zh: '新建便签', en: 'New note' },
          { zh: '新建浏览器', en: 'New browser' },
          { zh: '新建文件管理器', en: 'New file manager' },
          { zh: '新建定时计划', en: 'New schedule' },
        ],
      },
    ],
  },
  comment: { zh: '评论', en: 'Comments' },
  browser: { url: 'localhost:5173/login', remember: { zh: '记住我', en: 'Remember me' }, signIn: { zh: '登录', en: 'Sign in' } },
  hotspot: { zh: '跳到第 {n} 步', en: 'Go to step {n}' },
} as const;
