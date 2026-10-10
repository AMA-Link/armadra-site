/**
 * 状态切换动效。支持 View Transitions 的浏览器在新旧状态之间做过渡，
 * 不支持时直接切换；减少动效偏好下仍保留淡入淡出，只去掉位移（见 motion.css）。
 */

type Kind = 'scheme' | 'lang' | 'region' | 'list';

const reduceQuery = typeof matchMedia === 'function' ? matchMedia('(prefers-reduced-motion: reduce)') : null;

export function prefersReducedMotion(): boolean {
  return reduceQuery?.matches ?? false;
}

interface ViewTransitionLike {
  ready: Promise<void>;
  finished: Promise<void>;
}

/**
 * 在一次视图过渡中执行 update。kind 写到 html[data-vt] 上，
 * motion.css 据此为不同场景选择时长与参与过渡的区域。
 */
export function transition(kind: Kind, update: () => void): void {
  const doc = document as Document & { startViewTransition?: (cb: () => void) => ViewTransitionLike };
  const root = document.documentElement;
  if (!doc.startViewTransition || document.visibilityState !== 'visible') {
    // 无过渡时，主题切换仍要压住元素自身的颜色过渡，避免逐个元素渐变造成闪烁
    if (kind === 'scheme') {
      root.dataset.vt = kind;
      update();
      void root.offsetWidth;
      // 不用 requestAnimationFrame：页面不可见时它不会执行，会让过渡一直被压住
      setTimeout(() => {
        if (root.dataset.vt === kind) delete root.dataset.vt;
      }, 0);
    } else {
      update();
    }
    return;
  }
  root.dataset.vt = kind;
  const vt = doc.startViewTransition(update);
  // 过渡被跳过（如快速连续操作、跳页）时 Promise 会拒绝；状态已由 update 应用，这里只做清理
  vt.ready.catch(() => {});
  vt.finished
    .catch(() => {})
    .then(() => {
      if (root.dataset.vt === kind) delete root.dataset.vt;
    });
}

/** 新出现的列表行按顺序轻微淡入；总延迟有上限，避免长列表拖沓 */
export function revealRows(rows: HTMLElement[]): void {
  rows.slice(0, 12).forEach((row, i) => {
    row.style.setProperty('--reveal-i', String(i));
    row.classList.remove('is-revealing');
    void row.offsetWidth;
    row.classList.add('is-revealing');
    row.addEventListener('animationend', () => row.classList.remove('is-revealing'), { once: true });
  });
}
