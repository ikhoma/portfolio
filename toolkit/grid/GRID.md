# Grid

Rules for laying out pages and screens. Read this before building or changing
any layout. The dev overlay (`overlay/`) shows these grids on top of the page.

## 1. Default: 12 columns

Use one 12-column grid per product. 12 divides by 2, 3, 4 and 6, so every
common row of items lands on the same column lines with the same gutter.

| Breakpoint | Columns | Gutter | Margin | Container |
|---|---|---|---|---|
| ≥ 1440 | 12 | 20 | 80 | max 1600, centred |
| 1200–1439 | 12 | 20 | 32 | fluid |
| 810–1199 | 8 | 20 | 32 | fluid |
| < 810 | 4 | 16 | 16 | fluid |

Portfolio tokens: `--grid-cols`, `--grid-gutter`, `--grid-pad` in
`src/styles/case.css`. The overlay reads them live.

> Figma case frames use gutter 16; code uses 20 (decided 2026-11-26: a bit
> more air). The overlay menu can override the gutter to compare.

## 2. Spans, not free widths

| Items in a row | Span each | Width at 1440 (20 gutter) |
|---|---|---|
| 1 | 12 | 1280 |
| 2 | 6 | 630 |
| 3 | 4 | 413 |
| 4 | 3 | 305 |
| 6 | 2 | 197 |

- Rows of cards always use these spans. No "free" widths like 301 or 360 in
  a centred 1144 box — they look aligned alone and misaligned next to
  anything else.
- Reading text sits in a narrower measure **on the grid**: columns 3–10
  (8 columns). Media and card rows may use all 12.
- Asymmetric splits are fine if they are spans: 5+7, 4+8, 3+9.

## 3. Vertical rhythm

- Base unit = body line-height (portfolio: 16px × 1.5 = 24px). Use multiples
  of it, or of 8, for section gaps and block spacing.
- Type sizes are chosen so their line-heights fit the base unit.
- Obys rule: body 14–16px → its line height is the horizontal grid.

## 4. Other grid types (from Obys, grids.obys.agency)

Use them deliberately, for a page whose concept needs it — not as the
site-wide default.

**Van de Graaf / golden canon** — built from the canvas proportions.
1. Draw the main diagonals (whole canvas; for a spread also each half).
2. Draw lines through their intersections; repeat until the lines are
   40–100px from the edges.
3. Pick only a few *power lines* (Obys used 6–8) and align key blocks to
   them. Choose the lines before scaling the design.
4. Rebuild per breakpoint from the new proportions.
Ivan's Symvol Lab file uses the spread version (verticals at 1/6, 1/4, 1/3,
1/2, 2/3, 3/4, 5/6; horizontals at 1/4, 1/3, 1/2, 2/3, 3/4). It is Ivan's own
reconstruction of BONT®'s Golden Canon Grid (Adrián Somoza, bont.academy),
built from previews after the freebie went offline. Verified geometrically:
every line passes through a first-generation intersection of the spread's
diagonals (e.g. full diagonal × half-page anti-diagonal → 1/3; full diagonal ×
diamond → 1/4; half-page diagonal × diamond → 1/6).

**Canon + columns (BONT approach).** Use the canon on top of the column or
modular grid, not instead of it: columns give structure, a few power lines
give the composition's accents (hero headline, key image edge).

**Rectangular (modular)** — repeating modules, proportions close to the
screen (16:9, 4:3). Obys examples: 25 × 25 lines. Smaller modules for light
content, larger for dense. With many modules, highlight the main power lines.
Some modules can be kept empty as negative space.

**Columns variants seen at Obys (1920 × 1080):** 12/30/20, 8/60/30 with a
horizontal grid, 10/80/20. Columns can be split (8 → 16) for finer
alignment, or used without gutters/margins.

**Others** — asymmetric, round, diagonal, tilted. Idea first, grid second;
a strong concept may replace the site grid on one page, but mix in standard
elements so the page stays usable.

## 5. Reference sites

- **Obys Grids** — the four grid types above.
- **dousanmiao.com** — single centred editorial column: text 860, wide media
  1100, page margin 48 / 16 mobile, small local grids inside the text column
  (4 × 197 gap 24; 3 × 276 gap 16). Take the calm measure; express it on the
  12-col grid instead of local grids.

## 6. Checks before a layout is done

- [ ] Overlay on (Ctrl+G) at 1440, 1200, 810 and 390 widths.
- [ ] Every block edge lands on a column edge (or a chosen power line).
- [ ] Card rows use spans from §2.
- [ ] Section spacing is a multiple of the rhythm unit.
- [ ] Figma vs code differences noted to Ivan.

## 7. Overlay quick reference

- Floating button bottom-right → menu: show, preset, layers, column
  overrides (count / gutter / margin), opacity.
- Ctrl+G show/hide · Ctrl+Shift+G next preset · 1–4 toggle layers · Esc close.
- `?grid=portfolio` / `?grid=symvol` / `?grid=off` in the URL.
- **Canon lines** in the menu: *Main* = generation 1 (exactly Ivan's Figma
  canon: x 1/6…5/6, y 1/4…3/4), *+1* adds generation 2 (x 1/8, 3/8, 5/8, 7/8;
  y 1/6, 5/6, dashed), *+2* adds generation 3 (dotted). Lines closer than
  `minMargin` (40px) to an edge are dropped. Computed from the live viewport, so
  it adapts to any aspect ratio, mobile included.
- New preset = one object in `overlay/presets.ts`.
