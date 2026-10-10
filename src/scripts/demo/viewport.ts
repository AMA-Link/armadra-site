/**
 * 演示画布的相机：平移、缩放、节点拖动与连线布局。世界坐标 = 节点的 left/top。
 * 指针：空白处拖动平移；节点头部拖动移动节点；双指捏合缩放；⌘/Ctrl + 滚轮缩放。
 * 完整版里普通滚轮平移；首页紧凑版不拦截普通滚轮，避免卡住页面滚动。
 */
import { prefersReducedMotion } from '../motion';

export interface Camera { x: number; y: number; k: number }

const MIN_K = 0.3;
const MAX_K = 1.6;
const clampK = (k: number) => Math.min(MAX_K, Math.max(MIN_K, k));

export class Viewport {
  cam: Camera = { x: 0, y: 0, k: 1 };
  /** 用户动过视图后，回放里的自动聚焦暂停，直到点「适应视图」 */
  userMoved = false;
  private anim = 0;
  private pointers = new Map<number, { x: number; y: number }>();
  private drag: { kind: 'pan' | 'node'; node?: HTMLElement; sx: number; sy: number; ox: number; oy: number } | null = null;
  private pinch: { d: number; k: number; cx: number; cy: number; wx: number; wy: number } | null = null;

  constructor(
    readonly el: HTMLElement,
    readonly world: HTMLElement,
    readonly compact: boolean,
    private onLayout: () => void,
  ) {
    el.addEventListener('pointerdown', this.onDown);
    el.addEventListener('pointermove', this.onMove);
    el.addEventListener('pointerup', this.onUp);
    el.addEventListener('pointercancel', this.onUp);
    el.addEventListener('wheel', this.onWheel, { passive: false });
    el.addEventListener('keydown', this.onKey);
  }

  apply(): void {
    const { x, y, k } = this.cam;
    this.world.style.transform = `translate(${x}px, ${y}px) scale(${k})`;
    // 点阵背景跟随相机，看起来是同一张无限画布
    const size = 20 * k;
    this.el.style.backgroundSize = `${size}px ${size}px`;
    this.el.style.backgroundPosition = `${x}px ${y}px`;
  }

  /** 把一组节点放进视口；animate 时用 260ms 缓出过渡 */
  fit(nodes: HTMLElement[], animate = true): void {
    if (!nodes.length) return;
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (const n of nodes) {
      const x = parseFloat(n.style.left), y = parseFloat(n.style.top);
      x0 = Math.min(x0, x); y0 = Math.min(y0, y);
      x1 = Math.max(x1, x + n.offsetWidth); y1 = Math.max(y1, y + n.offsetHeight);
    }
    const pad = this.el.clientWidth < 640 ? 24 : 48;
    const w = this.el.clientWidth - pad * 2, h = this.el.clientHeight - pad * 2;
    const k = clampK(Math.min(w / (x1 - x0), h / (y1 - y0), 1.1));
    const target = { k, x: (this.el.clientWidth - (x1 - x0) * k) / 2 - x0 * k, y: (this.el.clientHeight - (y1 - y0) * k) / 2 - y0 * k };
    this.animateTo(target, animate);
  }

