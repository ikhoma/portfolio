# Motion

How motion is collected, described and reused. Read this before adding any
animation or transition.

## 1. Taxonomy — every motion has exactly one category

| Category | Id | Examples |
|---|---|---|
| Page transition | `page-transition` | crossfade, slide-up, shared hero morph, curtain |
| Shared element | `shared-element` | card image → case hero |
| Scroll — reveal | `scroll-reveal` | fade-up on enter, staggered list, clip reveal |
| Scroll — linked | `scroll-linked` | parallax, progress, pinned sections, horizontal scroll |
| Text | `text` | line/word/char reveal, split text, counter |
| Carousel / slider | `carousel` | drag with inertia, snap, infinite marquee |
| Hover / press | `hover` | magnetic button, image zoom, underline draw |
| Cursor | `cursor` | custom cursor, follower, cursor labels |
| Menu / overlay | `menu` | full-screen menu, modal/sheet open |
| Loader / intro | `loader` | first-load sequence, counter, logo reveal |
| Micro-interaction | `micro` | toggle, like, copy-to-clipboard feedback |
| Media | `media` | video hover play, image sequence |

A preset can be used only in its category's context. A carousel easing is
not reused as a page transition just because it looks nice.

## 2. Catalog entry (catalog.json)

Each reference — from a site URL or a saved video — becomes one entry:

```json
{
  "id": "slide-up-curtain",
  "category": "page-transition",
  "source": { "type": "url | video", "ref": "https://… or telegram export file name", "at": "0:04" },
  "description": "Old page slides up 8% and fades, new page rises from below.",
  "trigger": "navigation",
  "properties": ["transform: translateY", "opacity"],
  "duration_ms": 600,
  "easing": "cubic-bezier(0.22, 1, 0.36, 1)",
  "stagger_ms": null,
  "feel": ["calm", "editorial"],
  "use_for": ["case pages", "long reads"],
  "avoid_for": ["dashboards", "frequent nav"],
  "rating": 5,
  "preset": "presets/page-transitions.css#slide-up",
  "status": "reference | prototype | preset",
  "notes": "Ivan's notes"
}
```

`feel` vocabulary (keep it small): `calm`, `snappy`, `playful`, `bold`,
`editorial`, `technical`, `luxury`, `physical`.

## 3. Turning references into presets

1. **Collect** — Ivan sends a URL or a video (Telegram export, screen
   recording).
2. **Measure**
   - URL: open in Chrome, record a GIF, read the real CSS / JS (keyframes,
     GSAP timelines, easing values). Exact values beat estimates.
   - Video: extract frames with ffmpeg (`fps=30`), build a contact sheet,
     estimate duration from frame count and easing from the position curve.
3. **Catalog** — add an entry with status `reference`; save the contact sheet
   to `references/<id>.jpg`. Videos stay out of git.
4. **Confirm with Ivan** — category, feel, where to use. His rating decides
   what becomes a preset.
5. **Prototype → preset** — implement with tokens from `tokens.css`, add a
   reduced-motion fallback, add it to the HTML guide, set status `preset`.

## 4. Rules for every animation

- Use tokens: `--dur-*` and `--ease-*` from `tokens.css`. No raw
  `0.3s ease`.
- Animate `transform` and `opacity` (and `clip-path` when needed). Avoid
  animating layout properties.
- Respect `prefers-reduced-motion`: replace movement with a fade or nothing.
- Interactions under 200ms feel instant; page transitions 300–600ms;
  intros up to ~1.2s and only once per session.
- Prefer platform features first: CSS transitions, View Transitions API,
  scroll-driven animations (`animation-timeline`). Add a library (GSAP,
  Motion) only when a preset truly needs it, and only on the pages that use
  it.

## 5. Presets

### Page transitions — `presets/page-transitions.css`
Chosen per page with an attribute on `<html>`: `<html data-transition="slide-up">`.
Available: `fade` (default), `slide-up`, `scale-fade`, `none`. Shared-element morphs
use `view-transition-name` on both pages (see the Emagine hero).

### Reveal & scroll — `presets/reveal.css` + `presets/reveal.ts` (batch 1, from the 2026 slice)
Import the CSS once, call `initMotion()` after fonts load:

```astro
<script>
  import { initMotion } from '../../toolkit/motion/presets/reveal';
  document.fonts.ready.then(() => initMotion());
</script>
```

