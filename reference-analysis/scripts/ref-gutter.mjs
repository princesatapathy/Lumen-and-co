import { chromium } from '../../dev-tools/browser.mjs';
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
for (const [who, url, label] of [['ref', 'https://naveenrkcreates.com/', '^our take'], ['ours', 'http://localhost:5173/', '^our view']]) {
  for (const w of [768, 1024, 1180, 1280, 1440, 1920]) {
    const page = await (await browser.newContext({ viewport: { width: w, height: 900 } })).newPage();
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(url, { waitUntil: 'networkidle' }); await page.waitForTimeout(500);
    const r = await page.evaluate((src) => {
      const re = new RegExp(src, 'i'); const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let node, el;
      while ((node = walker.nextNode())) if (re.test(node.textContent.trim())) { el = node.parentElement; break; }
      const sec = el.closest('section'); const h1 = document.querySelector('h1');
      return { eyebrowX: Math.round(el.getBoundingClientRect().left) - (el.previousElementSibling ? 0 : 0), h1X: Math.round(h1.getBoundingClientRect().left), docW: document.documentElement.clientWidth };
    }, label);
    console.log(who, w, JSON.stringify(r)); await page.close();
  }
}
await browser.close();
