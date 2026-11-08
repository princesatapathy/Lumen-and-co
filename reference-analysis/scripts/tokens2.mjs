import { chromium } from '../../dev-tools/browser.mjs';
const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const out = {};
for (const w of [375, 768, 1280]) {
  const p = await (await b.newContext({ viewport: { width: w, height: 800 } })).newPage();
  await p.goto('https://naveenrkcreates.com/', { waitUntil: 'networkidle' });
  out[w] = await p.evaluate(() => {
    const g = (sel, props) => { const e = document.querySelector(sel); if (!e) return null; const s = getComputedStyle(e); return Object.fromEntries(props.map(k => [k, s[k]])); };
    const px = ['fontSize', 'lineHeight', 'letterSpacing'];
    const btnP = [...document.querySelectorAll('a')].find(a => a.innerText.includes('Book a call') && !a.closest('header'));
    const btnS = [...document.querySelectorAll('a')].find(a => a.innerText.includes('See our work'));
    const sty = e => { const s = getComputedStyle(e); return { bg: s.backgroundColor, color: s.color, radius: s.borderRadius, padY: s.paddingTop, padX: s.paddingLeft, fontSize: s.fontSize, weight: s.fontWeight, border: s.border, h: e.getBoundingClientRect().height }; };
    const card = s => { const e = document.querySelector(s); if (!e) return null; const c = getComputedStyle(e); return { radius: c.borderRadius, pad: c.padding, bg: c.backgroundColor, border: c.border, w: e.getBoundingClientRect().width }; };
    const stepGrid = document.querySelector('#how .grid, #how ol, #how ul');
    return {
      h1: g('h1', px), h2: g('#faq h2', px), h3: g('#how h3', px), body: g('#about p', px),
      headerH: document.querySelector('header').getBoundingClientRect().height,
      container: g('#work > div', ['maxWidth', 'paddingLeft']),
      btnPrimary: btnP && sty(btnP), btnSecondary: btnS && sty(btnS),
      stepCard: card('#how li, #how .grid > div'), priceCard: card('#packages .grid > div'),
      stepGrid: stepGrid && { cols: getComputedStyle(stepGrid).gridTemplateColumns, gap: getComputedStyle(stepGrid).gap },
      pricingGrid: (() => { const e = document.querySelector('#packages .grid'); return e && { cols: getComputedStyle(e).gridTemplateColumns, gap: getComputedStyle(e).gap }; })(),
      workGap: (() => { const f = document.querySelector('#work iframe'); return f && getComputedStyle(f.parentElement.parentElement).gap; })(),
      sectionPadY: getComputedStyle(document.querySelector('#how')).paddingTop,
      headerNavVisible: getComputedStyle(document.querySelector('header nav')).display,
    };
  });
}
await b.close();
console.log(JSON.stringify(out, null, 1));
