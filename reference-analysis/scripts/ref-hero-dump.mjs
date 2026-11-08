// Dumps hero geometry (relative to hero) for the reference or ours: every element that holds text/svg or is absolutely positioned.
import { chromium } from '../../dev-tools/browser.mjs';
const [who, widthsArg = '375,768,1280'] = process.argv.slice(2);
const url = who === 'ref' ? 'https://naveenrkcreates.com/' : 'http://localhost:5173/';
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
for (const width of widthsArg.split(',').map(Number)) {
  const page = await (await browser.newContext({ viewport: { width, height: 900 } })).newPage();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(url, { waitUntil: 'networkidle' }); await page.waitForTimeout(800);
  const out = await page.evaluate(() => {
    const hero = document.querySelector('main section, #top') || document.querySelector('section'); const h = hero.getBoundingClientRect();
    const rows = [];
    for (const e of hero.querySelectorAll('*')) {
      if (e.closest('[class*="feed-track"], [class*="animate-feed"]')) continue; // tiles measured separately
      const cs = getComputedStyle(e); const own = [...e.childNodes].filter(n => n.nodeType === 3 && n.textContent.trim()).map(n => n.textContent.trim()).join(' ').slice(0, 22);
      if (!(own || e.tagName === 'svg' && !e.closest('svg:not(:scope)') || cs.position === 'absolute' || /^(H1|BUTTON|A)$/.test(e.tagName))) continue;
      const r = e.getBoundingClientRect(); if (r.width < 6) continue;
      rows.push(`${e.tagName.toLowerCase()} "${own}" ${Math.round(r.left - h.left)},${Math.round(r.top - h.top)} ${Math.round(r.width)}x${Math.round(r.height)} ${cs.position === 'absolute' ? 'abs' : ''} fs${cs.fontSize}`);
    }
    return { heroH: Math.round(h.height), rows };
  });
  console.log(`== ${width}  hero h ${out.heroH}`); console.log(out.rows.join('\n'));
  await page.close();
}
await browser.close();
