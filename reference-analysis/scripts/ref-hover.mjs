// Reference-site probe: which looping animations exist, do they pause on hover, and how wide is each loop's content vs viewport.
import { chromium } from '../../dev-tools/browser.mjs';
const [url, width = '1280'] = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const page = await (await browser.newContext({ viewport: { width: Number(width), height: 900 } })).newPage();
await page.goto(url, { waitUntil: 'networkidle' }); await page.waitForTimeout(2500);
const loops = await page.evaluate(() => document.getAnimations().filter(a => a.effect.getTiming().iterations === Infinity).map((a, i) => {
  const el = a.effect.target; const r = el.getBoundingClientRect();
  return { i, name: a.animationName, el: el.tagName + '.' + String(el.className).slice(0, 60), dur: a.effect.getTiming().duration, dir: a.effect.getTiming().direction, x: Math.round(r.left), w: Math.round(r.width), y: Math.round(r.top + scrollY), h: Math.round(r.height), kids: el.children.length, parentW: Math.round(el.parentElement.getBoundingClientRect().width) };
}));
console.log(JSON.stringify(loops, null, 1));
// hover each distinct loop target and report playState before/after
for (const l of loops) {
  const res = await page.evaluate(async (idx) => {
    const a = document.getAnimations().filter(x => x.effect.getTiming().iterations === Infinity)[idx]; const el = a.effect.target;
    el.scrollIntoView({ block: 'center' }); await new Promise(r => setTimeout(r, 400));
    const r = el.getBoundingClientRect(); return { cx: r.left + Math.min(r.width, innerWidth) / 2, cy: r.top + r.height / 2, state: a.playState };
  }, l.i);
  await page.mouse.move(Math.max(5, Math.min(res.cx, Number(width) - 5)), Math.max(5, Math.min(res.cy, 895))); await page.waitForTimeout(600);
  const after = await page.evaluate((idx) => { const a = document.getAnimations().filter(x => x.effect.getTiming().iterations === Infinity)[idx]; const t1 = a.currentTime; return { state: a.playState, t: t1 }; }, l.i);
  await page.waitForTimeout(700);
  const later = await page.evaluate((idx) => document.getAnimations().filter(x => x.effect.getTiming().iterations === Infinity)[idx].currentTime, l.i);
  console.log(l.i, l.name, 'before', res.state, 'hover', after.state, 'advanced during hover:', later !== after.t);
  await page.mouse.move(2, 2);
}
await browser.close();
