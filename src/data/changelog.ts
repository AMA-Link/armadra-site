/**
 * 更新日志：取自 Owlbay/Armadra 的 CHANGELOG.md，只留用户能感知的改动，不写契约号、迁移号与 PR 号。
 * 新版本加在最前面。
 */
import type { Bi } from '../lib/types';

export interface Release {
  version: string;
  date: string;
  title: Bi;
  items: Bi[];
}

export const CHANGELOG: readonly Release[] = [
  {
    version: '0.4.0',
    date: '2026-10-10',
    title: { zh: '中转迁到 Cloudflare', en: 'The relay moves to Cloudflare' },
    items: [
      { zh: '登录远程服务时支持人机验证', en: 'Signing in to a remote service supports a human check' },
      { zh: '服务可以改名，主机可以设置默认名称', en: 'Services can be renamed and hosts can set a default name' },
      { zh: '手机与平板同步支持', en: 'Phones and tablets get the same' },
    ],
  },
  {
    version: '0.3.0',
    date: '2026-10-10',
    title: { zh: '桌面、服务器与手机统一版本', en: 'One version for desktop, server and mobile' },
    items: [
      { zh: '分享整台主机、一个工作区或一个会话，可以设为只读', en: 'Share a whole host, a workspace or a session, optionally read-only' },
      { zh: '账号、设备与会话按签发来源分组', en: 'Accounts, devices and sessions grouped by where they were issued' },
      { zh: 'Claude Code 输入框上方显示上下文与待收消息，新增 /armadra-* 斜杠命令', en: 'Claude Code shows context and pending messages above the prompt, with new /armadra-* slash commands' },
    ],
  },
  {
    version: '0.2.6',
    date: '2026-10-10',
    title: { zh: '多端切换与附件', en: 'Switching services and attachments' },
    items: [
      { zh: '手机和 iPad 启动先选服务，桌面可在新窗口打开另一个服务', en: 'Phones and iPads pick a service at launch; the desktop can open another service in a new window' },
      { zh: '同一台主机可以经多个中转到达，凭据互不覆盖', en: 'One host can be reached through several relays without credentials overwriting each other' },
      { zh: '画布里的 Agent 可以粘贴、拖入图片与文件', en: 'Paste or drop images and files into agents on the canvas' },
    ],
  },
  {
    version: '0.2.5',
    date: '2026-10-10',
    title: { zh: '更快、更省内存', en: 'Faster, with less memory' },
    items: [
      { zh: '资源采样不再卡住界面', en: 'Resource sampling no longer stalls the interface' },
      { zh: '移出视野的终端分阶段释放，会话保留', en: 'Off-screen terminals are released in stages while sessions stay alive' },
      { zh: '终端支持程序状态与进度显示', en: 'Terminals show program status and progress' },
      { zh: 'Codex 启动不再出现警告', en: 'Codex starts without warnings' },
    ],
  },
  {
    version: '0.2.4',
    date: '2026-10-09',
    title: { zh: '设置重组与 Agent 连线', en: 'Reorganized settings and agent links' },
    items: [
      { zh: '设置重组为 8 组，新增终端外观', en: 'Settings regrouped into eight sections, with terminal appearance' },
      { zh: '上下文线与派发线分色，节点四边都能连线', en: 'Context and dispatch links have their own colors; every side of a node can link' },
      { zh: '整理画布支持纵向与横向', en: 'Tidy the canvas vertically or horizontally' },
      { zh: '会话视图节点一出现就能输入', en: 'Conversation-view nodes accept input as soon as they appear' },
    ],
  },
  {
    version: '0.2.3',
    date: '2026-10-08',
    title: { zh: '只动自己的注入', en: 'Only touches its own injections' },
    items: [
      { zh: '只识别 Armadra 自己写入的 Hook 与技能，其他工具的配置不再展示、修改或删除', en: 'Only recognizes hooks and skills written by Armadra; other tools’ configuration is never shown, changed or removed' },
    ],
  },
  {
    version: '0.2.2',
    date: '2026-10-08',
    title: { zh: '界面与多端修整', en: 'Interface and multi-device polish' },
    items: [
      { zh: '在设置里一键安装或重装各家 CLI 与适配器', en: 'Install or reinstall each CLI and adapter from Settings' },
      { zh: '会话视图可以复制、编辑后重发、重新生成、查看差异', en: 'Conversation view: copy, edit and resend, regenerate, view diffs' },
      { zh: '整理画布时分组整块移动，一次撤销', en: 'Tidying moves groups as a whole, undone in one step' },
    ],
  },
  {
    version: '0.2.1',
    date: '2026-10-07',
    title: { zh: '个人中转补齐', en: 'Personal relay, completed' },
    items: [
      { zh: 'iPad 经中转发消息更稳定', en: 'Messages from iPad over a relay are more reliable' },
      { zh: '视频与音频边下边播，经中转同样可用', en: 'Video and audio stream while downloading, also over a relay' },
      { zh: '点开推送直接切到对应主机', en: 'Opening a notification switches to its host' },
    ],
  },
  {
    version: '0.2.0',
    date: '2026-10-07',
    title: { zh: '一份 core，两种壳', en: 'One core, two shells' },
    items: [
      { zh: '桌面壳换成 Electron，新增无窗口服务器壳，安装包可直接 Armadra serve', en: 'Electron desktop shell plus a headless server shell; installers can run Armadra serve' },
      { zh: '会话视图、协调者 ama 与工作流', en: 'Conversation view, the ama coordinator and workflows' },
      { zh: '多人实时编辑、评论与提及', en: 'Real-time multi-user editing, comments and mentions' },
      { zh: 'passkey、TOTP、GitHub / OIDC 登录', en: 'Passkeys, TOTP, GitHub and OIDC sign-in' },
      { zh: '个人中转、远程服务与分享链接', en: 'Personal relay, remote services and share links' },
    ],
  },
];
