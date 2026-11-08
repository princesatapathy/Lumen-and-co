// Captures the reference site at 3 widths: full page + one shot per <section>/footer, after forcing scroll-reveals.
// Run: node capture.mjs   (outputs to ../screenshots/reference/<width>/)
import { chromium } from '../../dev-tools/browser.mjs';
import { mkdirSync } from 'fs';

const URL = 'https://naveenrkcreates.com/';
const WIDTHS = [{ w: 375, h: 812, mobile: true }, { w: 768, h: 1024 }, { w: 1280, h: 800 }];
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const report = {};

for (const { w, h, mobile } of WIDTHS) {
  const out = `../screenshots/reference/${w}`;
  mkdirSync(out, { recursive: true });
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: mobile ? 2 : 1, isMobile: !!mobile, hasTouch: !!mobile });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'networkidle' });
  // scroll slowly so every reveal-on-scroll fires, then return to top
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < total; y += Math.floor(h / 2)) { await page.evaluate(v => window.scrollTo(0, v), y); await page.waitForTimeout(250); }
  await page.waitForTimeout(1500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);

  report[w] = await page.evaluate(() => ({
    scrollW: document.documentElement.scrollWidth, clientW: document.documentElement.clientWidth,
    horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    totalHeight: document.documentElement.scrollHeight,
  }));
  await page.screenshot({ path: `${out}/00-full.png`, fullPage: true });
  const blocks = await page.$$('header, section, footer');
  let i = 1;
  for (const el of blocks) {
    const label = await el.evaluate(e => (e.id || e.tagName.toLowerCase()));
    await el.scrollIntoViewIfNeeded(); await page.waitForTimeout(400);
    await el.screenshot({ path: `${out}/${String(i).padStart(2, '0')}-${label}.png` }); i++;
  }
  await ctx.close();
}
await browser.close();
console.log(JSON.stringify(report, null, 1));
