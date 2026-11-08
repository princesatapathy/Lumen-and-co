// Measures hero reel + header CTA on a site at several widths. node ref-reel.mjs <url> [widths]
import { chromium } from '../../dev-tools/browser.mjs';
const [url, widthsArg = '375,520,640,768,940,1024'] = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
for (const width of widthsArg.split(',').map(Number)) {
  const page = await (await browser.newContext({ viewport: { width, height: 800 } })).newPage();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(url, { waitUntil: 'networkidle' }); await page.waitForTimeout(800);
  const r = await page.evaluate(() => {
    const f = (e) => e ? { w: Math.round(e.getBoundingClientRect().width), h: Math.round(e.getBoundingClientRect().height) } : null;
    const track = document.querySelector('.feed-track') || document.querySelector('[class*="animate-feed"]');
    const tile = track && track.children[0]; const reel = track && track.parentElement.parentElement;
    const hdrBtn = [...document.querySelectorAll('header a, header button')].filter(e => /book/i.test(e.textContent)).map(e => ({ text: e.textContent.trim().slice(0, 20), vis: getComputedStyle(e).display !== 'none' && e.getBoundingClientRect().width > 0 }));
    const cs = tile && getComputedStyle(tile);
    return { reel: f(reel), tile: f(tile), tileBg: cs && cs.backgroundImage.slice(0, 70) + ' | ' + cs.backgroundColor, tileText: tile && tile.textContent.trim().slice(0, 40), hdrBtn, kids: tile && [...tile.children].map(c => c.tagName + ':' + (c.textContent || '').trim().slice(0, 18)) };
  });
  console.log(width, JSON.stringify(r));
  await page.close();
}
await browser.close();
