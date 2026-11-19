// Samples a live site over time (no video): hero timeline loop, slow scroll pass, interactions. Reference/analysis only.
// Needs: node range-server.mjs (serves screenshots for contact sheets).  node site-timeline.mjs <url> <outRoot> [widths=375,768,1280]
import { chromium } from '../../dev-tools/browser.mjs';
import { mkdirSync } from 'fs';

const [url, outRoot, widthsArg = '375,768,1280'] = process.argv.slice(2);
if (!url || !outRoot) throw new Error('usage: node site-timeline.mjs <url> <outRoot> [widths]');
const ORIGIN = 'http://localhost:8766';
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });

async function sheet(files, outDir, prefix, thumbWidth) {
  const p = await browser.newPage({ viewport: { width: 1800, height: 1000 } });
  await p.goto(ORIGIN + '/design-source/README.md');
  const rel = outDir.replace(/^\.\.\//, '');
  for (let i = 0; i < files.length; i += 12) {
    const cells = files.slice(i, i + 12).map(f => `<figure style="margin:0;color:#fff;font:14px sans-serif;text-align:center"><img src="${ORIGIN}/${rel}/${f.name}" style="width:${thumbWidth}px;display:block"><figcaption>${f.label}</figcaption></figure>`).join('');
    await p.setContent(`<body style="margin:0;background:#222"><div style="display:flex;flex-wrap:wrap;gap:8px;padding:8px">${cells}</div></body>`);
    await p.waitForLoadState('networkidle');
    await p.screenshot({ path: `${outDir}/${prefix}-sheet-${String(i / 12 + 1).padStart(2, '0')}.png`, fullPage: true });
  }
  await p.close();
}

for (const w of widthsArg.split(',').map(Number)) {
  const mobile = w < 768;
  const outDir = `${outRoot}/${w}`;
  mkdirSync(outDir, { recursive: true });
  const ctx = await browser.newContext({ viewport: { width: w, height: mobile ? 812 : w === 768 ? 1024 : 800 }, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile });
  const page = await ctx.newPage();
  const thumb = mobile ? 280 : w === 768 ? 280 : 580;

  // 1. hero timeline: from first paint, every 0.5 s for 8 s (entrance animation, reel scroll, marquee, floating card)
  await page.goto(url, { waitUntil: 'commit' });
  const hero = [];
  const t0 = Date.now();
  for (let i = 0; i < 17; i++) {
    const name = `hero-t${String(i * 0.5).padStart(4, '0')}.png`;
    await page.screenshot({ path: `${outDir}/${name}` });
    hero.push({ name, label: `${((Date.now() - t0) / 1000).toFixed(1)}s` });
    await page.waitForTimeout(450);
  }
  await sheet(hero, outDir, 'hero', thumb);

  // 2. slow scroll pass: 0.6 viewport per step, wait for reveal animations
  await page.waitForLoadState('networkidle');
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  const vh = page.viewportSize().height;
  const scroll = [];
  let n = 0;
  for (let y = 0; y < total; y += Math.round(vh * 0.6)) {
    await page.evaluate((v) => window.scrollTo(0, v), y);
    await page.waitForTimeout(900);
    const name = `scroll-${String(n++).padStart(2, '0')}.png`;
    await page.screenshot({ path: `${outDir}/${name}` });
    scroll.push({ name, label: `y=${y}` });
  }
  await sheet(scroll, outDir, 'scroll', thumb);
  console.log(w, 'hero', hero.length, 'scroll', scroll.length, 'pageHeight', total);
  await ctx.close();
}
await browser.close();
