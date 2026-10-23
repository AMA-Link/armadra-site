/**
 * 状态切换动效。语言切换在支持 View Transitions 的浏览器里做文字原地交叉淡化，
 * 不支持时直接切换；减少动效偏好下仍保留淡入（见 motion.css）。
 * 主题切换不走过渡：一帧内换色，见 scripts/theme.ts。
 */

type Kind = 'lang';

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
 * motion.css 据此为不同场景选择时长。
 */
export function transition(kind: Kind, update: () => void): void {
  const doc = document as Document & { startViewTransition?: (cb: () => void) => ViewTransitionLike };
  const root = document.documentElement;
  if (!doc.startViewTransition || document.visibilityState !== 'visible') {
    update();
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
