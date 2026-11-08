// Measures hover/focus style diffs, running CSS animations, scroll-reveal and FAQ expand on a live site (analysis only).
// node measure-interactions.mjs <url> <out.json> [width=1280]
import { chromium } from '../../dev-tools/browser.mjs';
import { writeFileSync } from 'fs';

const [url, outFile, width = '1280'] = process.argv.slice(2);
if (!url || !outFile) throw new Error('usage: node measure-interactions.mjs <url> <out.json> [width]');
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const page = await (await browser.newContext({ viewport: { width: Number(width), height: 900 } })).newPage();
await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForTimeout(3000);

const PROPS = ['color', 'backgroundColor', 'borderTopColor', 'boxShadow', 'transform', 'opacity', 'textDecorationLine', 'filter', 'translate', 'scale'];
const snap = (el) => el.evaluate((node, props) => { const cs = getComputedStyle(node); const o = {}; for (const p of props) o[p] = cs[p]; o.transition = cs.transitionProperty + ' ' + cs.transitionDuration + ' ' + cs.transitionTimingFunction; o.cursor = cs.cursor; return o; }, PROPS);
const diff = (a, b) => Object.fromEntries(Object.keys(a).filter(k => k !== 'transition' && k !== 'cursor' && a[k] !== b[k]).map(k => [k, `${a[k]} -> ${b[k]}`]));

const targets = [
  ['primary button (header)', page.locator('header a, header button').filter({ hasText: /book/i }).first()],
  ['primary button (hero)', page.locator('main a, section a').filter({ hasText: /^Book a call/ }).first()],
  ['secondary button (See our work)', page.getByText('See our work').first()],
  ['nav link (Our work)', page.locator('header nav a').first()],
  ['watch link', page.getByText(/Watch on Instagram/).first()],
  ['view profile chip', page.getByText('View profile').first()],
  ['step card', page.locator('article').first()],
  ['plan card (featured)', page.locator('article').nth(5)],
  ['footer link', page.locator('footer a').first()],
  ['faq row', page.locator('button[aria-expanded]').nth(1)],
];
const hover = {};
for (const [name, loc] of targets) {
  try {
    await loc.scrollIntoViewIfNeeded({ timeout: 3000 });
    await page.waitForTimeout(700);
    const before = await snap(loc);
    await loc.hover({ timeout: 3000 });
    await page.waitForTimeout(700);
    const after = await snap(loc);
    hover[name] = { changed: diff(before, after), transition: before.transition, cursor: after.cursor };
  } catch (e) { hover[name] = { error: String(e.message).split('\n')[0] }; }
}

// keyboard focus: first 6 tab stops, outline/ring
await page.evaluate(() => window.scrollTo(0, 0));
await page.mouse.move(5, 5);
const focus = [];
for (let i = 0; i < 6; i++) {
  await page.keyboard.press('Tab');
  focus.push(await page.evaluate(() => { const e = document.activeElement; const cs = getComputedStyle(e); return { el: (e.textContent || '').trim().slice(0, 24), outline: cs.outline, outlineOffset: cs.outlineOffset, boxShadow: cs.boxShadow }; }));
}

// running animations on the hero (loops): duration, easing, iterations, direction, keyframes
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(500);
const animations = await page.evaluate(() => document.getAnimations().slice(0, 40).map(a => {
  const t = a.effect && a.effect.getTiming ? a.effect.getTiming() : {};
  const el = a.effect && a.effect.target;
  const kf = a.effect && a.effect.getKeyframes ? a.effect.getKeyframes().map(k => { const { offset, easing, composite, computedOffset, ...rest } = k; return { offset, ...rest }; }).slice(0, 3) : [];
  return { target: el ? (el.tagName + '.' + String(el.className).slice(0, 50)) : '?', name: a.animationName || a.transitionProperty || '', duration: t.duration, easing: t.easing, iterations: t.iterations, direction: t.direction, delay: t.delay, kf };
}));

// scroll reveal: pick a heading below the fold, record its state before/after it enters the viewport
const reveal = await page.evaluate(async () => {
  const h = [...document.querySelectorAll('h2')].find(e => e.getBoundingClientRect().top > innerHeight + 300);
  if (!h) return { error: 'no h2 below fold' };
  const state = () => { const cs = getComputedStyle(h); let n = h, chain = []; for (let i = 0; i < 3 && n; i++, n = n.parentElement) { const c = getComputedStyle(n); chain.push({ tag: n.tagName, opacity: c.opacity, transform: c.transform, transition: c.transitionProperty + ' ' + c.transitionDuration + ' ' + c.transitionTimingFunction }); } return chain; };
  const before = state();
  h.scrollIntoView({ block: 'center' });
  await new Promise(r => setTimeout(r, 100));
  const mid = state();
  await new Promise(r => setTimeout(r, 1500));
  return { text: h.textContent.slice(0, 30), before, mid, after: state() };
});

// FAQ expand: click closed row, sample panel height over time
const faq = await page.evaluate(async () => {
  const btns = [...document.querySelectorAll('button[aria-expanded]')];
  const b = btns.find(x => x.getAttribute('aria-expanded') === 'false');
  if (!b) return { error: 'no closed faq button' };
  b.scrollIntoView({ block: 'center' });
  await new Promise(r => setTimeout(r, 400));
  const panel = () => { const id = b.getAttribute('aria-controls'); const p = id && document.getElementById(id) || b.nextElementSibling; return p ? { h: Math.round(p.getBoundingClientRect().height), op: getComputedStyle(p).opacity, tr: getComputedStyle(p).transitionProperty + ' ' + getComputedStyle(p).transitionDuration + ' ' + getComputedStyle(p).transitionTimingFunction } : null; };
  const t0 = performance.now(); const samples = [{ t: 0, ...panel() }];
  b.click();
  for (let i = 0; i < 8; i++) { await new Promise(r => setTimeout(r, 60)); samples.push({ t: Math.round(performance.now() - t0), ...panel() }); }
  return { samples, icon: b.querySelector('svg, span') ? getComputedStyle(b.querySelector('svg, span')).transform : null };
});

const result = { url, width: Number(width), hover, focus, animations, reveal, faq };
writeFileSync(outFile, JSON.stringify(result, null, 1));
console.log(JSON.stringify({ hover, focus, animations: animations.map(a => `${a.target} ${a.name} ${a.duration}ms ${a.easing} x${a.iterations} ${a.direction}`) }, null, 1));
console.log('reveal', JSON.stringify(reveal)); console.log('faq', JSON.stringify(faq));
await browser.close();
