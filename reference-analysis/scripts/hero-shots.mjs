import { chromium } from '../../dev-tools/browser.mjs';
import { mkdirSync } from 'fs'; mkdirSync('../screenshots/hero-shots', { recursive: true });
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
for (const [who, url] of [['ref', 'https://naveenrkcreates.com/'], ['ours', 'http://localhost:5173/']]) for (const [w, h] of [[640, 1000], [1280, 900]]) {
  const page = await (await browser.newContext({ viewport: { width: w, height: h } })).newPage();
  await page.goto(url, { waitUntil: 'networkidle' }); await page.waitForTimeout(3500);
  await page.screenshot({ path: `../screenshots/hero-shots/hero-${who}-${w}.png`, fullPage: false }); await page.close();
}
await browser.close();
