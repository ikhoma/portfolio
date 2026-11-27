# Toolkit — concept

*Last updated 2026-11-27. Status of each module lives in [`../README.md`](../README.md);
product decisions in [`decisions/`](decisions/).*

## 1. What it is

Ivan's own toolkit for building **very high-quality websites and apps**: the
kind of work that wins on Awwwards, FWA and Godly, where typography, composition,
motion and storytelling carry the product.

It is not a UI kit or a component library. It is a set of **rules, tokens and
dev tools** that make good decisions repeatable:

- **rules** say what to do and why (written so both a person and a coding agent can follow them);
- **tokens** hold the values (one source for code, dev tools, Figma and the guide);
- **dev tools** show, while building, whether a page follows the rules (grid overlay, playgrounds, checks);
- **references** keep the taste: what Ivan studied, what he took, what he rejected.

## 2. Why

1. **Taste is easy to lose between projects.** Every new site starts from scratch;
   the grids, easings and type settings Ivan already likes live in old Figma files and memory.
2. **Agents need rules, not vibes.** Claude and other coding agents build most of the
   code. Without written rules they produce generic layouts and default animations.
3. **Checks beat reviews.** A grid overlay or a type check catches in seconds what a
   visual review catches late, if at all.

## 3. Scope: Obys' four seasons + engineering

The design side follows the four areas of Obys' *Design Education Series*:

| Obys season | Toolkit module |
|---|---|
| 01 Typography Principles | `type/` |
| 02 Colors Combinations | `color/` |
| 03 Grids | `grid/` |
| 04 Motion in Web Design | `motion/` |

Three engineering modules sit next to them: `spacing/`, `quality/`, `apps/`.

## 4. Principles

1. **One source of truth.** Values live as tokens (CSS custom properties); code, dev
   tools, Figma variables and the HTML guide read the same values.
2. **Figma is the reference for layout, tokens for code.** When they disagree, flag it to
   Ivan; never pick one silently.
3. **Presets over one-offs.** A pattern gets a name, a "use for / don't use for" and a demo.
4. **Reference → pattern → decision → preset.** Nothing enters the toolkit untested by
   taste: Claude collects and analyses references, Ivan decides what is taken, only then
   it becomes a preset.
5. **Quality gates before shipping.** Every breakpoint checked with the overlay,
   `prefers-reduced-motion` respected, Playwright screenshots of changed pages.
6. **Dev tools never ship.** They run in `astro dev` and in preview deployments only.

## 5. Anatomy of a module

Every module aims for the same four parts, so working in any of them feels the same:

| Part | Example in `grid/` | Example in `motion/` |
|---|---|---|
| Rules — `MODULE.md` | `GRID.md` | `MOTION.md` |
| Tokens | `--grid-cols`, `--grid-gutter`, `--grid-pad` (from `case.css`) | `tokens.css`: durations, easings, distances |
| Dev tool | overlay: Ctrl+G or the floating button | playground `/toolkit/motion` |
| References & decisions | Obys grid types, BONT canon, Symvol Lab grids | 2026 slice, `catalog.json`, `patterns.json` |

## 6. Two audiences

| Who | Reads | Where |
|---|---|---|
| Coding agents | Markdown rules, before building any UI | `*/MODULE.md`, `README.md` |
| People (Ivan, clients, team) | Visual guide with live demos | `docs/index.html`, playgrounds, slice viewers |
| Everyone | Why the toolkit is shaped this way | `docs/CONCEPT.md`, `docs/decisions/` |

## 7. Lifecycle

- **Pilot in the portfolio.** Every module is built and tested on real case pages
  first (`toolkit/` inside the portfolio repo).
- **Rule of two.** A module moves to a standalone `toolkit` repo once a second project
  needs it, e.g. SourceBible or a client site.
- **Ships through previews.** Changes go to the `toolkit-grid-motion` branch; Vercel
  preview deployments have the dev tools on, production never does.

## 8. Modules

### `grid/` — ✅ v1
- **Rules:** 12 columns by default (12 / 8 / 4 at 1440 / 1200 / 810), gutter 20, page
  padding 80, max width 1600; work in spans (6 / 4 / 3 / 2), not free widths; vertical rhythm;
  other grid types from Obys; checks before a layout is done.
