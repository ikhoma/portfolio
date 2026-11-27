# Toolkit

Ivan's own toolkit for building high-quality sites and apps. It is piloted
inside the portfolio; a module moves to a standalone `toolkit` repo once a
second project needs it ("rule of two").

Two audiences, two formats:

| For | Format | Where |
|---|---|---|
| Claude (and any coding agent) | Markdown rules, read before building UI | `*/GRID.md`, `*/MOTION.md`, this README |
| People (Ivan, clients, team) | Visual HTML guide | `docs/index.html` |
| Everyone | Concept: what the toolkit is, every module, order | `docs/CONCEPT.md` |
| Everyone | Product decisions: what gets built, when, why | `docs/decisions/` |

## Principles

1. **One source of truth.** Grid, spacing, type and motion values live as
   tokens (CSS custom properties). Code, the dev tools, Figma variables and
   the HTML guide all read the same values. Never hard-code a value that a
   token already describes.
2. **Figma is the reference for layout, tokens are the reference for code.**
   When they disagree, flag it to Ivan — don't silently pick one.
3. **Presets over one-offs.** Motion and layout patterns are named presets
   with a clear "use for / don't use for". A new effect enters the toolkit as
   a catalogued reference first, then becomes a preset.
4. **Quality gates before shipping.** Check every breakpoint with the grid
   overlay, respect `prefers-reduced-motion`, check contrast, take Playwright
   screenshots of changed pages.
5. **Dev tools never ship.** Everything under `*/overlay` or marked dev-only is
   injected in `astro dev` only.

## Modules

| Module | Status | What |
|---|---|---|
| `grid/` | ✅ v1 | Grid rules (`GRID.md`) + dev overlay (Ctrl+G / floating button) |
| `motion/` | 🟡 batch 2 | Tokens, page transitions, 9 reveal/scroll + 6 composition presets (stack, index, project browser rows/lens, entry, cursor/lens) + playground `/toolkit/motion`, slices & decisions (`MOTION.md`) |
| `type/` | ⏳ next | Type scale on the baseline, baseline overlay |
| `spacing/` | ⏳ | 4/8 spacing scale, inspector for off-scale values |
| `quality/` | ⏳ | Contrast / a11y checks, Playwright screenshot tests |
| `apps/` | ⏳ | Same tokens exported to Swift; SwiftUI debug grid overlay |
| `color/` | 💤 last | Itten's contrasts and harmonies, role tokens, contrast checks, palette tool — deferred, see [decision 001](docs/decisions/001-color-module-last.md) |

## Layout

```
toolkit/
  README.md            ← you are here
  grid/
    GRID.md            ← rules: which grid, spans, rhythm, checks
    overlay/           ← dev overlay (index.ts, presets.ts, render.ts)
  motion/
    MOTION.md          ← taxonomy, catalog format, reference workflow, presets
    tokens.css         ← durations + easings
    presets/           ← page-transitions.css, reveal.css + reveal.ts, compose.css + compose.ts
    playground.astro   ← dev-only /toolkit/motion
    patterns.json      ← patterns + Ivan's decisions + status
    slices/2026/       ← visual review page of the 2026 slice
    catalog.json       ← every motion reference, tagged
    references/        ← frames / contact sheets of references (videos stay out of git)
  docs/
    CONCEPT.md         ← what the toolkit is, all modules, order
    decisions/         ← numbered product decisions
    index.html         ← visual guide for people
```
