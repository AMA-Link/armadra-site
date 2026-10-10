/**
 * 首页滚动叙事：模型在 sticky 容器里不动，页面往下滚时依次进入每一步——
 * 左侧步骤标题点亮、进度线填充、模型只保留本步的区域（其余压暗）。
 * 窄屏模型放大到可读尺寸，并平移到本步区域的中心。模型上的编号点可直接跳到对应步骤。
 */
import { prefersReducedMotion } from '../motion';

interface Step { areas: string[] }

export function initStory(root: HTMLElement): void {
  const model = root.querySelector<HTMLElement>('[data-model]')!;
  const stage = model.querySelector<HTMLElement>('[data-model-stage]')!;
  const steps: Step[] = JSON.parse(root.dataset.steps ?? '[]');
  const titles = [...root.querySelectorAll<HTMLElement>('[data-story-title]')];
  const spacers = [...root.querySelectorAll<HTMLElement>('[data-story-step]')];
  const captions = [...root.querySelectorAll<HTMLElement>('[data-story-caption]')];
  const hotspots = model.querySelector<HTMLElement>('[data-model-hotspots]')!;
  const narrow = matchMedia('(max-width: 900px)');
  let current = -1;

  const k = () => parseFloat(getComputedStyle(model).getPropertyValue('--model-k')) || 1;

  /** 区域在设计坐标（1200×760）里的外接框 */
  const areaBox = (areas: string[]) => {
    const s = stage.getBoundingClientRect();
    const scale = k();
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (const id of areas) {
      for (const el of stage.querySelectorAll<HTMLElement>(`[data-area="${id}"]`)) {
        const r = el.getBoundingClientRect();
        if (!r.width && !r.height) continue;
        x0 = Math.min(x0, (r.left - s.left) / scale); y0 = Math.min(y0, (r.top - s.top) / scale);
        x1 = Math.max(x1, (r.right - s.left) / scale); y1 = Math.max(y1, (r.bottom - s.top) / scale);
      }
    }
    return Number.isFinite(x0) ? { x0, y0, x1, y1 } : null;
  };

  /** 窄屏：固定一个可读的缩放，把本步区域移到视野中间 */
  const camera = () => {
    if (!narrow.matches) {
      delete model.dataset.camera;
      model.style.removeProperty('--model-x');
      model.style.setProperty('--model-k', String(Math.min(1, model.clientWidth / 1200)));
      return;
    }
    model.dataset.camera = '';
    const scale = Math.max(model.clientWidth / 1200, Math.min(0.62, model.clientWidth / 560));
    model.style.setProperty('--model-k', String(scale));
    const box = current >= 0 ? areaBox(steps[current].areas) : null;
    const cx = box ? (box.x0 + box.x1) / 2 : 600;
    const min = model.clientWidth - 1200 * scale;
    model.style.setProperty('--model-x', `${Math.max(min, Math.min(0, model.clientWidth / 2 - cx * scale))}px`);
  };

  const placeHotspots = () => {
    hotspots.replaceChildren();
    const label = root.dataset.hotspotLabel ?? '{n}';
    const placed: { x: number; y: number }[] = [];
    steps.forEach((step, i) => {
      const box = areaBox(step.areas.slice(0, 1));
      if (!box) return;
      // 与已有编号点挨得太近时（同一节点上的两步）改放到区域右上角
      let at = { x: box.x0 + 4, y: box.y0 + 4 };
      if (placed.some((q) => Math.hypot(q.x - at.x, q.y - at.y) < 24)) at = { x: box.x1 - 4, y: box.y0 + 4 };
      placed.push(at);
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = String(i + 1);
      b.setAttribute('aria-label', label.replace('{n}', String(i + 1)));
      b.style.left = `${at.x}px`;
      b.style.top = `${at.y}px`;
      if (i === current) b.setAttribute('aria-current', 'step');
      b.addEventListener('click', () => go(i));
      hotspots.append(b);
    });
  };

  const go = (i: number) => {
    const el = spacers[i];
    if (!el) return;
    const top = el.getBoundingClientRect().top + scrollY + el.offsetHeight / 2 - innerHeight / 2;
    scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  };

  const activate = (i: number) => {
    if (i === current) return;
    current = i;
    delete model.dataset.free;
    if (i < 0) {
      delete model.dataset.step;
    } else {
      model.dataset.step = String(i);
    }
    const focus = new Set(i >= 0 ? steps[i].areas : []);
    stage.querySelectorAll<HTMLElement>('[data-area]').forEach((el) => {
      el.classList.toggle('is-focus', focus.has(el.dataset.area!));
      el.classList.remove('is-host');
    });
    // 被高亮区域的外层区域（例如权限条所在的节点）不压暗，也不描边
    stage.querySelectorAll<HTMLElement>('.is-focus').forEach((el) => {
      let p = el.parentElement?.closest<HTMLElement>('[data-area]');
      while (p) {
        if (!p.classList.contains('is-focus')) p.classList.add('is-host');
        p = p.parentElement?.closest<HTMLElement>('[data-area]');
      }
    });
    titles.forEach((t, j) => t.toggleAttribute('data-active', j === i));
    captions.forEach((c, j) => (c.hidden = j !== Math.max(0, i)));
    hotspots.querySelectorAll('button').forEach((b, j) => (j === i ? b.setAttribute('aria-current', 'step') : b.removeAttribute('aria-current')));
    camera();
  };

  // 哪一步的占位块越过视口中线，哪一步就是当前步
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) if (e.isIntersecting) activate(spacers.indexOf(e.target as HTMLElement));
    },
    { rootMargin: '-50% 0px -50% 0px' },
  );
  spacers.forEach((s) => io.observe(s));
  // 回到叙事之前或之后时恢复全貌
  const edges = new IntersectionObserver(
    ([e]) => {
      if (!e.isIntersecting) activate(-1);
    },
    { rootMargin: '-50% 0px -50% 0px' },
  );
  const track = root.querySelector<HTMLElement>('[data-story-track]');
  if (track) edges.observe(track);

  titles.forEach((t, i) => t.addEventListener('click', () => go(i)));

  // 分段进度线：已过的步骤满格，当前步按滚过的比例填充
  let ticking = false;
  const progress = () => {
    ticking = false;
    if (!track) return;
    const r = track.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (innerHeight / 2 - r.top) / r.height)) * steps.length;
    titles.forEach((t, j) => t.style.setProperty('--seg', String(Math.min(1, Math.max(0, p - j)))));
  };
  addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(progress);
    }
  }, { passive: true });

  const relayout = () => {
    camera();
    placeHotspots();
    progress();
  };
  new ResizeObserver(relayout).observe(model);
  model.addEventListener('model:layout', placeHotspots);
  narrow.addEventListener('change', relayout);
  document.fonts?.ready.then(relayout);
  relayout();
}