- **Dev overlay:** columns, rows, square module and the Van de Graaf canon as a spread with
  generations of power lines; presets *Portfolio 12/8/4* and *Symvol Lab*; live column overrides;
  Ctrl+G, Ctrl+Shift+G, keys 1–4, `?grid=`.
- **References:** grids.obys.agency, BONT (Ivan's own reconstruction of the canon in Figma),
  Symvol Lab grids, Duosan Miao.
- **Open:** composition rules from Obys season 03 (balance, dominant element, rhythm,
  Gestalt) as a review checklist in `GRID.md`.

### `motion/` — 🟡 batch 2
- **Rules:** a taxonomy (every motion has one category), catalog format, the
  reference → preset workflow, rules for every animation (tokens only, reduced motion,
  no layout thrash).
- **Tokens:** durations 120–800 ms, `--ease-out` / `--ease-in-out` / `--ease-in`, distances.
- **Presets:** page transitions (fade, slide-up, scale-fade); batch 1 reveals: lines,
  fade-up, clip, blinds, draw, parallax, scramble, marquee, spring hover; batch 2
  composition: section stack, index nav, project browser (rows / lens), once-per-session
  entry, follower cursor and image lens.
- **References:** 2026 slice (19 sites: Awwwards and FWA sites of the month, Godly, and studios such
  as Obys, Locomotive, Exo Ape, Lama Lama), 18 patterns with Ivan's decisions; Ivan's Telegram channel
  of saved animations as the next source. FWA relaunched on 3 Nov 2026 without Site of the Day / Month (winners now enter one "canon" at an 80 % jury yes); FWA of the Year 2026 is voted in January 2027 — add it then. Future FWA slices take canon winners.
  Game-like sites are skipped and only counted (4 in 2026).
- **Open:**
  - batch 3: pinned-object (pinned iPhone, screens change while features scroll); floating-nav parked;
  - presets not yet wired into real portfolio pages;
  - undecided: gesture-hint, screen-frame (from the FWA pass);
  - slices for 2024–2025; Telegram export ingestion;
  - "motion character" sets (calm / confident / bold) that retune all presets at once (proposal).

### `type/` — ⏳ next
- **Starting rules from Obys' Typography Principles:**
  - 1–2 typefaces per project, chosen by the project's character;
  - body text around 14 px, line-height 120–130 %, tracking −1…+1 %;
  - large display headings: line-height 90–100 %, tracking −6…0 %;
  - pairs: contrasting types, similar proportions, matching details;
  - left alignment by default, right for balance, centre rarely; compositional mixed alignment as an accent;
  - 2–4 sizes per project with large steps (e.g. 90 / 60 / 30 / 14).
- **Taken from the motion slice (2026-11-27):** mixed-type — Ivan favours pairing a serif
  (antiqua) with a neo-grotesk; giant type as composition, used occasionally.
- **Planned:** type tokens (scale, line-heights, tracking per role), baseline overlay in the
  grid tool, a type check in the dev panel (how many sizes are in use, steps that are too
  close, line-height and tracking outside the ranges), a slice of type references.
- **Context:** Figma fonts "Atyp Display" and "Chelsea Basis" are unavailable; Manrope is
  the current fallback; Inter for body text in the Emagine case.

### `spacing/` — ⏳
- 4/8 spacing scale as tokens; an inspector that flags off-scale margins and gaps.

### `quality/` — ⏳
- Accessibility basics (text contrast, focus states, reduced motion) and Playwright
  screenshot tests of changed pages at every breakpoint.

### `apps/` — ⏳
- The same tokens exported to Swift; a SwiftUI debug grid overlay. First user: SourceBible.

### `color/` — 💤 last
- Deferred until after all other modules; see [decision 001](decisions/001-color-module-last.md).
- Theory from Itten's *The Art of Color* (Ivan's Ukrainian edition), method from Obys'
  Colors Combinations (palettes from photographs), WCAG for contrast.

## 9. Order

1. `grid/` ✅
2. `motion/` — finish wiring presets into the portfolio
3. `type/`
4. `spacing/`, `quality/` — alongside the portfolio build *(order between them not decided)*
5. `apps/` — when SourceBible starts using the toolkit *(proposal)*
6. `color/` — last
