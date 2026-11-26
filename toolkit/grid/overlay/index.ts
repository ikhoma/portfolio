// Dev-only grid overlay. Injected by the `grid-overlay` integration in
// astro.config.mjs during `astro dev` only — it never ships to production.
//
// Floating button (bottom-right) opens the menu: show/hide, preset, layers,
// opacity and live column overrides (count / gutter / margin).
//
// Shortcuts
//   Ctrl+G          show / hide the grid
//   Ctrl+Shift+G    next preset
//   1 2 3 4         columns / rows / 8px / canon (while the grid is shown)
//   Esc             close the menu
// URL
//   ?grid=symvol    open with a preset on;  ?grid=off  hide

import { presets, type ColumnsSpec, type LayerId, type Preset } from './presets';
import { layerColors, renderSvg } from './render';

const STORAGE_KEY = 'grid-overlay:v2';
const LAYERS: { id: LayerId; label: string; key: string }[] = [
  { id: 'columns', label: 'Columns', key: '1' },
  { id: 'rows', label: 'Rows', key: '2' },
  { id: 'square', label: '8px', key: '3' },
  { id: 'canon', label: 'Canon', key: '4' },
];
type Override = Partial<Pick<ColumnsSpec, 'count' | 'gutter' | 'margin'>>;
const OVERRIDE_FIELDS: { id: keyof Override; label: string }[] = [
  { id: 'count', label: 'Cols' },
  { id: 'gutter', label: 'Gutter' },
  { id: 'margin', label: 'Margin' },
];

interface State {
  on: boolean;
  menu: boolean;
  preset: string;
  layers: Record<LayerId, boolean>;
  opacity: number;
  /** Live column overrides per preset; not written back to CSS. */
  overrides: Record<string, Override>;
  /** Canon power-line generations to show (1 = Ivan's Figma canon). */
  canonDepth: number;
}

const layersFor = (presetId: string) => {
  const p = presets.find((x) => x.id === presetId) ?? presets[0];
  return Object.fromEntries(LAYERS.map((l) => [l.id, p.defaults.includes(l.id)])) as Record<LayerId, boolean>;
};

function load(): State {
  const fallback: State = {
    on: false, menu: false, preset: presets[0].id, layers: layersFor(presets[0].id), opacity: 1, overrides: {}, canonDepth: 1,
  };
  let state = fallback;
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null');
    if (saved && presets.some((p) => p.id === saved.preset)) state = { ...fallback, ...saved, menu: false };
  } catch { /* storage unavailable — use defaults */ }
  const param = new URLSearchParams(location.search).get('grid');
  if (param === 'off') state.on = false;
  else if (param) {
    state.on = true;
    if (presets.some((p) => p.id === param) && param !== state.preset) {
      state.preset = param;
      state.layers = layersFor(param);
    }
  }
  return state;
}