  animateTo(target: Camera, animate = true): void {
    cancelAnimationFrame(this.anim);
    if (!animate || prefersReducedMotion()) {
      this.cam = target;
      this.apply();
      return;
    }
    const from = { ...this.cam };
    const t0 = performance.now();
    const dur = 420;
    const ease = (t: number) => 1 - Math.pow(1 - t, 4);
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / dur);
      const e = ease(t);
      this.cam = { x: from.x + (target.x - from.x) * e, y: from.y + (target.y - from.y) * e, k: from.k + (target.k - from.k) * e };
      this.apply();
      if (t < 1) this.anim = requestAnimationFrame(tick);
    };
    this.anim = requestAnimationFrame(tick);
  }

  zoomAt(factor: number, cx: number, cy: number): void {
    cancelAnimationFrame(this.anim);
    const k = clampK(this.cam.k * factor);
    const wx = (cx - this.cam.x) / this.cam.k, wy = (cy - this.cam.y) / this.cam.k;
    this.cam = { k, x: cx - wx * k, y: cy - wy * k };
    this.userMoved = true;
    this.apply();
  }

  zoomCenter(factor: number): void {
    this.zoomAt(factor, this.el.clientWidth / 2, this.el.clientHeight / 2);
  }

  panBy(dx: number, dy: number): void {
    cancelAnimationFrame(this.anim);
    this.cam = { ...this.cam, x: this.cam.x + dx, y: this.cam.y + dy };
    this.userMoved = true;
    this.apply();
  }

  private local(e: PointerEvent | WheelEvent) {
    const r = this.el.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  private onDown = (e: PointerEvent) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    const target = e.target as HTMLElement;
    if (target.closest('button, a')) return;
    this.pointers.set(e.pointerId, this.local(e));
    if (this.pointers.size === 2) {
      const [a, b] = [...this.pointers.values()];
      const cx = (a.x + b.x) / 2, cy = (a.y + b.y) / 2;
      this.pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), k: this.cam.k, cx, cy, wx: (cx - this.cam.x) / this.cam.k, wy: (cy - this.cam.y) / this.cam.k };
      this.drag = null;
      return;
    }
    const head = target.closest<HTMLElement>('[data-drag]');
    const node = head?.closest<HTMLElement>('[data-node]');
    if (node) {
      this.drag = { kind: 'node', node, sx: e.clientX, sy: e.clientY, ox: parseFloat(node.style.left), oy: parseFloat(node.style.top) };
      node.dataset.dragging = '';
    } else {
      this.drag = { kind: 'pan', sx: e.clientX, sy: e.clientY, ox: this.cam.x, oy: this.cam.y };
    }
  };

  private onMove = (e: PointerEvent) => {
    if (!this.pointers.has(e.pointerId)) return;
    this.pointers.set(e.pointerId, this.local(e));
    if (this.pinch && this.pointers.size === 2) {
      const [a, b] = [...this.pointers.values()];
      const k = clampK(this.pinch.k * (Math.hypot(a.x - b.x, a.y - b.y) / this.pinch.d));
      const cx = (a.x + b.x) / 2, cy = (a.y + b.y) / 2;
      this.cam = { k, x: cx - this.pinch.wx * k, y: cy - this.pinch.wy * k };
      this.userMoved = true;
      this.apply();
      return;
    }
    const d = this.drag;
    if (!d) return;
    const dx = e.clientX - d.sx, dy = e.clientY - d.sy;
    // 首页紧凑版：竖直为主的单指滑动交给页面滚动
    if (this.compact && e.pointerType === 'touch' && d.kind === 'pan' && Math.abs(dy) > Math.abs(dx) * 1.2 && !this.el.hasPointerCapture(e.pointerId)) return;
    if (!this.el.hasPointerCapture(e.pointerId) && Math.hypot(dx, dy) > 3) {
      this.el.setPointerCapture(e.pointerId);
      if (d.kind === 'pan') this.el.dataset.panning = '';
    }
    if (!this.el.hasPointerCapture(e.pointerId)) return;
    if (d.kind === 'pan') {
      cancelAnimationFrame(this.anim);
      this.cam = { ...this.cam, x: d.ox + dx, y: d.oy + dy };
      this.userMoved = true;
      this.apply();
    } else if (d.node) {
      d.node.style.left = `${d.ox + dx / this.cam.k}px`;
      d.node.style.top = `${d.oy + dy / this.cam.k}px`;
      this.onLayout();
    }
  };

  private onUp = (e: PointerEvent) => {
    this.pointers.delete(e.pointerId);
    if (this.pointers.size < 2) this.pinch = null;
    if (this.drag?.node) delete this.drag.node.dataset.dragging;
    this.drag = null;
    delete this.el.dataset.panning;
    if (this.el.hasPointerCapture(e.pointerId)) this.el.releasePointerCapture(e.pointerId);
  };

  private onWheel = (e: WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const p = this.local(e);
      this.zoomAt(Math.exp(-e.deltaY * 0.01), p.x, p.y);
    } else if (!this.compact) {
      e.preventDefault();
      this.panBy(-e.deltaX, -e.deltaY);
    }
  };

  private onKey = (e: KeyboardEvent) => {
    if (e.target !== this.el) return;
    const step = e.shiftKey ? 120 : 40;
    const map: Record<string, () => void> = {
      ArrowLeft: () => this.panBy(step, 0),
      ArrowRight: () => this.panBy(-step, 0),
      ArrowUp: () => this.panBy(0, step),
      ArrowDown: () => this.panBy(0, -step),
      '+': () => this.zoomCenter(1.2),
      '=': () => this.zoomCenter(1.2),
      '-': () => this.zoomCenter(1 / 1.2),
    };
    const fn = map[e.key];
    if (fn) {
      e.preventDefault();
      fn();
    }
  };
}

