/**
 * 在线演示的场景：纯数据，渲染与回放见 src/scripts/demo/。
 * 过程对应 Armadra 的真实能力（协调者 canvas team 分派、按连线读取上下文、
 * 节点头部直答权限、peer 消息、差异节点、汇总），但内容是虚构的示例任务，不连接任何 Agent。
 */
import type { Bi } from '../../lib/types';

export type NodeKind = 'note' | 'agent' | 'diff';
export type Status = 'idle' | 'working' | 'waiting' | 'done';
export type Tone = 'cmd' | 'out' | 'ok' | 'warn' | 'dim';

export interface DemoNode {
  id: string;
  kind: NodeKind;
  title: Bi | string;
  /** Agent 节点的 CLI 种类，决定头部色点 */
  cli?: 'ama' | 'claude' | 'codex';
  /** 模型标签（等宽，数据） */
  model?: string;
  x: number;
  y: number;
  w: number;
  /** 便签正文 */
  body?: Bi;
}

export interface DemoEdge {
  id: string;
  from: string;
  to: string;
  /** context：上下文连线；lead：主从（协调者→成员）；peer：对等 */
  role: 'context' | 'lead' | 'peer';
  label: Bi;
}

export interface Line {
  text: Bi | string;
  tone?: Tone;
}

export interface DiffLine {
  sign: '+' | '-' | ' ';
  text: string;
}

export type Action =
  | { type: 'status'; node: string; status: Status }
  | { type: 'line'; node: string; line: Line }
  | { type: 'pulse'; edge: string; reverse?: boolean }
  | { type: 'diff'; node: string; file: string; lines: DiffLine[] }
  | { type: 'ask'; node: string; prompt: Bi }
  | { type: 'focus'; nodes: string[] };

export interface Step {
  caption: Bi;
  /** 本步动作之间的间隔（毫秒） */
  pace?: number;
  actions: Action[];
}

export const NODES: readonly DemoNode[] = [
  {
    id: 'task',
    kind: 'note',
    title: { zh: '任务', en: 'Task' },
    x: 0,
    y: 150,
    w: 240,
    body: {
      zh: '登录页加「记住我」：勾选后 30 天免登录。要有测试，改完互相审查。',
      en: 'Add "Remember me" to the login page: stay signed in for 30 days. Include tests and cross-review.',
    },
  },
  { id: 'ama', kind: 'agent', cli: 'ama', title: { zh: '协调者', en: 'Coordinator' }, model: 'ama', x: 330, y: 130, w: 340 },
  { id: 'claude', kind: 'agent', cli: 'claude', title: { zh: '实现', en: 'Implement' }, model: 'claude-opus', x: 770, y: 0, w: 380 },
  { id: 'codex', kind: 'agent', cli: 'codex', title: { zh: '审查', en: 'Review' }, model: 'gpt-codex', x: 770, y: 300, w: 380 },
  { id: 'diff', kind: 'diff', title: 'src/auth/session.ts', x: 1250, y: 30, w: 440 },
];

export const EDGES: readonly DemoEdge[] = [
  { id: 'task-ama', from: 'task', to: 'ama', role: 'context', label: { zh: '上下文', en: 'context' } },
  { id: 'ama-claude', from: 'ama', to: 'claude', role: 'lead', label: { zh: '分派', en: 'assign' } },
  { id: 'ama-codex', from: 'ama', to: 'codex', role: 'lead', label: { zh: '分派', en: 'assign' } },
  { id: 'claude-codex', from: 'claude', to: 'codex', role: 'peer', label: { zh: '对等', en: 'peer' } },
  { id: 'claude-diff', from: 'claude', to: 'diff', role: 'context', label: { zh: '差异', en: 'diff' } },
];

const DIFF_V1: DiffLine[] = [
  { sign: ' ', text: 'export function createSession(user, opts) {' },
  { sign: '-', text: '  const maxAge = DAY;' },
  { sign: '+', text: '  const maxAge = opts.remember ? 30 * DAY : DAY;' },
  { sign: '+', text: "  setCookie('sid', token, { maxAge });" },
  { sign: ' ', text: '  return token;' },
];
const DIFF_V2: DiffLine[] = [
  { sign: ' ', text: 'export function createSession(user, opts) {' },
  { sign: '-', text: '  const maxAge = DAY;' },
  { sign: '+', text: '  const maxAge = opts.remember ? 30 * DAY : DAY;' },
  { sign: '+', text: "  setCookie('sid', token, { maxAge, sameSite: 'lax' });" },
  { sign: ' ', text: '  return token;' },
];

