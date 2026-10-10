/**
 * 演示回放：按 scenario.ts 的步骤逐个执行动作。文本一律同时生成中英两份（data-l），
 * 切换语言不打断播放。权限请求会停住，等访客点「允许」（紧凑版自动允许）。
 */
import type { Action, Bi, DiffLine, Line, Status, Step } from './types';
import { prefersReducedMotion } from '../motion';

export interface PlayerUi {
  root: HTMLElement;
  world: HTMLElement;
  svg: SVGSVGElement;
  strings: {
    status: Record<Status, Bi>;
    step: Bi;
    ready: Bi;
    finished: Bi;
    waitingYou: Bi;
    denied: Bi;
    noDiff: Bi;
  };
  onFocus(nodes: HTMLElement[]): void;
  onLayout(): void;
  onState(state: { playing: boolean; finished: boolean }): void;
}

const MAX_LINES = 6;
const STEP_GAP = 1500;
const ACTION_GAP = 520;

function bi(text: Bi | string): Bi {
  return typeof text === 'string' ? { zh: text, en: text } : text;
}

/** 把双语文本写进元素：两份 span，由 html[data-lang] 隐藏其一 */
function setBi(el: Element, text: Bi | string): void {
  const t = bi(text);
  el.replaceChildren();
  if (t.zh === t.en) {
    el.textContent = t.zh;
    return;
  }
  for (const lang of ['zh', 'en'] as const) {
    const s = document.createElement('span');
    s.dataset.l = lang;
    s.lang = lang === 'zh' ? 'zh-CN' : 'en';
    s.textContent = t[lang];
    el.append(s);
  }
}

function fill(tpl: Bi, vars: Record<string, string | number>): Bi {
  const r = (s: string) => s.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));
  return { zh: r(tpl.zh), en: r(tpl.en) };
}

export class Player {
  private stepIndex = -1;
  private actionIndex = 0;
  private timer = 0;
  private playing = false;
  private finished = false;
  private waiting: HTMLElement | null = null;
  private pulses = new Set<number>();
  /** 自动允许权限请求（首页紧凑版） */
  autoAllow = false;

  constructor(private steps: readonly Step[], private ui: PlayerUi) {
    ui.root.addEventListener('click', (e) => {
      const t = e.target as Element;
      if (t.closest('[data-ask-allow]')) this.answer(true);
      else if (t.closest('[data-ask-deny]')) this.answer(false);
    });
    this.reset();
  }

  get isPlaying(): boolean {
    return this.playing;
  }

  play(): void {
    if (this.finished) this.reset();
    this.playing = true;
    this.emit();
    if (!this.waiting) this.schedule(this.stepIndex < 0 ? 0 : ACTION_GAP);
  }

  pause(): void {
    this.playing = false;
    clearTimeout(this.timer);
    this.emit();
  }

  toggle(): void {
    if (this.playing) this.pause();
    else this.play();
  }

  restart(): void {
    this.reset();
    this.play();
  }

  /** 回到初始状态：清空终端、差异与状态 */
  reset(): void {
    clearTimeout(this.timer);
    this.pulses.forEach((id) => cancelAnimationFrame(id));
    this.pulses.clear();
    this.ui.svg.querySelectorAll('.dpulse').forEach((p) => p.remove());
    this.stepIndex = -1;
    this.actionIndex = 0;
    this.playing = false;
    this.finished = false;
    this.waiting = null;
    this.ui.world.querySelectorAll<HTMLElement>('[data-node]').forEach((n) => {
      this.setStatus(n, 'idle');
      n.querySelector('[data-ask]')?.setAttribute('hidden', '');
      const term = n.querySelector('[data-term]');
      term?.querySelectorAll('.tl').forEach((l) => l.remove());
      const diff = n.querySelector('[data-diff]');
      if (diff) {
        const p = document.createElement('p');
        p.className = 'dnode__empty';
        setBi(p, this.ui.strings.noDiff);
        diff.replaceChildren(p);
      }
    });
    this.ui.svg.querySelectorAll('[data-active]').forEach((g) => g.removeAttribute('data-active'));
    this.setCaption(fill(this.ui.strings.step, { n: 0, total: this.steps.length }), this.ui.strings.ready);
    this.ui.onLayout();
    this.emit();
  }

  private emit(): void {
    this.ui.onState({ playing: this.playing, finished: this.finished });
  }

  private schedule(ms: number): void {
    clearTimeout(this.timer);
    this.timer = window.setTimeout(() => this.tick(), ms);
  }

  private tick(): void {
    if (!this.playing || this.waiting) return;
    const step = this.steps[this.stepIndex];
    if (!step || this.actionIndex >= step.actions.length) {
      // 进入下一步
      this.stepIndex += 1;
      this.actionIndex = 0;
      const next = this.steps[this.stepIndex];
      if (!next) {
        this.finished = true;
        this.playing = false;
        this.setCaption(fill(this.ui.strings.step, { n: this.steps.length, total: this.steps.length }), this.ui.strings.finished);
        this.emit();
        this.ui.root.dispatchEvent(new CustomEvent('demo:finished'));
        return;
      }
      this.setCaption(fill(this.ui.strings.step, { n: this.stepIndex + 1, total: this.steps.length }), next.caption);
      this.schedule(prefersReducedMotion() ? 300 : 450);
      return;
    }
    const action = step.actions[this.actionIndex++];
    this.run(action);
    if (this.waiting) return;
    const last = this.actionIndex >= step.actions.length;
    this.schedule(last ? STEP_GAP : (step.pace ?? ACTION_GAP));
  }