/** 连线：按两节点相对位置选择左右或上下的端口，画三次贝塞尔曲线，标签放中点 */
export function layoutEdges(svg: SVGSVGElement, world: HTMLElement): void {
  const box = (id: string) => {
    const n = world.querySelector<HTMLElement>(`[data-node="${id}"]`)!;
    const x = parseFloat(n.style.left), y = parseFloat(n.style.top);
    return { x, y, w: n.offsetWidth, h: n.offsetHeight, cx: x + n.offsetWidth / 2, cy: y + n.offsetHeight / 2 };
  };
  for (const g of svg.querySelectorAll<SVGGElement>('[data-edge]')) {
    const a = box(g.dataset.from!), b = box(g.dataset.to!);
    const dx = b.cx - a.cx, dy = b.cy - a.cy;
    let p0, p1, c0, c1;
    if (Math.abs(dx) - (a.w + b.w) / 4 > Math.abs(dy) - (a.h + b.h) / 4) {
      const s = Math.sign(dx) || 1;
      p0 = { x: s > 0 ? a.x + a.w : a.x, y: a.cy };
      p1 = { x: s > 0 ? b.x : b.x + b.w, y: b.cy };
      const m = Math.max(40, Math.abs(p1.x - p0.x) / 2);
      c0 = { x: p0.x + m * s, y: p0.y };
      c1 = { x: p1.x - m * s, y: p1.y };
    } else {
      const s = Math.sign(dy) || 1;
      p0 = { x: a.cx, y: s > 0 ? a.y + a.h : a.y };
      p1 = { x: b.cx, y: s > 0 ? b.y : b.y + b.h };
      const m = Math.max(30, Math.abs(p1.y - p0.y) / 2);
      c0 = { x: p0.x, y: p0.y + m * s };
      c1 = { x: p1.x, y: p1.y - m * s };
    }
    const path = g.querySelector<SVGPathElement>('.dedge__path')!;
    path.setAttribute('d', `M${p0.x},${p0.y} C${c0.x},${c0.y} ${c1.x},${c1.y} ${p1.x},${p1.y}`);
    const mid = path.getPointAtLength(path.getTotalLength() / 2);
    const label = g.querySelector<SVGGElement>('.dedge__label')!;
    const text = label.querySelector<SVGTextElement>('text')!;
    const bb = text.getBBox();
    const w = Math.max(bb.width, 16) + 12, h = 18;
    text.setAttribute('x', String(mid.x));
    text.setAttribute('y', String(mid.y));
    const rect = label.querySelector('rect')!;
    rect.setAttribute('x', String(mid.x - w / 2));
    rect.setAttribute('y', String(mid.y - h / 2));
    rect.setAttribute('width', String(w));
    rect.setAttribute('height', String(h));
  }
}
