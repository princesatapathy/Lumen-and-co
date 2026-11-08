// Manual-check probe: what each link/button does + computed design tokens + breakpoints.
// Run: node probe.mjs  -> prints JSON, writes ../screenshots/reference/interactions/*.png
import { chromium } from '../../dev-tools/browser.mjs';
import { mkdirSync } from 'fs';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const OUT = '../screenshots/reference/interactions';
mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const result = {};

// ---- 1. every link/button on desktop: label -> target + what happens on click
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  await page.goto('https://naveenrkcreates.com/', { waitUntil: 'networkidle' });
  result.controls = await page.evaluate(() =>
    [...document.querySelectorAll('a, button')].map(e => ({
      tag: e.tagName, text: (e.innerText || e.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 40),
      href: e.getAttribute('href'), target: e.getAttribute('target'), expanded: e.getAttribute('aria-expanded'),
      inHeader: !!e.closest('header'), inFooter: !!e.closest('footer'),
    })));

  // click each in-page anchor in the header and record where the section lands vs sticky header
  result.navClicks = [];
  for (const id of ['work', 'how', 'packages', 'about', 'faq']) {
    await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(300);
    await page.click(`header a[href$="#${id}"]:visible`);
    await page.waitForTimeout(1200);
    const r = await page.evaluate(i => {
      const s = document.getElementById(i); const hb = document.querySelector('header').getBoundingClientRect().height;
      return { id: i, sectionTopPx: Math.round(s.getBoundingClientRect().top), headerH: Math.round(hb), url: location.hash, scrollY: Math.round(scrollY),
               smooth: getComputedStyle(document.documentElement).scrollBehavior, scrollMarginTop: getComputedStyle(s).scrollMarginTop };
    }, id);
    result.navClicks.push(r);
    await page.screenshot({ path: `${OUT}/nav-${id}.png` });
  }

  // FAQ: does opening one close the others?
  await page.evaluate(() => document.getElementById('faq').scrollIntoView()); await page.waitForTimeout(500);
  const faqBtns = await page.$$('#faq button');
  const states = async () => page.$$eval('#faq button', bs => bs.map(b => b.getAttribute('aria-expanded')));
  result.faq = { count: faqBtns.length, initial: await states() };
  if (faqBtns[1]) { await faqBtns[1].click(); await page.waitForTimeout(500); result.faq.afterClick2nd = await states(); }
  await page.screenshot({ path: `${OUT}/faq-open.png` });

  // CTA buttons: where do they point
  result.ctaHrefs = await page.$$eval('a', as => as.filter(a => /book|call|linkedin|instagram|youtube|mail/i.test(a.innerText + a.href))
    .map(a => ({ text: a.innerText.trim().slice(0, 30), href: a.href, target: a.target })));
  await ctx.close();
}

// ---- 2. mobile menu behaviour
{
  const ctx = await browser.newContext({ viewport: { width: 375, height: 812 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  await page.goto('https://naveenrkcreates.com/', { waitUntil: 'networkidle' });
  const burger = page.locator('header button').first();
  result.mobileMenu = { burgerLabel: await burger.getAttribute('aria-label'), expandedBefore: await burger.getAttribute('aria-expanded') };
  await burger.tap(); await page.waitForTimeout(500);
  result.mobileMenu.expandedAfter = await burger.getAttribute('aria-expanded');
  await page.screenshot({ path: `${OUT}/mobile-menu-open.png` });
  await page.tap('#mobile-menu a[href$="#packages"]'); await page.waitForTimeout(1200);
  result.mobileMenu.afterLinkTap = await page.evaluate(() => ({ menuHidden: document.getElementById('mobile-menu').classList.contains('hidden'), packagesTop: Math.round(document.getElementById('packages').getBoundingClientRect().top) }));
  await page.screenshot({ path: `${OUT}/mobile-menu-after-tap.png` });
  // does the reels row scroll horizontally on mobile?
  result.mobileWorkRow = await page.evaluate(() => { const f = document.querySelector('#work iframe'); let p = f; while (p && p.scrollWidth <= p.clientWidth) p = p.parentElement; return p ? { cls: p.className.toString().slice(0, 80), scrollW: p.scrollWidth, clientW: p.clientWidth, snap: getComputedStyle(p).scrollSnapType } : null; });
  result.iframeSizes = await page.$$eval('#work iframe', fs => fs.map(f => `${f.clientWidth}x${f.clientHeight}`));
  await ctx.close();
}

// ---- 3. tokens + breakpoints (desktop)
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  await page.goto('https://naveenrkcreates.com/', { waitUntil: 'networkidle' });
  result.tokens = await page.evaluate(() => {
    const cs = (sel, props) => { const e = document.querySelector(sel); if (!e) return null; const s = getComputedStyle(e); return Object.fromEntries(props.map(p => [p, s[p]])); };
    const text = ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'color'];
    return {
      body: cs('body', [...text, 'backgroundColor']),
      h1: cs('h1', text), h2: cs('section h2', text), h3: cs('section h3', text), p: cs('section p', text),
      eyebrow: cs('#work span, #work p', text),
      headerBtn: cs('header a[href*="#contact"], header a:last-of-type', ['backgroundColor', 'color', 'borderRadius', 'paddingTop', 'paddingLeft', 'fontSize', 'fontWeight']),
      container: cs('#work > div', ['maxWidth', 'paddingLeft', 'paddingRight']),
      sectionPad: [...document.querySelectorAll('section')].map(s => ({ id: s.id, bg: getComputedStyle(s).backgroundColor, pt: getComputedStyle(s).paddingTop, pb: getComputedStyle(s).paddingBottom })),
      headerH: document.querySelector('header').getBoundingClientRect().height,
      stepCard: cs('#how div[class*="rounded"]', ['borderRadius', 'paddingTop', 'backgroundColor', 'borderColor', 'borderWidth']),
      priceCard: cs('#packages div[class*="rounded"]', ['borderRadius', 'paddingTop', 'backgroundColor', 'borderColor']),
    };
  });
  const css = await (await fetch('https://naveenrkcreates.com/assets/styles-CGPTG_Ee.css')).text();
  result.breakpoints = [...new Set(css.match(/@media[^{]+/g))];
  await ctx.close();
}

await browser.close();
console.log(JSON.stringify(result, null, 1));
