# Reference study: single-page agency site — phone + desktop resolutions

Status: **planning / design phase. No site code yet.**
Reference: `https://naveenrkcreates.com/` (studied for layout and behavior only).

> **Hard rule for the build:** do NOT copy the reference's text, logo, photos, class names or Instagram embeds.
> Use placeholder copy and your own assets. The numbers below are layout/behavior facts to reproduce; the palette is a reference to *derive your own from*, not to ship unchanged.

---

## 1. Evidence on disk (all inside `D:\Portfolio2`)

| What | Where | Notes |
|---|---|---|
| Desktop scroll recording | `20261106-0847-05.2400363.mp4` | 1920x862, 86 s |
| Phone scroll recording | `phoneresolutionssrecording.mp4` | 444x780, 140 s, real phone-width layout |
| Frames from desktop recording | `screenshots/t###s.jpg` | 1 frame / 4 s |
| Frames + contact sheets from phone recording | `screenshots/phone/p###s.jpg`, `sheet0-5.jpg` | 1 frame / 3 s |
| Playwright captures (reference) | `screenshots/reference/{375,768,1280}/` | `00-full.png` + one PNG per section |
| Interaction captures | `screenshots/reference/interactions/` | nav clicks, FAQ open, mobile menu open/after-tap |
| Your manual desktop shots | `SSofdesktop/` | untouched |
| Scripts | `tools/capture.mjs`, `tools/probe.mjs`, `tools/tokens2.mjs` | Playwright using installed Chrome (no browser download) |
| Raw probe data | `tools/probe-output.json` | every link, click result, token |

Re-run: `cd tools && node capture.mjs` (screenshots) / `node probe.mjs` (interactions + tokens).

---

## 2. Resolutions tested

| Width | Height | Kind | Total page height | Horizontal overflow |
|---|---|---|---|---|
| 375 | 812 (DPR 2, touch) | phone | 11 979 px | none |
| 444 | 780 | phone (your recording) | n/a | none seen |
| 768 | 1024 | tablet | 9 562 px | none |
| 1280 | 800 | desktop | 8 853 px | none |
| 1920 | 862 | wide desktop (recording) | n/a | none seen |

Breakpoints found in the CSS are the Tailwind defaults: `sm 640 / md 768 / lg 1024`, plus `hover:hover` and `prefers-reduced-motion` guards.
**Header switches from hamburger to full nav at 1024, not 768.**

---

## 3. Design spec (derived from computed styles)

### 3.1 Color (reference values — pick your own, keep the roles)
| Role | Reference | 
|---|---|
| Page / "paper" background | `#f5f1e8` |
| Card surface | `#fbf9f4` |
| Hairline border | `#e2dccd` |
| Ink (text, black sections, footer) | `#111111` |
| Muted text | `#4a4640` |
| Primary (buttons, accent words, blue band, featured card) | `#213f89` (hover `#1a3270`) |
| Alternate section bg | `#ffffff` |

Sections alternate **white / paper**; one full-bleed **primary** band; footer **ink**.

### 3.2 Type
| Role | Reference font | 375 | 768 | 1280 |
|---|---|---|---|---|
| Hero H1 | Bricolage Grotesque 800 | 71 / 64 lh, -5.3 ls | 96 / 86, -7.2 | 123 / 111, -9.2 (≈ lh 0.9, ls -0.075em) |
| Section H2 | same 800 | 40 / 40, -1.8 | 50 / 50, -2.2 | 64 / 64, -2.9 (ls ≈ -0.045em) |
| Card H3 | same 700 | 24 / 30, -0.7 | 28 / 35, -0.8 | 28 / 35, -0.8 |
| Body | Inter 400 | 17 / 27.6 | 17 / 27.6 | 17 / 27.6 |
| Eyebrow label | Inter 600, uppercase | 12 px, ls 0.14em, muted color | | |
| Accent word inside headings | italic serif (display italic), primary color | | | |

H1 and H2 scale fluidly (`clamp`) between the three widths — don't hard-switch.
Body text is the same 17 px at every width.

### 3.3 Spacing
- Section vertical padding: **80 px (mobile) → 112 px (md and up)**; primary band 96 px.
- Container: **max 1180 px**, side padding **20 / 32 / 48** at 375 / 768 / 1280.
- Header height: **65 px (mobile), 73 px (md+)**, sticky, blurred translucent paper background, bottom hairline.
- Grid gaps: steps 20 px, pricing 28 px, reel carousel 16 px.

### 3.4 Components
| Component | Spec |
|---|---|
| Primary button | pill, primary bg, white text, 16 px / 600, padding 14 x 28, height 54 |
| Secondary button | pill, transparent, 1 px ink border, same size |
| Eyebrow | small star glyph + number + uppercase label |
| Step card | `article`, white, **radius 20**, **padding 32**, light border, label "STEP 0n" + H3 + body, no shadow |
| Pricing card | two `article`s, **radius 20, padding 40**, 1 px border. Cream card `#fbf9f4` + border `#e2dccd`; primary card `#213f89` filled. Small "most picked" tab on its top edge; check-icon list; button inside (outline on cream, white on blue). No shadow |
| Work / embed card | white, **radius 20**, no shadow |
| Final CTA card | primary fill, **radius 28**, padding **96 x 48**, inside the 1180 container |
| Header glass | bg paper at 90% opacity, `backdrop-filter: blur(8px)`, 1 px bottom border `#e2dccd` |
| FAQ item | full-width row, + / x icon, **single-open accordion**, first item open by default |
| Marquee | black strip, two rows moving opposite directions (**60 s linear loop**, one `normal`, one `reverse`): bold sans row + italic serif row, star separators |
| Hero reel grid | 3 columns of tiles (**163 px wide, radius 16, padding 14, bg `#d8d1c2`**) scrolling vertically forever, one speed per column (**34 s / 41 s / 48 s linear**), behind a photo card (**radius 22, ~284 px wide**) that floats (**7 s ease-in-out**) with a primary pill caption; black tooltip pill on top |
| Motion tokens | entrance "rise" **0.8 s `cubic-bezier(0.22,1,0.36,1)`**; hand-drawn underline under the hero accent word "scribble" **0.9 s `cubic-bezier(0.65,0,0.35,1)`** |
| Embed carousel | see 4.3 |
| Footer | ink bg, brand + tagline, two link columns, copyright line |

