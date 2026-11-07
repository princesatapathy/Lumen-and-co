# Decisions

Each entry: what was decided, why, and what it costs. Status is **Accepted**, **Open** (needs the owner's answer) or **Superseded**.
Newest changes to a decision are noted inside the entry, not as new entries.

## Accepted

### D-01 Stack: TypeScript + Tailwind CSS v4 on Vite
- **Decided by:** owner ("the stack will be typescript and tailwindcss").
- **Why:** the owner's choice. Vite and `@tailwindcss/vite` give the shortest path from source to a built site.
- **Cost:** none noted.

### D-02 No UI framework: vanilla TypeScript, HTML built from template strings
- **Decided by:** me, within D-01; the owner did not name a framework.
- **Why:** the page is static apart from about 60 lines of behavior. A framework would add a runtime and, for React, a typings package from a community repo (see D-03).
- **Cost:** no component state model, and long class strings inside template literals (readable only if split into small builders). The page is blank until JS runs (D-05).

### D-03 Install only from official publishers
- **Decided by:** owner ("only downloads from the original websites, not unauthorized or second-party packages").
- **Why:** supply-chain safety.
- **Result:** four direct dependencies, all first-party: `vite` (vitejs), `typescript` (Microsoft), `tailwindcss` and `@tailwindcss/vite` (Tailwind Labs). Publisher checked on npm for each. React and `@types/react` were installed once and removed.
- **Cost:** their own sub-dependencies still come with them. That cannot be avoided. Fonts load from Google Fonts.

### D-04 Package manager: pnpm
- **Decided by:** owner. `packageManager` is pinned in `site/package.json`.

### D-05 Render in the browser, no prerendering (superseded by D-20)
- **Decided by:** me. Prerender was out of scope unless asked.
- **Why:** smallest working version.
- **Cost:** blank page until JS runs, weaker for search engines and link previews.
- **Status:** the owner asked for prerendering and SEO/AEO (D-20). Until Step 5 ships, the site still renders in the browser.

### D-06 Motion is pure CSS plus one IntersectionObserver
- **Decided by:** me, after the owner asked how motion graphics are done.
- **Why:** keyframes cover everything measured on the reference: entrance, loops, floating card, marquee, hover, accordion. Zero extra downloads.
- **Rule:** every animation is switched off for visitors who prefer reduced motion, and all content then stays visible.

### D-07 The live reference site is the main source of truth; copy and assets are our own
- **Decided by:** owner (reference videos and live site are "the main reference").
- **Why:** match behavior and layout without copying text, logo, photos or class names.
- **How it is applied:** I measure the reference (sizes, colours, motion timings) and use those numbers; I never paste its markup or text. The card uses a placeholder portrait.
- **Cost:** reference numbers drift over time. On 2026-11-07 the live palette and container differed from the earlier spec, so the site was updated to the live values.

### D-08 Marquee: six copies per row, pause on hover per row
- **Decided by:** me, from the owner's report that text ran out and from measuring the reference.
- **Why:** one copy of the text is about 1000-1500 px, shorter than a wide screen, so the old two-copy row left a blank strip. Six copies (3 per half, moved -50%) stays wider than any screen up to about 2900 px. The reference pauses each row separately.
- **Cost:** about 3x more DOM nodes in the marquee (still small). Speed is slightly faster than the reference at the same 60 s.

### D-09 Reel tiles keep a 9:14 aspect ratio and never shrink
- **Decided by:** me, from measuring the reference (height is always 1.56x width).
- **Why:** the earlier fixed-height tiles were squashed by the flex column at tablet widths, and that bug was inherited from the first design.

### D-10 Design tokens live in one place: the Tailwind `@theme` block
- **Decided by:** me.
- **Values (live reference, 2026-11-07):** paper `#F5F1E8`, card `#FBF9F4`, line `#E2DCCD`, ink `#111`, muted `#4A4640`, primary `#213F89`, primary-dim `#1A3270`.
- **Cost:** `design-source/tokens.css` and `tokens.json` are now duplicates and stale.

### D-11 Layout: 1084 px content container, fluid headings, 3 breakpoints
- **Decided by:** me, from measuring the reference at 11 widths.
- **Values:** gutter 20 px (<640), 32 px (640+), centred 1084 px content on desktop. h1 `min(19vw,104px)` / `12.5vw` / `min(9.6vw,144px)`. h2 `clamp(40px, 6.5vw, 64px)`. Hamburger below 1024 px.

### D-12 Design tools: Paper dropped, Figma by capture
- **Decided by:** forced and owner-approved: Paper's free limit was used up.
- **Result:** local HTML is pushed into Figma by a Playwright capture script.
- **Cost:** Figma frames and `design-export/` are stale compared with the site (D-10, D-11).

### D-13 Refactors must not change the page
- **Decided by:** me, proposed in the plan; applies once the owner approves it.
- **Why:** cleanup and redesign mixed together cannot be reviewed. Golden screenshots, heights and motion checks taken before the refactor must match exactly after it.

### D-14 Dead files are separated into `archive/`, not deleted
- **Decided by:** owner ("just separate them in a folder and I will think about it").
- **Applies to:** Paper-era files and scratch scripts, once the manifest classifies them.
- **Why:** nothing is lost while the owner decides. Deleting later is a one-line step.
- **Cost:** `archive/` stays in the repo until then. `git init` and the snapshot still happen first.

### D-15 Tests run on `@playwright/test`, as a dev-only dependency
- **Decided by:** owner ("I'm going through, although don't ship in products").
- **Why:** one command and real reports for the checks that are loose scripts today. Official Microsoft package, same publisher as the `playwright-core` already used (D-03).
- **Rules that keep it out of the product:**
  - It goes in `devDependencies` only.
  - Tests live in `site/tests/`, outside `site/src/`, so `vite build` never bundles them.
  - Nothing in `dist/` may mention it. The review step checks this.
  - Tests use the Chrome already installed on this machine, so no browser is downloaded.

### D-16 Reference videos live in `reference-analysis/`, outside git
- **Decided by:** owner ("yes" to keeping them there but out of git).
- **What:** the two `.mp4` files (about 100 MB) move to `reference-analysis/videos/` and a `.gitignore` rule excludes them.
- **Cost:** git will not back them up. They exist only on this machine, so keep your own copy elsewhere if you need one.

### D-17 After the cleanup, compare the sections below the hero against the reference
- **Decided by:** owner ("yes").
- **Why:** the hero, header and marquee were matched to the live reference. Process, plans and about were already known to be off by tens of pixels. Doing it on the cleaned code keeps the changes small and reviewable.
- **How:** same method as the hero: measure the reference at several widths, change our numbers to match, check by screenshot. Own copy only (D-07).

### D-18 `archive/` and the tests stay out of git and out of commits
- **Decided by:** owner ("keep them out of commit and git"), about the dead files (D-14) and the tests (D-15).
- **What:** `.gitignore` excludes `archive/`, `site/tests/` (including its golden screenshots) and `reference-analysis/videos/` (D-16) and the screenshots (D-21), besides the usual `node_modules/`, `dist/`, `*.log`.
- **Consequences, so they are not a surprise:**
  - Git cannot restore anything in those folders. The step 0 snapshot covers the site and the docs only.
  - Before step 1 moves anything, I make one local zip of the current `tools/` folder (about 0.7 MB without `node_modules`) and keep it inside `archive/`. That is the only undo for the dead scripts.
  - Tests exist only on this machine; a fresh clone has none. The golden baselines are also untracked.
  - The step 3 reviewer reads the test files directly instead of finding them in the git diff.

### D-19 Re-sync the Figma frames and the old design files with the site, last
- **Decided by:** owner ("yes").
- **Why last:** the design should copy the finished site, not a moving one. It runs after the lower-section comparison (D-17) and the SEO/prerender work (D-20).
- **How:** regenerate the design HTML from the site's final state and re-capture into Figma with the existing capture script.

### D-20 Prerender the site, and optimise it for SEO and AEO; the owner wants to learn how
- **Decided by:** owner ("yes, I need to learn how we can optimise for SEO and AEO").
- **Supersedes:** the "no prerendering" part of D-05.
- **What:** the learning material is `SEO-AEO-GUIDE.md`. The build work is Step 5 of the plan: build-time prerender, head tags, JSON-LD, `robots.txt`, `sitemap.xml`, performance pass, answer-shaped copy.
- **How prerender is done:** a small script of our own that renders the existing section builders into `dist/index.html`, with Vite (already installed) loading the TypeScript. No new dependency, which keeps D-03 intact. The browser then skips re-rendering and only attaches behavior.
- **Includes `llms.txt`:** the owner wants it anyway ("why not": it is a small file, costs almost nothing, and some tools may read it). It is generated at build time from the same copy file as the page, so it cannot go out of date. Expectation, stated honestly: no evidence yet that it changes rankings or citations, and Google says it is not needed. It is a cheap extra, not a lever.
- **Not promised:** rankings or citations.
- **Depends on:** D-22 (real business facts) and D-23 (bot policy).

### D-21 `screenshots/` is ignored by git
- **Decided by:** owner ("ignored").
- **What:** the 77 MB of reference, Figma, Paper and site screenshots (`screenshots/`, later `reference-analysis/screenshots/`) are added to `.gitignore`, like the videos (D-16).
- **Cost:** same as D-18: git cannot restore them. Most can be regenerated by the measuring scripts and the live reference; the Paper-era ones cannot.

### D-22 The site is for a real business: the owner's friend. The owner customises it, the friend reviews
- **Decided by:** owner ("a portfolio or landing page for my friend's business; I'm still thinking of customising more by myself and getting reviewed by him").
- **What changes:**
  - All placeholder facts (studio name, Lisbon, plans, FAQs, founder text) are replaced with the friend's real information. `CONTENT-INTAKE.md` lists everything needed.
  - Structured data and `llms.txt` use only real, visible facts (D-20).
  - Real photos and any testimonials must be the friend's own and used with permission. Never invented.
  - Reviews happen on a shareable preview link before anything goes live, so the friend sees the page rather than the code. Hosting is O-11.
- **Why it matters for the structure:** customising is cheap only if business facts live in one place. The target `content/` folder plus one brand block in `theme.css` (colours, fonts) are the only things the owner edits for a rebrand.
- **Risk to settle before launch (O-10):** the layout, palette and fonts currently copy the live reference, a real business. Fine as a learning base, but a live site for a different business should not look like a copy of it.

### D-23 AI search bots are allowed in, so the site can be cited
- **Decided by:** owner ("yes").
- **What:** `robots.txt` allows Googlebot, Bingbot, OAI-SearchBot, Claude-SearchBot and PerplexityBot (see the table in `SEO-AEO-GUIDE.md`, section 3E). The person-triggered fetchers (ChatGPT-User, Claude-User, Perplexity-User) are not blocked.
- **Why:** blocking a search bot removes the site from the answers that bot powers. Blocking only a training bot does not (O-09 covers those).
- **Cost:** the pages can be read and quoted by those services. For a public marketing page that is the goal. Check each bot's name on the vendor's own crawler page before writing the file.

## Open: waiting for the owner

| ID | Question | My recommendation |
|---|---|---|
| O-09 | Training bots (GPTBot, ClaudeBot, Google-Extended): allow or block? Blocking them does not remove the site from AI search (D-23) | The friend's call, since it is his content. Default if undecided: allow, matching the "findable" goal |
| O-10 | Brand identity for launch: does the friend have his own colours, fonts, logo and photos, or should we design them? Is his business in the same field as the reference? | Use his own identity, so the site stops looking like the reference. The palette is one block in `theme.css`, so swapping is cheap |
| O-11 | Where will it be hosted, what domain, and how does the friend preview it? | A static host with preview links (static output suits this site). Pick after Step 4 |
| O-12 | Who supplies the content in `CONTENT-INTAKE.md`, and by when? | The friend, filling the sheet once; the owner then edits `content/` |

## Superseded

- Single `design-export/responsive.html` as the source of truth for the page → replaced by the site (see D-07, D-10).
- Fixed per-breakpoint heading sizes and a 1180 px container → replaced by D-11.