| Markup | What | Reference |
|---|---|---|
| `data-reveal="lines"` | lines rise from a mask, staggered (plain text only — inline markup is flattened) | Lama Lama, ERA |
| `data-reveal="fade-up"` | opacity + translateY; siblings stagger automatically | ERA, Shopify Editions |
| `data-reveal="clip"` + `data-clip="up\|left\|center"` | clip-path reveal, image settles from 1.12 scale (triggered by its parent entering — Chrome ignores fully clipped targets) | Son Daven, Lando Norris |
| `data-reveal="blinds"` + `data-stripes` | image opens through vertical stripes (`--tk-blinds-color` = page bg) | Son Daven |
| `data-parallax="0.2"` | drift of ±k·60vh while crossing the viewport; negative = other way. Scroll-driven CSS; JS when the browser lacks it or a wrapper has `overflow: hidden/auto` (prefer `overflow: clip` on wrappers) | Son Daven, ERA, Lando |
| `data-draw` on `<hr>` / `.tk-rule` / `<svg>` | rules grow, SVG strokes draw in sequence | ERA, Shopify Editions |
| `data-scramble` (+ `data-duration`) | short labels / numbers scramble then settle | Lama Lama, Locomotive |
| `data-marquee` (+ `data-speed` px/s, `data-direction="right"`) | endless strip, pauses on hover | Son Daven, ERA |
| `.tk-spring` | hover / press with overshoot (`--ease-spring`, CSS `linear()`) | Shopify Editions, Obys |

Per-element tuning: `--tk-dur`, `--tk-stagger`, `--tk-delay`, `--tk-ease`, `--i` (manual order).
Reveals run once; `data-once="false"` keeps observing. All of it is static under
`prefers-reduced-motion`.

**Live playground:** `npm run dev` → `/toolkit/motion` (dev only).

### Composition — `presets/compose.css` + `presets/compose.ts` (batch 2)
Page-level patterns. Import the CSS, then call `initCompose()` next to `initMotion()`:

```astro
<script>
  import { initMotion } from '../../toolkit/motion/presets/reveal';
  import { initCompose } from '../../toolkit/motion/presets/compose';
  document.fonts.ready.then(() => { initMotion(); initCompose(); });
</script>
```

| Markup | What | Reference |
|---|---|---|
| `.tk-stack > .tk-stack__panel` | full-screen sticky panels; the next slides over, the previous sinks (scale .92, dims). CSS only, scroll-driven | Floema, Shopify Editions |
| `<nav data-index="#scope" data-numbers="roman">` + `data-index-title` on sections | builds a numbered table of contents, lights the current section, progress rule (`--tk-progress`) | Shopify Editions, Obys, ERA |
| `.tk-projects[data-variant="rows"]` > `a.tk-project` (`__name`, `__meta`, `__strip` of imgs) | work list; hover / focus slides the preview strip in | Lama Lama |
| `.tk-projects[data-variant="lens"]` > `.tk-lens__name`, `.tk-lens__col` > `.tk-project[data-name][data-meta][data-tags]`, `.tk-lens__meta` | vertical scroll-snap column, centred project in focus between brackets, name/meta beside it; arrows work | Obys |
| `<body data-entry="Ivan Khoma" data-entry-duration="1800">` | intro overlay once per session: wordmark rises, grid lines draw, curtain lifts. Esc / Skip closes; never under reduced motion. `showEntry({ force: true })` replays | Unseen, Floema, Lama Lama |
| `data-cursor="View"` | follower cursor grows into a labelled disc over the element | Lando Norris, Obys |
| `<figure data-lens><img><img class="tk-lens__reveal"></figure>` | second image revealed in a circle under the pointer (`--tk-lens-r`) — before/after, wireframe/final | Lando Norris (without WebGL) |

Cursor and lens are off on touch screens. Colours come from `--tk-index-text`,
`--tk-index-muted`, `--tk-index-accent`, `--tk-cursor`, `--tk-entry-bg`.

### Decisions & backlog — `patterns.json`
Every pattern from the slices with Ivan's decision (`take` / `maybe` / undecided),
status (`preset`, `parked`, `undecided`) and where it is implemented.
Still open: mixed-type, giant-type, pinned-object (undecided), floating-nav (parked).

## 6. Already in the portfolio (seeded in the catalog)

- Crossfade between pages — 320ms, `--ease-out`.
- Shared hero image morph (card → case hero) — 560ms, `--ease-out`.
- Hero parallax — scroll-driven, `translateY(15%)` over the first viewport.
- Card image zoom on hover — `scale(1.05)`, 500ms.