export const STEPS: readonly Step[] = [
  {
    caption: { zh: '协调者顺着连线读取任务便签', en: 'The coordinator reads the task note along its link' },
    actions: [
      { type: 'focus', nodes: ['task', 'ama'] },
      { type: 'status', node: 'ama', status: 'working' },
      { type: 'pulse', edge: 'task-ama' },
      { type: 'line', node: 'ama', line: { text: 'canvas read task', tone: 'cmd' } },
      { type: 'line', node: 'ama', line: { text: { zh: '任务：登录页「记住我」，需要测试与审查', en: 'Task: "Remember me" on login, with tests and review' }, tone: 'out' } },
    ],
  },
  {
    caption: { zh: '拆成两路：Claude Code 实现，Codex 审查', en: 'Split in two: Claude Code implements, Codex reviews' },
    actions: [
      { type: 'line', node: 'ama', line: { text: 'canvas team --parallel claude:implement codex:review', tone: 'cmd' } },
      { type: 'pulse', edge: 'ama-claude' },
      { type: 'pulse', edge: 'ama-codex' },
      { type: 'status', node: 'claude', status: 'working' },
      { type: 'status', node: 'codex', status: 'working' },
      { type: 'line', node: 'ama', line: { text: { zh: '2 名成员已就位，各带一条 worktree', en: '2 members ready, each on its own worktree' }, tone: 'dim' } },
      { type: 'line', node: 'codex', line: { text: { zh: '等待实现方的差异…', en: 'Waiting for the implementer’s diff…' }, tone: 'dim' } },
    ],
  },
  {
    caption: { zh: 'Claude Code 在自己的终端里读代码、改代码', en: 'Claude Code reads and edits code in its own terminal' },
    pace: 700,
    actions: [
      { type: 'focus', nodes: ['claude', 'diff'] },
      { type: 'line', node: 'claude', line: { text: { zh: '读取 src/auth/login.tsx', en: 'Read src/auth/login.tsx' }, tone: 'out' } },
      { type: 'line', node: 'claude', line: { text: { zh: '编辑 src/auth/session.ts', en: 'Edit src/auth/session.ts' }, tone: 'out' } },
      { type: 'pulse', edge: 'claude-diff' },
      { type: 'diff', node: 'diff', file: 'src/auth/session.ts', lines: DIFF_V1 },
      { type: 'line', node: 'claude', line: { text: { zh: '新增 tests/session.test.ts（3 个用例）', en: 'Add tests/session.test.ts (3 cases)' }, tone: 'out' } },
    ],
  },
  {
    caption: { zh: '要跑测试，Claude Code 在节点头部请求权限——由你决定', en: 'Claude Code asks for permission in the node header — your call' },
    actions: [
      { type: 'status', node: 'claude', status: 'waiting' },
      { type: 'ask', node: 'claude', prompt: { zh: '运行 pnpm test？', en: 'Run pnpm test?' } },
    ],
  },
  {
    caption: { zh: '测试通过，实现方经对等连线请 Codex 审查', en: 'Tests pass; the implementer asks Codex to review over the peer link' },
    actions: [
      { type: 'status', node: 'claude', status: 'working' },
      { type: 'line', node: 'claude', line: { text: 'pnpm test', tone: 'cmd' } },
      { type: 'line', node: 'claude', line: { text: { zh: '✓ 42 个通过', en: '✓ 42 passed' }, tone: 'ok' } },
      { type: 'pulse', edge: 'claude-codex' },
      { type: 'line', node: 'claude', line: { text: { zh: 'send codex：改动已就绪，请审查', en: 'send codex: changes ready for review' }, tone: 'dim' } },
    ],
  },
  {
    caption: { zh: 'Codex 只能读到连线给它的差异，给出一条意见', en: 'Codex reads only the diff its links allow, and leaves one comment' },
    pace: 700,
    actions: [
      { type: 'focus', nodes: ['codex', 'claude'] },
      { type: 'line', node: 'codex', line: { text: { zh: '读取 claude 的差异（经连线）', en: 'Read claude’s diff (via link)' }, tone: 'out' } },
      { type: 'line', node: 'codex', line: { text: { zh: '建议：会话 cookie 加 sameSite: lax', en: 'Suggest: add sameSite: lax to the session cookie' }, tone: 'warn' } },
      { type: 'pulse', edge: 'claude-codex', reverse: true },
      { type: 'status', node: 'codex', status: 'done' },
    ],
  },
  {
    caption: { zh: '实现方采纳意见，差异节点随之更新', en: 'The implementer applies it; the diff node updates' },
    actions: [
      { type: 'line', node: 'claude', line: { text: { zh: '采纳审查意见，更新 session.ts', en: 'Apply review, update session.ts' }, tone: 'out' } },
      { type: 'pulse', edge: 'claude-diff' },
      { type: 'diff', node: 'diff', file: 'src/auth/session.ts', lines: DIFF_V2 },
      { type: 'line', node: 'claude', line: { text: { zh: '✓ 42 个通过', en: '✓ 42 passed' }, tone: 'ok' } },
      { type: 'status', node: 'claude', status: 'done' },
    ],
  },
  {
    caption: { zh: '协调者收齐结果，交回给你', en: 'The coordinator gathers the results and hands back to you' },
    actions: [
      { type: 'focus', nodes: ['task', 'ama', 'claude', 'codex', 'diff'] },
      { type: 'pulse', edge: 'ama-claude', reverse: true },
      { type: 'pulse', edge: 'ama-codex', reverse: true },
      { type: 'line', node: 'ama', line: { text: { zh: '汇总：实现 ✓  测试 42 ✓  审查 1 条已采纳', en: 'Summary: implemented ✓  tests 42 ✓  1 review comment applied' }, tone: 'ok' } },
      { type: 'status', node: 'ama', status: 'done' },
    ],
  },
];
