# Design export (Paper -> anywhere) — Lumen & Co. desktop 1280

Why this exists: Paper's free plan hit its weekly MCP limit on 2026-11-06. Everything that was written to Paper came from local files, so this folder is the complete, tool-independent copy of the design.

## What is here
| File | What it is |
|---|---|
| `desktop-1280.html` | Whole desktop design as one self-contained page (tokens inlined, fonts from Google Fonts). Open in Chrome; also the input for any HTML-to-design importer. |
| `desktop-1280-full.png` | Full-page render of that HTML (1280 wide). Same pixels as the Paper design. |
| `sections/NN-name.html` + `.png` | 13 sections, one HTML + one PNG each (header, hero, marquee, statement, work, deliverables, process, plans, band, about, faq, cta, footer). HTML uses `var(--color-…)` tokens: include `tokens.css`. |
| `tokens.json` / `tokens.css` | The 42 design tokens (colors, breakpoints, spacing, container, opacity, fonts, weights, sizes, tracking, leading, radii) in Tailwind v4 naming. |
| `reference-specs.md` | Measured CSS/specs of the live reference site (no copy, no class names). |
| `specs-compare.md` | Numeric diff: reference vs this design. |
| `design-spec.md` | The written design spec (palette, type scale, spacing, components, section order, interaction map, build plan). |
| `screenshots-paper/` | Screenshots taken from Paper during the build. |

## Paper file (for later, when the limit resets)
- File "Calm unity", id `01M6R3TW7N6CVG94FXFD7JHGNQ`, artboard "Desktop 1280" (`1-0`). It already holds all 13 sections and the tokens.
- Not yet visually re-checked in Paper after the last spec-driven patches (only hero verified).

## Fonts
Bricolage Grotesque (display, 700/800), Inter (body 400/600), Instrument Serif italic (accent). All free on Google Fonts.

## Moving to Figma
The official Figma MCP (`https://mcp.figma.com/mcp`) is mainly a *read* server (get_design_context, get_screenshot, get_metadata, get_variable_defs, diagrams). Check the current tool list after connecting before assuming it can write frames. Practical routes:
1. **Import this HTML into Figma** with an HTML-to-design importer (plugin or Figma's own capture) using `desktop-1280.html`.
2. **Recreate by hand/plugin** from `tokens.json` (variables) + `sections/*.png` as reference.
3. Keep authoring here (HTML is the source of truth) and use Figma only for review.

Still to design: 375 mobile and 768 tablet artboards (same generators: `archive/paper-era/gen.mjs`, widths/layout rules in `design-spec.md`).