  private node(id: string): HTMLElement {
    return this.ui.world.querySelector<HTMLElement>(`[data-node="${id}"]`)!;
  }

  private run(a: Action): void {
    switch (a.type) {
      case 'status':
        this.setStatus(this.node(a.node), a.status);
        break;
      case 'line':
        this.addLine(this.node(a.node), a.line);
        break;
      case 'pulse':
        this.pulse(a.edge, a.reverse ?? false);
        break;
      case 'diff':
        this.setDiff(this.node(a.node), a.lines);
        break;
      case 'focus':
        this.ui.onFocus(a.nodes.map((id) => this.node(id)));
        break;
      case 'ask':
        this.ask(this.node(a.node), a.prompt);
        break;
    }
  }

  private setStatus(n: HTMLElement, s: Status): void {
    n.dataset.status = s;
    const label = n.querySelector('[data-status-label]');
    if (label) setBi(label, this.ui.strings.status[s]);
  }

  private addLine(n: HTMLElement, line: Line): void {
    const term = n.querySelector('[data-term]');
    if (!term) return;
    const el = document.createElement('div');
    el.className = `tl tl--${line.tone ?? 'out'}`;
    setBi(el, line.text);
    const cursor = term.querySelector('.dnode__cursor');
    term.insertBefore(el, cursor);
    const lines = term.querySelectorAll('.tl');
    for (let i = 0; i < lines.length - MAX_LINES; i++) lines[i].remove();
  }

  private setDiff(n: HTMLElement, lines: DiffLine[]): void {
    const box = n.querySelector('[data-diff]');
    if (!box) return;
    box.replaceChildren(
      ...lines.map((l, i) => {
        const row = document.createElement('div');
        row.className = `dfl${l.sign === '+' ? ' dfl--add' : l.sign === '-' ? ' dfl--del' : ''}`;
        row.style.animationDelay = `${i * 60}ms`;
        const sign = document.createElement('span');
        sign.className = 'dfl__sign';
        sign.textContent = l.sign;
        const text = document.createElement('span');
        text.textContent = l.text;
        row.append(sign, text);
        return row;
      }),
    );
    this.ui.onLayout();
  }

  private ask(n: HTMLElement, prompt: Bi): void {
    const box = n.querySelector<HTMLElement>('[data-ask]');
    if (!box) return;
    setBi(box.querySelector('[data-ask-prompt]')!, prompt);
    box.hidden = false;
    this.waiting = n;
    this.ui.onLayout();
    const step = this.steps[this.stepIndex];
    this.setCaption(fill(this.ui.strings.step, { n: this.stepIndex + 1, total: this.steps.length }), this.autoAllow ? step.caption : this.ui.strings.waitingYou);
    if (this.autoAllow) {
      this.timer = window.setTimeout(() => {
        box.querySelector<HTMLElement>('[data-ask-allow]')?.setAttribute('data-auto', '');
        this.timer = window.setTimeout(() => this.answer(true), 600);
      }, 1800);
    }
  }

  private answer(allow: boolean): void {
    const n = this.waiting;
    if (!n) return;
    const box = n.querySelector<HTMLElement>('[data-ask]')!;
    if (!allow) {
      this.addLine(n, { text: this.ui.strings.denied, tone: 'warn' });
      return;
    }
    box.hidden = true;
    box.querySelector('[data-ask-allow]')?.removeAttribute('data-auto');
    this.waiting = null;
    this.ui.onLayout();
    const step = this.steps[this.stepIndex];
    this.setCaption(fill(this.ui.strings.step, { n: this.stepIndex + 1, total: this.steps.length }), step.caption);
    if (!this.playing) {
      this.playing = true;
      this.emit();
    }
    this.schedule(ACTION_GAP);
  }

  private pulse(edgeId: string, reverse: boolean): void {
    const g = this.ui.svg.querySelector<SVGGElement>(`[data-edge="${edgeId}"]`);
    const path = g?.querySelector<SVGPathElement>('.dedge__path');
    if (!g || !path) return;
    g.dataset.active = '';
    const off = () => window.setTimeout(() => g.removeAttribute('data-active'), 900);
    if (prefersReducedMotion()) {
      off();
      return;
    }
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('r', '4');
    dot.setAttribute('class', 'dpulse');
    this.ui.svg.append(dot);
    const t0 = performance.now();
    const dur = 900;
    const frame = (now: number) => {
      const t = Math.min(1, (now - t0) / dur);
      const len = path.getTotalLength();
      const p = path.getPointAtLength(len * (reverse ? 1 - t : t));
      dot.setAttribute('cx', String(p.x));
      dot.setAttribute('cy', String(p.y));
      if (t < 1) {
        const id = requestAnimationFrame(frame);
        this.pulses.add(id);
      } else {
        dot.remove();
        off();
      }
    };
    this.pulses.add(requestAnimationFrame(frame));
  }

  private setCaption(step: Bi, caption: Bi): void {
    const s = this.ui.root.querySelector('[data-demo-step]');
    const c = this.ui.root.querySelector('[data-demo-caption]');
    if (s) setBi(s, step);
    if (c) setBi(c, caption);
  }
}
