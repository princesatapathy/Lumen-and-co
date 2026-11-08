import { chromium } from '../../dev-tools/browser.mjs';
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
for (const [who, url] of [['ref', 'https://naveenrkcreates.com/'], ['ours', 'http://localhost:5173/']]) for (const w of [375, 768, 1280, 1920]) {
  const page = await (await browser.newContext({ viewport: { width: w, height: 900 } })).newPage();
  await page.emulateMedia({ reducedMotion: 'no-preference' }); await page.goto(url, { waitUntil: 'networkidle' }); await page.waitForTimeout(400);
  const r = await page.evaluate((who) => {
    const tracks = [...document.querySelectorAll(who === 'ref' ? '.marquee-track' : 'section[aria-label="What we do"] > div > div')];
    const sec = tracks[0].closest('section') || tracks[0].parentElement.parentElement; const cs = (e, p) => getComputedStyle(e)[p]; const sb = sec.getBoundingClientRect();
    const first = tracks.map(t => { const item = t.querySelector('li, span') ; const span = [...t.querySelectorAll('li,span')].find(x => x.textContent.trim().length > 3 && !x.children.length) || item; const wk=document.createTreeWalker(t,NodeFilter.SHOW_TEXT);let n,s;while((n=wk.nextNode())){if(/[a-z]{4}/i.test(n.textContent)){s=n.parentElement;break}} const b = t.getBoundingClientRect(); return { trackH: Math.round(b.height), trackW: Math.round(b.width), font: cs(s, 'fontFamily').split(',')[0] + ' ' + cs(s, 'fontSize') + ' w' + cs(s, 'fontWeight') + ' ls' + cs(s, 'letterSpacing') + ' style' + cs(s, 'fontStyle'), text: s.textContent.trim().slice(0, 14) }; });
    return { secH: Math.round(sb.height), secPad: cs(sec, 'padding'), gap: cs(sec, 'rowGap'), bg: cs(sec, 'backgroundColor'), first };
  }, who);
  console.log(who, w, JSON.stringify(r)); await page.close();
}
await browser.close();
