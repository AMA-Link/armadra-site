/** 支持的 Agent：与 Owlbay/Armadra README「支持的 Agent」表一致 */
export type Channel = 'hook' | 'plugin' | 'ext' | 'host';
export interface AgentRow {
  name: string;
  channel: Channel;
  resume: string;
  /** null 表示只用 CLI 默认 */
  modes: string | null;
}

export const AGENTS: readonly AgentRow[] = [
  { name: 'Claude Code', channel: 'hook', resume: '--resume ID', modes: 'auto-edit / full-auto / plan' },
  { name: 'Codex', channel: 'hook', resume: 'resume ID', modes: 'auto-edit / full-auto / plan' },
  { name: 'OpenCode', channel: 'plugin', resume: '--session ID', modes: null },
  { name: 'Pi', channel: 'ext', resume: '--session PATH_OR_ID', modes: null },
  { name: 'Oh My Pi', channel: 'ext', resume: '--resume ID', modes: 'auto-edit / full-auto' },
  { name: 'GitHub Copilot', channel: 'hook', resume: '--resume ID', modes: 'auto-edit / full-auto / plan' },
  { name: 'ama', channel: 'host', resume: '--resume ID', modes: 'auto-edit / full-auto / plan' },
];