### 3.5 Section order (use your own names/copy)
1. Header (sticky) → 2. Hero (copy left, visual grid right) → 3. Marquee → 4. Statement (2-col: headline / two paragraphs) → 5. Work (3 embedded videos + outbound link each) → 6. Deliverables (2-col checklist of 10) → 7. Process (5 step cards) → 8. Plans (2 cards) → 9. Commitment band (primary bg) → 10. About / founder (quote, photo with caption, 2 buttons) → 11. FAQ (7 items) → 12. Final CTA card (primary, rounded) → 13. Footer.

Mobile reflow: hero stacks (copy then grid), checklist becomes 1 col, steps 1 col, plans stack, work becomes swipe row.

---

## 4. Manual interaction check (what pushes what)

All verified with Playwright clicks, not just read from markup.

### 4.1 Nav and anchors
| Control | Result |
|---|---|
| Logo (header + footer) | `/#top` |
| Our work / How it works / Packages / About / FAQ (header, mobile menu, footer) | `/#work /#how /#packages /#about /#faq` — smooth scroll (`scroll-behavior: smooth`), URL hash updates |
| Landing offset | target section top lands at **80 / 80 / 80 / 83 / 103 px** below viewport top vs 73 px header — headings are not hidden. `scroll-margin-top` is 0, so offset comes from section padding. |
| Hero "See our work" | `#work` |
| **Conclusion on the odd frame in the desktop recording** | "How it works" hovered while view showed "Our work" = smooth scroll still in motion. **Not a bug.** |

### 4.2 Buttons and links
| Control | Goes to | Opens in |
|---|---|---|
| Every "Book a call" / "Book a free call" — 7 placements: header (desktop + mobile menu copy), hero, plan card x2, about, final CTA, footer | one external booking URL (same for all) | new tab |
| 3 "Watch on Instagram" links | each reel's own page | new tab |
| "Connect on LinkedIn" + footer LinkedIn | one profile URL | new tab |
| Footer Instagram / YouTube | channel pages | new tab |
| Footer email | `mailto:` | same tab |

Build note: define the booking URL **once** (single constant) and reuse it.

### 4.3 Stateful controls
- **Mobile menu:** hamburger (`aria-label="Open menu"`, `aria-expanded` false→true) opens a full-width panel under the header with 5 links + button; icon becomes X. **Tapping a link scrolls and closes the menu** (menu hidden, section top at 85 px).
- **FAQ accordion:** 7 buttons with `aria-expanded`. Opening item 2 closes item 1 → single-open. Item 1 starts open.
- **Work row on mobile:** horizontal scroller, scroll-snap `x mandatory`, items bleed to screen edge (`-mx-5` pattern), each embed **291 x 518**, content 950 px wide inside 375 px viewport. On desktop it is a 3-col grid.
- **Scroll reveals:** headings/sections fade in on entering the viewport (caught half-faded in recording at 52 s). Respect `prefers-reduced-motion`.

### 4.4 Defects seen in the reference (don't reproduce)
- Embed cards show their own inner scrollbar and ~100 px blank white at the bottom (iframe taller than content). If you embed video, size the frame to the content or self-host a poster + link.
- Reveal animation leaves sections blank if the page is scrolled fast (my first screenshots). Add a no-JS / reduced-motion fallback that shows content.

---

## 5. Build plan (TDD + fail-fast)

**Stack:** React + Tailwind (matches what the reference uses). Vite. Playwright for checks.

**Loop per section** — build one, then run the check, fix only the listed differences:
1. Write the section's **failing check first** (Playwright): e.g. header height 73 at 1280, hamburger visible < 1024, nav link scrolls to target, FAQ single-open.
2. Build the section with placeholder text/assets.
3. Screenshot at **375 / 768 / 1280**, compare against `screenshots/reference/<w>/NN-*.png`.
4. Write the differences as exact numbers ("card gap is 28 px not 20 px") and fix only those.
5. Fail fast: stop at the first failing check; don't start the next section until green.

**Order:** tokens (Tailwind theme) → header + mobile menu → hero → marquee → statement → work → deliverables → process → plans → band → about → FAQ → final CTA → footer.

**Global checks (run every section):** no horizontal overflow at 375/444/768/1280; tap targets >= 44 px; keyboard focus visible; reduced-motion shows content.

---

## 6. Known gaps / not verified
- Radii, padding, shadows (none anywhere), marquee and hero-motion timings are now measured (section 3.4). Still unmeasured: scroll-reveal timing and the FAQ expand animation.
- Tablet (768) pixel-diff not reviewed section by section yet; files are captured and ready.
- Reference photos, logo and embeds are the owner's content — replace all of them.
