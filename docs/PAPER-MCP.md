# Paper MCP — how to use it (knowledge base, read this instead of re-researching)

## Connection (already set up, do not re-ask the user)
- Paper desktop app runs a local MCP server: `http://127.0.0.1:29979/mcp` (server name `paper-desktop`, v0.5.18). Paper must be open.
- In sessions started before registration, the `mcp__paper__*` tools are NOT loaded. **Do not keep searching ToolSearch.** Use the HTTP client below.

## Client scripts (all in `D:\Portfolio2\tools`, run from that folder)
| Script | Use |
|---|---|
| `node paper.mjs --list` | dump all tool schemas (saved copy: `tools.json`) |
| `node paper.mjs <tool> '<json>'` | one call |
| `node pp.mjs calls.json` | batch: file = `[["tool",{args}],...]`, prints text results, saves screenshots to `../screenshots/paper/<name>.png` when args include `"name"` |
| `node ins.mjs paper/<x>.html <targetNodeId> [insert-children\|replace]` | write one HTML section into a node (file id baked in) |
| `guide.txt` | full Paper design guide (21 KB). Already read; reread only for specifics |

Long calls (screenshots) may auto-background; wait for the task notification, don't poll or rerun.

## Ids
- File: **`01M6R3TW7N6CVG94FXFD7JHGNQ`** ("Calm unity"), page `p-1-0`. **Every tool needs `fileId`.**
- Desktop artboard "Desktop 1280": node `1-0` (height `fit-content`). Mobile / tablet artboards: add below or beside with 80 px gap; record their ids here when created.

## Tool argument gotchas (learned the hard way)
- `get_font_family_info`: `{fileId, familyNames:[...]}` (array!)
- `create_artboard`: `{fileId, name, styles:{width,height,left,top,...}}`
- `write_html`: `{fileId, html, targetNodeId, mode:"insert-children"|"replace"}`
- `update_styles`: `{fileId, updates:[{nodeIds:[...], styles:{...}}]}`
- `get_screenshot`: `{fileId, nodeId, scale?}`  (my driver also takes `name` for the PNG filename)
- `create_tokens`: `{fileId, tokens:[{type,name,value}]}`; types: breakpoint color container fontFamily fontSize fontWeight letterSpacing lineHeight opacity radius spacing
- Output is verbose JSON; the first block is only file id + token hash.

## Paper design rules (condensed from guide.txt)
1. Post a short design brief (mood, palette, type, direction) in chat **before** any mutation. Done for this project.
2. Small writes: one visual group per `write_html` call.
3. After each section: `get_screenshot`, write a one-line verdict on spacing / typography / contrast / alignment / artboard fit / repetition, fix before moving on. Fix targeted; never delete and restart.
4. Artboard clipped → `update_styles` height `fit-content`.
5. Font sizes in **px**; letter-spacing in **em**; line-height in px. Check fonts with `get_font_family_info` first (done: Bricolage Grotesque, Inter, Instrument Serif all available).
6. Use tokens via `var(--color-primary)` etc. Opacity mix: `color-mix(in srgb, var(--color-paper) 90%, transparent)`.
7. Inline span styling supported: color, font, size, tracking, decoration. No backgrounds on spans.
8. Never mention Figma/Sketch in placeholder content. Realistic placeholder copy; no real photos (use placeholder shapes).
9. When done: call `finish_working_on_nodes {fileId}` (mandatory).
10. Repeated rows: fixed-width slots so columns align.

