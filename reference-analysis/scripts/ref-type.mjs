import { chromium } from '../../dev-tools/browser.mjs';
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
for (const w of [375, 520, 640, 768, 940, 1023, 1024, 1180, 1280, 1440, 1920]) {
  const page = await (await browser.newContext({ viewport: { width: w, height: 900 } })).newPage();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('https://naveenrkcreates.com/', { waitUntil: 'networkidle' }); await page.waitForTimeout(400);
  const r = await page.evaluate(() => { const h1 = document.querySelector('h1'); const h2 = document.querySelector('h2'); const f = (e) => { const c = getComputedStyle(e), b = e.getBoundingClientRect(); return `${c.fontSize}/${c.lineHeight} ls${c.letterSpacing} w${Math.round(b.width)}`; }; const sub = h1.nextElementSibling; const hero = h1.closest('section'); const reel = document.querySelector('.feed-track').parentElement.parentElement; const hb = hero.getBoundingClientRect(), rb = reel.getBoundingClientRect(); return { h1: f(h1), h2: f(h2), sub: f(sub), hero: Math.round(hb.height), reel: `${Math.round(rb.left)}+${Math.round(rb.width)}x${Math.round(rb.height)}`, cols: [...document.querySelectorAll('.feed-track')].filter(t => t.getBoundingClientRect().left >= 0 && t.getBoundingClientRect().width > 0 && getComputedStyle(t.parentElement.parentElement).display !== 'none' && getComputedStyle(t.parentElement).display !== 'none').length }; });
  console.log(w, JSON.stringify(r)); await page.close();
}
await browser.close();
