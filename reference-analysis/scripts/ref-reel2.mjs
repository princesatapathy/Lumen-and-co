// Hero reel geometry at many widths. node ref-reel2.mjs <ref|ours> [widths]
import { chromium } from '../../dev-tools/browser.mjs';
const [who, widthsArg = '375,640,768,940,1024,1280,1440,1920'] = process.argv.slice(2);
const url = who === 'ref' ? 'https://naveenrkcreates.com/' : 'http://localhost:5173/';
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
for (const width of widthsArg.split(',').map(Number)) {
  const page = await (await browser.newContext({ viewport: { width, height: 900 } })).newPage();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(url, { waitUntil: 'networkidle' }); await page.waitForTimeout(700);
  const r = await page.evaluate((who) => {
    const R = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return [Math.round(b.left), Math.round(b.top + scrollY), Math.round(b.width), Math.round(b.height)].join(','); };
    const tracks = [...document.querySelectorAll(who === 'ref' ? '.feed-track' : '[class*="animate-feed"]')];
    const tile = tracks[0].children[0]; const card = document.querySelector(who === 'ref' ? '.feed-card' : '.animate-float'); const reel = tracks[0].parentElement;
    const hero = reel.closest('section'); const cs = (e, p) => getComputedStyle(e)[p];
    const title = tile.querySelector('p, div[class*="font-display"]'); const chips = [...tile.querySelectorAll('p, div')].filter(e => /Scrolled past|Passed by/.test(e.textContent) && !e.children.length);
    return { hero: R(hero), reel: R(reel), tracks: tracks.map(t => Math.round(t.getBoundingClientRect().left) + ':' + Math.round(t.getBoundingClientRect().top + scrollY - reel.getBoundingClientRect().top - scrollY)), tile: R(tile), gap: tracks[0].children.length > 1 ? Math.round(tracks[0].children[1].getBoundingClientRect().top - tile.getBoundingClientRect().bottom) : null, tilePad: cs(tile, 'padding'), titleFont: title && `${cs(title, 'fontSize')}/${cs(title, 'lineHeight')} ${cs(title, 'fontWeight')}`, chip: chips[0] && `${cs(chips[0], 'fontSize')} ${R(chips[0])}`, card: R(card), cardRot: card && cs(card, 'transform') };
  }, who);
  console.log(width, JSON.stringify(r));
  await page.close();
}
await browser.close();
