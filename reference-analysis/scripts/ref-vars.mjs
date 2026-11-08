import { chromium } from '../../dev-tools/browser.mjs';
const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
await p.goto('https://naveenrkcreates.com/', { waitUntil: 'domcontentloaded', timeout: 60000 }); await p.waitForTimeout(2500);
console.log(await p.evaluate(() => { const out = {}; for (const s of document.styleSheets) { let rules; try { rules = s.cssRules; } catch { continue; } const walk = (rs) => { for (const r of rs) { if (r.cssRules && !r.selectorText) walk(r.cssRules); if (r.selectorText && /^(:root|:host|html)/.test(r.selectorText)) for (const n of r.style) if (/^--(color|font|radius|tracking)/.test(n)) out[n] = r.style.getPropertyValue(n).trim(); } }; walk(rules); } return JSON.stringify(out, null, 1); }));
await b.close();
