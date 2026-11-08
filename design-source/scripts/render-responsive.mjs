// Renders ../responsive.html at 375/768/1280, reports horizontal overflow, saves full-page PNGs to ../responsive-<w>.png
import { chromium } from '../../dev-tools/browser.mjs';
const widths = process.argv.slice(2).map(Number);
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
for (const w of widths.length ? widths : [375, 768, 1280]) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 } });
  if (process.env.MOTION !== 'on') await page.emulateMedia({ reducedMotion: 'reduce' }); // static, fully visible (animations off, reveals shown)
  const file = process.env.FILE || 'responsive';
  await page.goto(`file:///D:/Portfolio2/design-source/${file}.html`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(600);
  const m = await page.evaluate(() => ({ scrollW: document.documentElement.scrollWidth, h: document.documentElement.scrollHeight }));
  await page.screenshot({ path: `../${file}-${w}.png`, fullPage: true });
  console.log(w, JSON.stringify(m), m.scrollW > w ? 'OVERFLOW' : 'ok');
  await page.close();
}
await browser.close();
