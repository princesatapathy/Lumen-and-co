import { chromium } from '../../dev-tools/browser.mjs';
const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
await p.goto('https://naveenrkcreates.com/', { waitUntil: 'domcontentloaded', timeout: 60000 }); await p.waitForTimeout(2500);
console.log(await p.evaluate(() => { const a = [...document.querySelectorAll('a')].find(x => /Book a call/.test(x.textContent)); const cs = getComputedStyle(document.documentElement); const em = document.querySelector('h1 em'); return { btn: getComputedStyle(a).backgroundColor, em: getComputedStyle(em).color, vars: ['--color-primary', '--color-ink', '--color-paper', '--color-muted'].map(v => v + '=' + cs.getPropertyValue(v)).join(' '), body: getComputedStyle(document.body).backgroundColor }; }));
await b.close();
