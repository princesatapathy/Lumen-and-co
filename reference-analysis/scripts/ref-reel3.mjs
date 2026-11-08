import { chromium } from '../../dev-tools/browser.mjs';
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const rows = [];
for (const [w, h] of [[1280,700],[1280,800],[1280,900],[1280,1080],[1024,768],[1024,900],[1440,900],[768,1024],[375,812],[375,667]]) {
  const page = await (await browser.newContext({ viewport: { width: w, height: h } })).newPage();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('https://naveenrkcreates.com/', { waitUntil: 'networkidle' }); await page.waitForTimeout(500);
  const r = await page.evaluate(() => { const t = document.querySelector('.feed-track'); const p = t.parentElement; const hero = t.closest('section'); const b = (e) => { const r = e.getBoundingClientRect(); return `${Math.round(r.left)},${Math.round(r.top + scrollY)} ${Math.round(r.width)}x${Math.round(r.height)}`; }; const cs = getComputedStyle(hero); return { hero: b(hero), minH: cs.minHeight, h: cs.height, pad: cs.padding, reelBox: b(p), reelClass: p.className.slice(0, 120), heroClass: hero.className.slice(0, 160), cols: document.querySelectorAll('.feed-track').length }; });
  console.log(w, h, JSON.stringify(r)); await page.close();
}
const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
await page.goto('https://naveenrkcreates.com/', { waitUntil: 'networkidle' });
console.log(await page.evaluate(() => [...document.styleSheets].flatMap(s => { try { return [...s.cssRules]; } catch { return []; } }).map(r => r.cssText).filter(t => /@keyframes (feed-card|feed)\b/.test(t))));
console.log(await page.evaluate(() => { const c = document.querySelector('.feed-card'); return { html: c.outerHTML.slice(0, 900) }; }));
console.log(await page.evaluate(() => { const t = document.querySelector('.feed-track'); return t.children[0].outerHTML.slice(0, 700); }));
console.log(await page.evaluate(() => { const t = document.querySelector('.feed-track'); return t.parentElement.outerHTML.replace(/<div class="feed-track[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g, '[track]').slice(0, 1800); }));
await browser.close();
