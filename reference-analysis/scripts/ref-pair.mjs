// Does hovering one reference marquee row pause the other too?
import { chromium } from '../../dev-tools/browser.mjs';
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
await page.goto('https://naveenrkcreates.com/', { waitUntil: 'networkidle' }); await page.waitForTimeout(1500);
const rows = await page.evaluate(() => { const t = [...document.querySelectorAll('.marquee-track')]; t[0].scrollIntoView({ block: 'center' }); return t.map(e => { const r = e.getBoundingClientRect(); return { y: r.top + r.height / 2 }; }); });
await page.waitForTimeout(500);
const rowsNow = await page.evaluate(() => [...document.querySelectorAll('.marquee-track')].map(e => { const r = e.getBoundingClientRect(); return r.top + r.height / 2; }));
await page.mouse.move(640, rowsNow[0]); await page.waitForTimeout(500);
console.log('hover row 1 ->', await page.evaluate(() => [...document.querySelectorAll('.marquee-track')].map(e => e.getAnimations()[0]?.playState)));
await page.mouse.move(2, 2); await page.waitForTimeout(300);
await page.mouse.move(640, rowsNow[1]); await page.waitForTimeout(500);
console.log('hover row 2 ->', await page.evaluate(() => [...document.querySelectorAll('.marquee-track')].map(e => e.getAnimations()[0]?.playState)));
console.log('track css', await page.evaluate(() => { const e = document.querySelector('.marquee-track'); return [...document.styleSheets].flatMap(s => { try { return [...s.cssRules]; } catch { return []; } }).map(r => r.cssText).filter(t => /marquee/.test(t)).slice(0, 6); }));
await browser.close();
