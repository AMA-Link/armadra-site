/** 把一个 [data-demo] 容器装配成可交互的演示：相机 + 回放 + 控件 */
import { STEPS } from '../../components/demo/scenario';
import { S } from '../../i18n';
import { Viewport, layoutEdges } from './viewport';
import { Player } from './player';

export function mountDemo(root: HTMLElement): void {
  if (root.dataset.mounted) return;
  root.dataset.mounted = '';
  const compact = root.hasAttribute('data-compact');
  const el = root.querySelector<HTMLElement>('[data-demo-viewport]')!;
  const world = root.querySelector<HTMLElement>('[data-demo-world]')!;
  const svg = root.querySelector<SVGSVGElement>('[data-demo-edges]')!;
  const nodes = () => [...world.querySelectorAll<HTMLElement>('[data-node]')];

  let raf = 0;
  const layout = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => layoutEdges(svg, world));
  };
  const vp = new Viewport(el, world, compact, layout);

  const playBtn = root.querySelector<HTMLButtonElement>('[data-demo-play]')!;
  const player = new Player(STEPS, {
    root,
    world,
    svg,
    strings: S.demo,
    onLayout: layout,
    // 首页紧凑版始终看全图；完整版跟随每一步聚焦到相关节点
    onFocus: (ns) => {
      if (!vp.userMoved && !compact) vp.fit(ns);
    },
    onState: ({ playing }) => playBtn.setAttribute('aria-pressed', String(playing)),
  });
  player.autoAllow = compact;

  playBtn.addEventListener('click', () => player.toggle());
  root.querySelector('[data-demo-restart]')?.addEventListener('click', () => {
    vp.userMoved = false;
    vp.fit(nodes());
    player.restart();
  });
  root.querySelector('[data-demo-fit]')?.addEventListener('click', () => {
    vp.userMoved = false;
    vp.fit(nodes());
  });
  root.querySelectorAll<HTMLElement>('[data-demo-zoom]').forEach((b) =>
    b.addEventListener('click', () => vp.zoomCenter(b.dataset.demoZoom === 'in' ? 1.2 : 1 / 1.2)),
  );
  el.addEventListener('keydown', (e) => {
    if (e.target !== el) return;
    if (e.key === '0') {
      e.preventDefault();
      vp.userMoved = false;
      vp.fit(nodes());
    } else if (e.key === ' ') {
      e.preventDefault();
      player.toggle();
    }
  });

  // 字体加载与语言切换会改变节点和标签尺寸
  document.fonts?.ready.then(layout);
  document.addEventListener('armadra:lang', layout);
  new ResizeObserver(() => {
    if (!vp.userMoved) vp.fit(nodes(), false);
  }).observe(el);

  layoutEdges(svg, world);
  vp.fit(nodes(), false);

  if (compact) {
    // 首页：进入视口才播放，离开暂停；播完停几秒再从头循环
    let visible = false;
    let loop = 0;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !player.isPlaying) player.play();
      else if (!visible && player.isPlaying) player.pause();
    }, { threshold: 0.35 });
    io.observe(el);
    root.addEventListener('demo:finished', () => {
      clearTimeout(loop);
      loop = window.setTimeout(() => {
        if (visible) {
          vp.userMoved = false;
          vp.fit(nodes());
          player.restart();
        }
      }, 4000);
    });
  }
}
