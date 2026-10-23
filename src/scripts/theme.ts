import type { Scheme } from '../lib/types';
import { S, t } from '../i18n';

const KEY = 'armadra-site.scheme';
const mq = typeof matchMedia === 'function' ? matchMedia('(prefers-color-scheme: light)') : null;

function stored(): Scheme | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'dark' || v === 'light' ? v : null;
  } catch {
    return null;
  }
}

function systemScheme(): Scheme {
  return mq?.matches ? 'light' : 'dark';
}

export function currentScheme(): Scheme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

function apply(s: Scheme): void {
  const root = document.documentElement;
  if (root.dataset.theme === s) {
    syncThemeUi();
    return;
  }
  // 一帧内换色：先压住全部过渡，强制 reflow 后在下一轮任务里放开
  // 不用 requestAnimationFrame：页面不可见时它不会执行，会让过渡一直被压住
  root.dataset.themeSwitching = '';
  root.dataset.theme = s;
  syncThemeUi();
  document.dispatchEvent(new CustomEvent('armadra:scheme', { detail: { scheme: s } }));
  void root.offsetWidth;
  setTimeout(() => delete root.dataset.themeSwitching, 0);
}

/** 写 localStorage、设置 html[data-theme]、派发 armadra:scheme；'system' 清除存储并恢复跟随系统 */
export function setScheme(s: Scheme | 'toggle' | 'system'): void {
  if (s === 'system') {
    try { localStorage.removeItem(KEY); } catch { /* 隐私模式忽略 */ }
    apply(systemScheme());
    return;
  }
  const next: Scheme = s === 'toggle' ? (currentScheme() === 'dark' ? 'light' : 'dark') : s;
  try { localStorage.setItem(KEY, next); } catch { /* 忽略 */ }
  apply(next);
}

/** 切换按钮的 aria-label 与浏览器 theme-color 随主题和语言同步 */
export function syncThemeUi(): void {
  const label = t(currentScheme() === 'dark' ? S.theme.toLight : S.theme.toDark);
  document.querySelectorAll<HTMLElement>('[data-theme-toggle]').forEach((b) => b.setAttribute('aria-label', label));
  const bg = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (meta && bg) meta.content = bg;
}

let installed = false;
export function initTheme(): void {
  if (installed) return;
  installed = true;
  // 无存储值时跟随系统，并监听其变化；用户切换后停止跟随
  mq?.addEventListener('change', () => {
    if (!stored()) apply(systemScheme());
  });
  document.addEventListener('armadra:lang', syncThemeUi);
  syncThemeUi();
}