## Project state
Design source: `D:\Portfolio2\phoneresolutionssrecording.md` (spec). Reference captures: `screenshots/reference/{375,768,1280}/`.
Placeholder brand: **Lumen & Co.** (invented; do not use reference's name, copy, logo or photos).

Tokens already created in the file (42): colors `paper #F3F1EA, card #FAF9F5, line #DEDACE, ink #12130F, muted #55524A, primary #2D3FA6, primary-dim #222F85, white, tile #DCD8CB`; breakpoints sm/md/lg 640/768/1024; spacing gutter-sm/md/lg 20/32/48, section-sm/md 80/112; container-site 1180; fonts display=Bricolage Grotesque, body=Inter, accent=Instrument Serif italic; sizes body 17, label 12, h3 28, h2 64, h1 123; tracking h1 -0.075em, h2 -0.045em, h3 -0.03em, label 0.14em; leading body 27, h1 111, h2 64; radius tile 16, card 20, cta 28, pill 9999.

Built so far on Desktop 1280 (`1-0`): header, hero (HTML in `tools/paper/header.html`, `hero.html`).
Remaining order: marquee → statement → work → deliverables → process → plans → commitment band → about → FAQ → final CTA → footer, then 375 mobile and 768 tablet artboards.

## Progress log
- Desktop 1280 artboard `1-0`: header `2-0`, hero `D-0` (right visual cluster `R-0`). Hero reviewed twice; v3 screenshot `screenshots/paper/desktop-hero-v3.png`.
- Hero verdict: structure and type match spec; headline wraps to 3 lines ("Stand out." / "Stay" / "known.") like the reference's 3-line hero; placeholder silhouette in photo card; top/bottom fades on tile grid.
- Layers on Paper nodes are positioned with `position:absolute` inside `R-0`; z-order = insertion order, so insert overlays (tooltips) AFTER fades.
- Next: marquee section → statement → work …

## Progress log (update 2)
- **Desktop 1280 artboard `1-0` is COMPLETE**: header, hero, marquee, statement, work, deliverables, process, plans, band, about, FAQ, final CTA, footer. All reviewed via screenshots in `screenshots/paper/desktop-*.png`; `finish_working_on_nodes` called.
- Section HTML is generated by `tools/gen.mjs` (helpers + 11 sections) into `tools/paper/NN-name.html`. `node gen.mjs` regenerates; `node add.mjs <artboardId> <stem>...` appends sections to an artboard; `node ins.mjs paper/<stem>.html <nodeId> replace` swaps one section in place (node ids change after replace; re-read with get_tree_summary depth 1).
- Gotcha: `<br/>` works in write_html text. Heading width 1000px in `head()` keeps h2 on one line where it fits.
- Not done: **375 mobile** and **768 tablet** artboards (place at left 1360 / 2200, 80 px gaps), then compare each against `screenshots/reference/<w>/`.
- Known small items: process H2 leaves "recall." on its own line; footer columns are unevenly spaced.

## Progress log (update 3) — spec-driven pass + LIMIT WARNING
- **Paper free plan has a weekly MCP call limit. It was hit on 2026-11-06** ("Weekly MCP limit reached. It resets tomorrow. Upgrade to Paper Pro..."). Every `write_html` / `get_screenshot` / `get_tree_summary` counts. Until it resets (or the user upgrades), Paper calls fail with that message; nothing is lost, the file already holds the last successful edits.
- To save calls next time: render sections locally first (`node measure.mjs` renders `paper/*.html` in Chrome and diffs against the live site with zero Paper calls), only push to Paper once numbers match, and avoid per-section screenshots/tree reads (read ids once).
- Specs written from the live site: `reference-specs.md` (all measurements, no class names/copy) and `specs-compare.md` (numeric diff, ref vs Paper). Tools: `tools/measure.mjs` -> `ref-metrics.json`, `local-metrics.json`, `local-preview.html`.
- Desktop section heights now (ref -> Paper): header 73/73, hero+marquee 838/838, statement 522/532, work 1110/1115, deliverables 750/757, process 1024/1034, plans 961/972, band 355/357, about 925/913, faq 951/962, cta 759/759, footer 437/437.
- Remaining intentional differences: own palette (blue #2D3FA6 vs ref #213f89, paper #F3F1EA vs #F5F1E8), placeholder copy/images, accent font Instrument Serif vs ref Argent CF.
- Accent words in headings = same size as heading (64 / hero 123), letter-spacing -0.02em, weight 800 (ref uses faux-bold italic serif). Body text: leads 18/29.25, hero lead 20/31, lists 17/23.4, cards 17/27.6.
- Current node ids (artboard `1-0`, may change after replace): header EV-0, hero QB-0, marquee 2O-0, statement 143-0, work HR-0, deliverables ZE-0, process UM-0, plans 114-0, band NH-0, about 13G-0, faq OB-0, cta YH-0, footer YS-0.
- Not verified visually after the last patches (limit hit before screenshots): hero v4 `screenshots/paper/desktop-hero-v4.png` was the only one saved; look at it first.

## Handoff to Figma (2026-11-06)
- User decided to continue in Figma after the Paper limit. Full export of the Paper design is in `design-export/` (README there lists contents). Source of truth = `tools/gen.mjs` + `tools/paper/*.html`; run `node tools/export-design.mjs` to refresh the export (zero Paper calls).
- Figma MCP: `https://mcp.figma.com/mcp` exists in the connector registry but is NOT connected. Needs the user to add/authorize it. Its listed tools are mostly read-side (get_design_context, get_screenshot, get_metadata, get_variable_defs, generate_diagram, get_figjam, create_design_system_rules, get_code_connect_map). Verify write capability after connecting. Figma free/Starter plans have a very small MCP call allowance (I believe about 6 calls/month; verify) — batch calls and render locally first.

## Figma build (2026-11-06) — DONE for desktop 1280
- Figma MCP can WRITE: `use_figma` (Plugin API JS), `generate_figma_design` (HTML page -> editable layers), `create_new_file`. Load skills via `ReadMcpResourceTool server=figma uri=skill://figma/figma-use/SKILL.md` before `use_figma`.
- File: "Lumen & Co. — Portfolio", key `RRm7sOaYLwqevFsApSrMcZ` (https://www.figma.com/design/RRm7sOaYLwqevFsApSrMcZ), plan `team::1216016158986300812` (Starter, Full seat). Desktop frame "Desktop 1280" = node `1:2` (585 nodes: 359 frame, 161 text, 65 vector, 0 image fills; fonts Bricolage/Inter/Instrument Serif present).
- Rate limits: Starter plan reads may be quota'd; writes (`create_new_file`, `generate_figma_design`) are exempt; `use_figma` unconfirmed but worked.
- Reusable pipeline for 375/768 or any page: serve `design-export/` (`python -m http.server 8765`), call `generate_figma_design {fileKey}` -> captureId, run `node tools/figma-capture.mjs <url> <captureId> <promptId> <viewportWidth>` (Playwright + Chrome injects Figma's capture.js), poll `generate_figma_design {fileKey, captureId}` until done. Captures add a new frame to the file.
- Local render of the Figma result: `screenshots/figma/capture-1-2.png`.
- Todo: 375 mobile + 768 tablet versions (generate via `tools/gen.mjs`, export, capture at viewportWidth 375 / 768).
- 2026-11-06: 375 + 768 DONE in Figma file `RRm7sOaYLwqevFsApSrMcZ`: "Mobile 375" = node `4:2` (375x11097), "Tablet 768" = node `3:2` (768x8638), same page as "Desktop 1280" (`1:2`). Each 573 nodes (352 frame/155 text/66 vector), 0 image fills.
- Source: `tools/gen-responsive.mjs` -> `design-export/responsive.html` (one CSS page, breakpoints 768 / 1024, hamburger below 1024). Preview PNGs: `node tools/render-responsive.mjs [widths]` -> `design-export/responsive-<w>.png`. Capture: `node tools/figma-capture.mjs http://localhost:8765/responsive.html <captureId> <promptId> <viewportWidth>`.
- Caveat: Figma-side result not screenshot-compared (only sizes/counts); local renders at all 3 widths have no horizontal overflow. Desktop 1280 frame (`1:2`) comes from the older fixed-width `desktop-1280.html`; responsive.html at 1280 is a slightly different (rebuilt) layout.

## Reference-video + live-site comparison pass (2026-11-06)
- Videos (both are scroll-throughs of the reference): `phoneresolutionssrecording.mp4` 444x780 140 s, `20261106-0847-05.2400363.mp4` 1920x862 86 s. Frames: `screenshots/video/{phone,desktop}/` (every 2 s + `sheet-NN.png` contact sheets).
- Tools: `node tools/range-server.mjs` (serves D:\Portfolio2 on :8766 WITH Range support; python http.server breaks seeking: currentTime stays 0 and every frame is frame 0), `node tools/video-frames.mjs frames <video> <outDir> <everySec>`, `node tools/site-timeline.mjs <url> <outRoot> [widths]` (hero timeline loop + slow scroll pass), output `screenshots/site-timeline/<w>/`.
- Live-site findings applied to `tools/gen-responsive.mjs`: no header CTA below 768 + hamburger below 1024; open-menu state (`design-export/responsive-menu-open.html`); hero photo glow, reel left fade, pill border+glow, shorter tablet reel; work cards as post cards (own placeholder chrome); section padding 112 from 768; min-heights (steps 283/228, plans 503, CTA 535/520, footer 437); footer 1-col on mobile. Section heights at 1280 now match live within ~65 px (hero, band, CTA, footer exact).
- Not copied: reference text, logo, photos, class names (project rule).
- Figma v2 frames (file `RRm7sOaYLwqevFsApSrMcZ`): Mobile 375 v2 `8:2` (375x11555), Tablet 768 v2 `11:2` (768x9360), Desktop 1280 v2 `9:2` (1280x8566), Mobile 375 menu open v2 `10:2` (375x11920). 0 image fills. Older frames renamed "(v1)": `4:2`, `3:2`, `1:2`.
- Not done: live-motion states are not in Figma (reel scroll, marquee, entrance rise, underline draw), hover states, FAQ-open variants beyond the first item, pixel diff of Figma vs live.

## Hover + motion states (2026-11-06)
- Measured on the live site (`node tools/measure-interactions.mjs <url> <out.json> [width]` -> `screenshots/site-interactions.json`): primary btn hover bg darker + translateY(-2px) in 0.2s cubic-bezier(.4,0,.2,1); secondary btn hover color+border -> primary; nav + FAQ-row hover color -> primary in 0.15s; "watch" link hover underline; cards (steps/plans) NO hover change; focus ring 2px solid ink, offset 3px. Animations: rise 0.8s (22px up, delays 0/.09/.18/.27s), scribble 0.9s delay .75s, dot glow 2.4s, feed columns 34/41(reverse)/48s linear, float 7s, marquee 60s (one reverse), reveal wrapper 0.65s cubic-bezier(.22,1,.36,1). FAQ expand duration not measurable (selector missed): used 0.3s grid-rows ease.
- `tools/gen-responsive.mjs` now emits `design-export/{responsive,responsive-menu-open,states}.html`: real CSS keyframes, hover/focus, scroll reveal + single-open FAQ (small inline JS), `prefers-reduced-motion` fallback (animations off, reveals shown, duplicate reel tiles hidden).
- IMPORTANT for Figma capture: `figma-capture.mjs` and `render-responsive.mjs` emulate reduced motion by default (static, fully visible layers) and wait for `document.fonts.ready`. The states sheet needs `MOTION=on` (its frames are frozen with `.freeze` + `--t` negative animation delays). The importer drops CSS `outline`, so states-sheet focus rings are drawn as box-shadow (`.is-focus`); the live page keeps the real `:focus-visible` outline.
- `node tools/verify-motion.mjs` (needs `node tools/range-server.mjs`): 17 checks (animation durations/directions, hover/focus values, FAQ single-open + expand, reveal 0 -> 1, reduced motion) all pass.
- Figma: "States and motion 1280" = node `17:2` (1280x4912, 1182 nodes, 0 image fills): buttons/nav/links/FAQ in default/hover/focus/open, hero entrance at 0.15/0.45/0.9/1.5s, reel+floating card at 0/8/17/26s, marquee at 0/20/40s, reveal before/after. Verified by Figma screenshot of the buttons section.
- Not in Figma: v2 frames (`8:2`, `11:2`, `9:2`, `10:2`) were captured before this pass (marquee seam fix, FAQ markup: closed answers now exist at 0 height). Re-capture them if exact parity matters. No Figma prototype interactions (Smart Animate) were wired.
- 2026-11-06 re-capture done: the four v2 page frames were re-captured from the current generator (marquee seam fix, FAQ accordion markup) and the old v2 frames deleted. Current node ids (file `RRm7sOaYLwqevFsApSrMcZ`): Mobile 375 v2 `22:2` (375x11555, 651 nodes), Tablet 768 v2 `20:2` (768x9360, 653), Desktop 1280 v2 `19:2` (1280x8566, 660), Mobile 375 menu open v2 `21:2` (375x11920, 665), States and motion 1280 `17:2`. All 0 image fills. v1 frames `4:2`, `3:2`, `1:2` kept. The earlier ids `8:2`, `11:2`, `9:2`, `10:2` no longer exist. Hero + marquee of `19:2` checked by Figma screenshot.
- Caveat: closed FAQ answers exist in the captured frames as 0-height clipped nodes (accordion markup); delete them in Figma if unwanted.
