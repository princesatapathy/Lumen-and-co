# Reference notes: what was measured on the live reference

Merged from three older files that overlapped: `phoneresolutionssrecording.md`, `reference-specs.md`, `specs-compare.md` (all still in `reference-analysis/specs/`, untouched).
Reference: https://naveenrkcreates.com/ (layout and behavior only; see D-07). Numbers and structure only. **No reference text, logo, photos or class names are copied here or may be copied into the site.**

How to read the marks:
- **STALE** = the value in the old specs no longer matches the site. The site uses the live-measured values from `DECISIONS.md` D-10 / D-11.
- Unmarked = still a valid measurement, though the site may round or make it fluid.
- The source of truth for the site's numbers is `DECISIONS.md` and `site/src/styles/theme.css` + `base.css`, not this file.

## 1. Current site values (win over anything below)

| Item | Value (D-10, D-11) |
|---|---|
| Palette | paper `#F5F1E8`, card `#FBF9F4`, line `#E2DCCD`, ink `#111`, muted `#4A4640`, primary `#213F89`, primary-dim `#1A3270` |
| Content container | 1084 px, centred on desktop |
| Gutter | 20 px below 640, 32 px from 640 |
| h1 | `min(19vw,104px)` / `12.5vw` / `min(9.6vw,144px)` (three breakpoint ranges) |
| h2 | `clamp(40px, 6.5vw, 64px)` |
| Header | hamburger below 1024 px |
| Reel tiles | 9:14 aspect ratio, never shrink (D-09) |

## 2. Evidence on disk

| What | Where |
|---|---|
| Desktop scroll recording, 1920x862, 86 s | `reference-analysis/videos/20261106-0847-05.2400363.mp4` |
| Phone scroll recording, 444x780, 140 s | `reference-analysis/videos/phoneresolutionssrecording.mp4` |
| Video frames (phone every 3 s, early desktop pass every 4 s) | `reference-analysis/screenshots/phone/`, `.../early-pass/`, `.../video/` |
| Page captures at 375 / 768 / 1280 | `reference-analysis/screenshots/reference/{375,768,1280}/` |
| Section-by-section site vs reference | `reference-analysis/screenshots/compare/` |
| Owner's own desktop shots (never delete) | `reference-analysis/screenshots/owner-manual-desktop/` |
| Measuring scripts | `reference-analysis/scripts/` (`capture`, `probe`, `tokens2`, `ref-*`, `measure-interactions`, `site-timeline`, `video-frames`, `hero-shots`) |
| Raw data | `reference-analysis/data/` (`probe-output.json`, `ref-metrics.json`, `site-interactions.json`, `site-timeline.log`) |

Videos and screenshots are git-ignored (D-16, D-21). `ref-metrics.json` and `probe-output.json` predate the 2026-11-07 palette and container update, so they are **STALE** history.

## 3. Resolutions tested

| Width x height | Kind | Page height | Horizontal overflow |
|---|---|---|---|
| 375 x 812 (DPR 2, touch) | phone | 11 979 | none |
| 444 x 780 | phone (recording) | n/a | none seen |
| 768 x 1024 | tablet | 9 562 | none |
| 1280 x 800 | desktop | 8 853 | none |
| 1920 x 862 | wide desktop (recording) | n/a | none seen |

Breakpoints are the Tailwind defaults `sm 640 / md 768 / lg 1024`, plus `hover:hover` and `prefers-reduced-motion` guards. The header switches from hamburger to full nav at 1024, not 768.

Unverified: the 1280 section heights in section 6 add up to 8 705, not 8 853. The 148 px gap is not explained in the old files.

## 4. Design values

### Colour roles
Sections alternate white and paper. One full-bleed primary band. Footer is ink.

| Role | Value |
|---|---|
| Page ("paper") | `#F5F1E8` |
| Card surface | `#FBF9F4` |
| Hairline border | `#E2DCCD` |
| Ink | `#111111` |
| Muted text | `#4A4640` |
| Primary (buttons, accent words, band, featured card) | `#213F89`, hover `#1A3270` |
| Alternate section background | `#FFFFFF` |
| Hero reel tile background | `#D8D1C2` |