const ICON = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
  <rect x="2" y="2" width="14" height="14" rx="2"/><path d="M6.7 2v14M11.3 2v14M2 9h14"/></svg>`;

const STYLE = `
  :host { all: initial; }
  .grid { position: fixed; inset: 0; pointer-events: none; z-index: 2147483645; }
  .grid svg { display: block; }
  .ui { position: fixed; right: 16px; bottom: 16px; z-index: 2147483647;
    font: 12px/1.3 ui-sans-serif, system-ui, -apple-system, sans-serif; color: #f5f5f5; }
  .fab { all: unset; box-sizing: border-box; display: grid; place-items: center; width: 40px; height: 40px;
    border-radius: 50%; cursor: pointer; color: #f5f5f5; background: rgba(16,16,16,.88);
    border: 1px solid rgba(255,255,255,.16); box-shadow: 0 6px 18px rgba(0,0,0,.3);
    backdrop-filter: blur(8px); transition: transform .15s ease, background .15s ease; }
  .fab:hover { transform: scale(1.06); }
  .fab:focus-visible { outline: 2px solid #d2ff50; outline-offset: 3px; }
  .fab.on { color: #101010; background: #d2ff50; border-color: #d2ff50; }
  .menu { position: absolute; right: 0; bottom: 52px; width: 220px; padding: 12px;
    background: rgba(16,16,16,.94); border: 1px solid rgba(255,255,255,.12); border-radius: 12px;
    box-shadow: 0 12px 32px rgba(0,0,0,.4); backdrop-filter: blur(10px); }
  .row { display: flex; align-items: center; gap: 8px; }
  .row + .row, .sec { margin-top: 8px; }
  .title { flex: 1; font-weight: 600; font-size: 13px; }
  .switch { all: unset; cursor: pointer; width: 32px; height: 18px; border-radius: 9px; background: #3a3a3a; position: relative; }
  .switch::after { content: ''; position: absolute; top: 2px; left: 2px; width: 14px; height: 14px; border-radius: 50%; background: #ddd; transition: left .15s; }
  .switch.on { background: #d2ff50; }
  .switch.on::after { left: 16px; background: #101010; }
  .switch:focus-visible { outline: 2px solid #d2ff50; outline-offset: 2px; }
  select, .num { background: #222; color: #f5f5f5; border: 1px solid #333; border-radius: 6px; padding: 4px 6px; font: inherit; }
  select { width: 100%; }
  label { display: flex; align-items: center; gap: 8px; cursor: pointer; }
  label.off { opacity: .35; cursor: default; }
  .sw { width: 10px; height: 10px; border-radius: 2px; }
  kbd { margin-left: auto; color: #777; font: inherit; }
  .fields { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
  .fields span { display: block; color: #888; margin-bottom: 3px; }
  .num { width: 100%; box-sizing: border-box; }
  .num::placeholder { color: #777; }
  .muted { color: #777; }
  .link { all: unset; cursor: pointer; color: #d2ff50; }
  input[type=range] { width: 100%; accent-color: #d2ff50; margin: 0; }
  .seg { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; background: #222; border-radius: 6px; padding: 3px; }
  .seg button { all: unset; text-align: center; padding: 4px 0; border-radius: 4px; cursor: pointer; color: #bbb; }
  .seg button:hover { color: #fff; }
  .seg button.on { background: #d2ff50; color: #101010; }
  hr { border: 0; border-top: 1px solid rgba(255,255,255,.1); margin: 10px 0; }
`;

class GridOverlay extends HTMLElement {
  private state = load();
  private root = this.attachShadow({ mode: 'open' });
  private grid = document.createElement('div');
  private ui = document.createElement('div');
  private frame = 0;

  connectedCallback() {
    const style = document.createElement('style');
    style.textContent = STYLE;
    this.grid.className = 'grid';
    this.ui.className = 'ui';
    this.root.append(style, this.grid, this.ui);
    window.addEventListener('resize', this.schedule);
    window.addEventListener('keydown', this.onKey);
    document.addEventListener('pointerdown', this.onOutside);
    new ResizeObserver(this.schedule).observe(document.documentElement);
    this.ui.addEventListener('click', this.onClick);
    this.ui.addEventListener('change', this.onChange);
    this.ui.addEventListener('input', this.onInput);
    this.update();
  }

  private save() {
    const persist: Partial<State> = { ...this.state };
    delete persist.menu;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(persist)); } catch { /* ignore */ }
  }

  private set(patch: Partial<State>) {
    this.state = { ...this.state, ...patch };
    this.save();
    this.update();
  }

  private schedule = () => {
    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => this.draw());
  };

  private get basePreset() {
    return presets.find((p) => p.id === this.state.preset) ?? presets[0];
  }

  /** The active preset with the live column overrides applied. */
  private get preset(): Preset {
    const base = this.basePreset;
    let p: Preset = base.canon ? { ...base, canon: { ...base.canon, depth: this.state.canonDepth } } : base;
    const o = this.state.overrides[base.id];
    if (base.columns && o && Object.keys(o).length) {
      const cols = base.columns;
      p = { ...p, columns: (vp) => ({ ...cols(vp), ...o }) };
    }
    return p;
  }

  private get viewport() {
    return { width: document.documentElement.clientWidth, height: window.innerHeight };
  }

  private draw() {
    if (!this.state.on) { this.grid.innerHTML = ''; return; }
    this.grid.style.opacity = String(this.state.opacity);
    this.grid.innerHTML = renderSvg(this.preset, this.state.layers, this.viewport);
  }

  private update() {
    this.draw();
    this.renderUi();
  }

  private renderUi() {
    const { on, menu, layers, opacity, overrides, canonDepth } = this.state;
    const p = this.basePreset;
    const available: Record<LayerId, boolean> = { columns: !!p.columns, rows: !!p.rows, square: !!p.square, canon: !!p.canon };
    const base = p.columns?.(this.viewport);
    const o = overrides[p.id] ?? {};
    const hasOverride = Object.keys(o).length > 0;

    this.ui.innerHTML = `
      ${menu ? `<div class="menu" role="dialog" aria-label="Grid overlay">
        <div class="row">
          <span class="title">Grid</span>
          <button class="switch ${on ? 'on' : ''}" data-act="toggle" role="switch" aria-checked="${on}" title="Show grid (Ctrl+G)"></button>
        </div>
        <div class="sec">
          <select data-act="preset" aria-label="Preset">${presets.map((x) => `<option value="${x.id}"${x.id === p.id ? ' selected' : ''}>${x.label}</option>`).join('')}</select>
        </div>
        <div class="sec">
          ${LAYERS.map((l) => `
            <label class="row ${available[l.id] ? '' : 'off'}">
              <input type="checkbox" data-layer="${l.id}" ${layers[l.id] && available[l.id] ? 'checked' : ''} ${available[l.id] ? '' : 'disabled'}>
              <span class="sw" style="background:${layerColors[l.id]}"></span>${l.label}<kbd>${l.key}</kbd>
            </label>`).join('')}
        </div>
        ${base ? `<hr>
          <div class="row"><span class="title" style="font-size:12px">Columns</span>
            ${hasOverride ? '<button class="link" data-act="reset">Reset</button>' : '<span class="muted">from CSS</span>'}</div>
          <div class="fields sec">
            ${OVERRIDE_FIELDS.map((f) => `<div><span>${f.label}</span>
              <input class="num" type="number" min="${f.id === 'count' ? 1 : 0}" data-field="${f.id}"
                value="${o[f.id] ?? ''}" placeholder="${Math.round(base[f.id])}"></div>`).join('')}
          </div>` : ''}
        ${p.canon ? `<hr>
          <div class="row"><span class="title" style="font-size:12px">Canon lines</span></div>
          <div class="seg sec" role="group" aria-label="Canon generations">
            ${[1, 2, 3].map((d) => `<button data-depth="${d}" class="${d === canonDepth ? 'on' : ''}" title="${d === 1 ? 'Main power lines (Figma canon)' : `Up to generation ${d}`}">${d === 1 ? 'Main' : `+${d - 1}`}</button>`).join('')}
          </div>` : ''}
        <hr>
        <div class="row"><span class="muted">Opacity</span></div>
        <div class="sec"><input type="range" min="0.1" max="1" step="0.05" value="${opacity}" data-act="opacity" aria-label="Opacity"></div>
        <div class="sec muted">Ctrl+G show · Ctrl+⇧+G preset</div>
      </div>` : ''}
      <button class="fab ${on ? 'on' : ''}" data-act="menu" aria-label="Grid overlay" aria-expanded="${menu}" title="Grid overlay">${ICON}</button>
    `;
  }

  private onClick = (e: Event) => {
    const act = (e.target as HTMLElement).closest('[data-act]')?.getAttribute('data-act');
    const depth = (e.target as HTMLElement).closest('[data-depth]')?.getAttribute('data-depth');
    if (depth) this.set({ on: true, canonDepth: Number(depth), layers: { ...this.state.layers, canon: true } });
    if (act === 'menu') this.set({ menu: !this.state.menu });
    if (act === 'toggle') this.set({ on: !this.state.on });
    if (act === 'reset') {
      const rest = { ...this.state.overrides };
      delete rest[this.state.preset];
      this.set({ overrides: rest });
    }
  };

  private onChange = (e: Event) => {
    const t = e.target as HTMLInputElement;
    if (t.dataset.layer) this.set({ on: true, layers: { ...this.state.layers, [t.dataset.layer]: t.checked } });
    if (t.dataset.act === 'preset') this.set({ on: true, preset: t.value, layers: layersFor(t.value) });
    if (t.dataset.field) {
      const id = this.state.preset;
      const current = { ...(this.state.overrides[id] ?? {}) };
      const field = t.dataset.field as keyof Override;
      const value = parseFloat(t.value);
      if (Number.isFinite(value)) current[field] = value; else delete current[field];
      this.set({ on: true, overrides: { ...this.state.overrides, [id]: current } });
    }
  };

  private onInput = (e: Event) => {
    const t = e.target as HTMLInputElement;
    if (t.dataset.act === 'opacity') { this.state.opacity = Number(t.value); this.save(); this.draw(); }
  };

  private onOutside = (e: PointerEvent) => {
    if (this.state.menu && !e.composedPath().includes(this)) this.set({ menu: false });
  };

  private onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.state.menu) { this.set({ menu: false }); return; }
    if (e.ctrlKey && !e.metaKey && !e.altKey && e.code === 'KeyG') {
      e.preventDefault();
      if (e.shiftKey) {
        const i = presets.findIndex((p) => p.id === this.state.preset);
        const next = presets[(i + 1) % presets.length].id;
        this.set({ on: true, preset: next, layers: layersFor(next) });
      } else this.set({ on: !this.state.on });
      return;
    }
    if (!this.state.on || e.ctrlKey || e.metaKey || e.altKey) return;
    const t = e.composedPath()[0] as HTMLElement;
    if (t?.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t?.tagName ?? '')) return;
    const layer = LAYERS.find((l) => l.key === e.key);
    if (layer) this.set({ layers: { ...this.state.layers, [layer.id]: !this.state.layers[layer.id] } });
  };
}

if (!customElements.get('grid-overlay')) customElements.define('grid-overlay', GridOverlay);
if (!document.querySelector('grid-overlay')) document.documentElement.append(document.createElement('grid-overlay'));
