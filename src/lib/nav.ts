import type { Bi, PageId } from './types';
import { S } from '../i18n';

export interface NavItem {
  id: 'home' | 'docs' | 'changelog';
  href: string;
  /** 单键快捷键，大写显示；scripts/shortcuts.ts 共用 */
  key: string;
  label: Bi;
}

/** 全站导航的唯一来源：顶栏、文档侧栏、快捷键都从这里取，顺序即显示顺序 */
export const NAV: readonly NavItem[] = [
  { id: 'home', href: '/', key: 'H', label: S.nav.home },
  { id: 'docs', href: '/docs/', key: 'C', label: S.nav.docs },
  { id: 'changelog', href: '/changelog/', key: 'L', label: S.nav.changelog },
];

export const REPO_URL = 'https://github.com/AMA-Link/Armadra';
export const RELEASES_URL = `${REPO_URL}/releases/latest`;
export const SITE_REPO_URL = 'https://github.com/AMA-Link/armadra-site';

/** 文档文章页归属文档 */
export function navCurrent(page: PageId): PageId {
  return page === 'doc' ? 'docs' : page;
}
