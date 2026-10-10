/** 全站单键快捷键：导航键见 lib/nav.ts */
import { NAV } from '../lib/nav';

const ROUTES: Record<string, string> = Object.fromEntries(NAV.map((n) => [n.key.toLowerCase(), n.href]));

function isEditable(el: Element | null): boolean {
  if (!(el instanceof HTMLElement)) return false;
  return el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName);
}

export function installShortcuts(): () => void {
  const onKey = (e: KeyboardEvent) => {
    if (e.defaultPrevented || e.isComposing || e.ctrlKey || e.metaKey || e.altKey) return;
    if (isEditable(document.activeElement)) return;
    const href = ROUTES[e.key.toLowerCase()];
    if (!href) return;
    e.preventDefault();
    const here = location.pathname.replace(/\/?$/, '/');
    if (here === href && !location.search) return;
    location.href = href;
  };
  document.addEventListener('keydown', onKey, { passive: false });
  return () => document.removeEventListener('keydown', onKey);
}