The earlier Paper-era design used its own palette (paper `#F3F1EA`, primary `#2D3FA6`, ink `#12130F`). That is **STALE** and survives only in `archive/design-source-old/` and nowhere else (the old Figma frames were deleted).

### Type
Fonts in use: Bricolage Grotesque (display 700/800), Inter (body 400/600), an italic serif for accent words. Eyebrow: Inter 600, uppercase, 12 px, letter-spacing 0.14em (the live eyebrow measures 1.68 px, which is 0.14em at 12 px).

| Role | 375 | 768 | 1280 | Note |
|---|---|---|---|---|
| Hero h1 | 71 / lh 64 | 96 / lh 86 | 123 / lh 111, ls -9.2 | Sample points of the fluid rule in section 1; the per-width table is **STALE** as a spec, still correct as a check |
| Section h2 | 40 / 40 | 50 / 50 | 64 / 64, ls -2.88 | Same: samples of `clamp(40px,6.5vw,64px)` |
| Card h3 | 24 / 30 | 28 / 35 | 28 / 35, ls -0.84 | |
| Body | 17 / 27.6 | 17 / 27.6 | 17 / 27.6 | Same at every width |

Other measured text at 1280: nav links 15/24 fw 500; hero lead 20/31; section lead 18/29.25; list items 17/23.38; hero accent word ls -2.46 (smaller than the h1's -9.22); h2 accent word ls -1.28; FAQ question 22/30.25 fw 700; footer text 15/24.4; about quote 52/57.2 fw 400 (serif); plan h3 30/36.

### Spacing
- Section vertical padding: 80 px mobile, 112 px from md; the primary band uses 96 px.
- **STALE:** "container max 1180 with side padding 20 / 32 / 48". The live content width is 1084 px (1180 minus 48 px on each side); the site uses gutters 20 / 32 and a centred 1084 px column (section 1).
- Header height: 65 px mobile, 73 px md and up. Sticky, paper at 90% opacity, `backdrop-filter: blur(8px)`, 1 px bottom border in the line colour.
- Grid gaps: steps 20, pricing 28, reel carousel 16.

### Components
| Component | Spec |
|---|---|
| Primary button | pill, primary fill, white text, 16 px / 600, padding 14 x 28, height 54. Hover: darker fill, `translateY(-2px)`, 0.2 s `cubic-bezier(.4,0,.2,1)` |
| Secondary button | pill, transparent, 1 px ink border, same size. Hover: text and border turn primary |
| Eyebrow | small star glyph, number, uppercase label. Pill version in the hero: 12 px, padding 8 x 18, 1 px border, gap 12 |
| Step card | white, radius 20, padding 32, 1 px line border, no shadow. "STEP 0n" label, h3, body. 348 x 283 (first row), last card 532 x 228 |
| Plan card | two cards, radius 20, padding 40, 1 px border, 528 x 503. Cream card `#FBF9F4` with line border; featured card primary fill. Small label tab on the top edge. Check-icon list, button inside. No shadow |
| Work card | white, radius 20, 1 px line border, about 345 x 614 at 1280, no shadow |
| Final CTA card | primary fill, radius 28, padding 96 x 48, 1084 wide |
| Commitment band | primary fill, padding 96; pill tag with 1 px border at 40% white |
| FAQ item | full-width row, + / x icon, h3 22 px, padding 20 x 0, single-open accordion, first item open |
| Marquee | black strip, two rows in opposite directions (60 s linear loop, one reversed): bold sans row and italic serif row, star separators |
| Hero reel | 3 columns of tiles, 163 x 254 at 1280, radius 16, padding 14, scrolling vertically forever (columns 34 s, 41 s reversed, 48 s). Behind a photo card (radius 22, about 284 wide) that floats on a 7 s ease-in-out loop, with a primary pill caption and a black tooltip pill. D-09 keeps the 9:14 ratio |
| Footer | ink background, brand and tagline, two link columns (eyebrow headings at 60% white, links at 85%), copyright line |

No shadows anywhere on the reference.

### Motion (measured)
| Effect | Value |
|---|---|
| Entrance "rise" | 0.8 s, 22 px up, `cubic-bezier(0.22,1,0.36,1)`, delays 0 / .09 / .18 / .27 s |
| Hand-drawn underline "scribble" | 0.9 s, delay 0.75 s, `cubic-bezier(0.65,0,0.35,1)` |
| Dot glow | 2.4 s loop |
| Reel columns | 34 / 41 (reverse) / 48 s linear |
| Floating card | 7 s ease-in-out |
| Marquee | 60 s linear, one row reversed; each row pauses separately on hover (D-08) |
| Scroll reveal wrapper | 0.65 s `cubic-bezier(.22,1,.36,1)` |
| Nav and FAQ-row hover | colour to primary, 0.15 s |
| Focus ring | 2 px solid ink, offset 3 px |
| Cards (steps, plans) | no hover change |
| FAQ expand | duration not measurable on the reference; the site uses 0.3 s grid-rows ease |

## 5. Section order and mobile reflow

1. Header (sticky). 2. Hero (copy left, visual grid right). 3. Marquee. 4. Statement (two columns: headline, two paragraphs). 5. Work (three embedded videos with an outbound link each). 6. Deliverables (two-column checklist of 10). 7. Process (5 step cards). 8. Plans (2 cards). 9. Commitment band. 10. About / founder (quote, photo with caption, 2 buttons). 11. FAQ (7 items). 12. Final CTA card. 13. Footer.

Mobile: hero stacks (copy, then grid), checklist 1 column, steps 1 column, plans stack, work becomes a swipe row (scroll-snap x mandatory, tiles bleed to the screen edge, each embed 291 x 518, 950 px of content in a 375 px viewport).

## 6. Section heights at 1280 (reference, px)

header 73, hero + marquee 838, statement 522, work 1110, deliverables 750, process 1024, plans 961, band 355, about 925, faq 951, cta 759, footer 437.

The old comparison file also listed the Paper-era design against these, e.g. hero 713 vs 838, about 908 vs 925. That design is **STALE**, so those differences are not kept. The current comparison is `reference-analysis/screenshots/compare/` and `site/tests/legacy-scripts/cmp-sections.mjs`.

## 7. Behavior

### Navigation
- Logo (header and footer) goes to `#top`. Nav links go to `#work`, `#how`, `#packages`, `#about`, `#faq` with smooth scroll and URL hash update. The hero secondary button goes to `#work`.
- Landing offset: target section tops land 80 / 80 / 80 / 83 / 103 px below the viewport top against a 73 px header. `scroll-margin-top` is 0; the offset comes from section padding.
- An odd frame in the desktop recording (menu item hovered while the view still showed another section) was a smooth scroll in motion, not a bug.

### Buttons and links
- Every "book a call" button (7 placements: header desktop and mobile menu, hero, both plan cards, about, final CTA, footer) uses one external URL in a new tab. Build note: define it once as a constant.
- The three work links go to each item's own page in a new tab. LinkedIn, Instagram and YouTube links open in a new tab. The footer email is a `mailto:` in the same tab.

### Stateful controls
- Mobile menu: hamburger (`aria-expanded` false to true) opens a full-width panel under the header with 5 links and a button. The icon becomes an X. Tapping a link scrolls and closes the menu.
- FAQ: 7 buttons with `aria-expanded`, single-open, item 1 open at start.
- Scroll reveal: headings and sections fade in on entering the viewport. Must respect `prefers-reduced-motion`.

### Defects on the reference (not reproduced)
- Embedded cards show their own inner scrollbar and about 100 px of blank white at the bottom.
- Reveal animation leaves sections blank if the page is scrolled fast. The site skips the reveal entirely under reduced motion (`ARCHITECTURE.md` section 5); fast-scroll behavior is not separately checked.

## 8. Global checks the build must pass
No horizontal overflow at 375 / 444 / 768 / 1280; tap targets at least 44 px; visible keyboard focus; content visible under reduced motion. The specs in `site/tests/e2e/` cover the overflow, motion and reduced-motion parts (see `ARCHITECTURE.md` section 8).

## 9. Old plans that no longer apply
The old spec proposed React + Tailwind and a "failing check first" loop per section. The stack is now vanilla TypeScript + Tailwind v4 on Vite (D-01, D-02, D-03). Its evidence paths (`tools/`, `SSofdesktop/`, root `.mp4` files) moved in Step 1; the table in section 2 has the new paths.

## 10. Still unmeasured
Scroll-reveal timing beyond the wrapper duration; the FAQ expand animation; tablet (768) pixel diff section by section.
