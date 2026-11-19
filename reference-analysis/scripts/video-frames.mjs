// Frame extractor for reference videos (no ffmpeg): plays the video in headless Chrome, seeks, screenshots the <video> element.
// Needs the project root served over http (same-origin): python -m http.server 8766   (run from D:\Portfolio2)
// node video-frames.mjs probe  <videoPathRelativeToRoot>
// node video-frames.mjs frames <videoPath> <outDir> <everySec> [startSec=0] [endSec=duration]   -> outDir/t0012.50.png + outDir/sheet-NN.png (contact sheets, 12 frames each)
import { chromium } from '../../dev-tools/browser.mjs';
import { mkdirSync, writeFileSync } from 'fs';

const [mode, videoPath, outDir, everySec = '1', startSec = '0', endSec] = process.argv.slice(2);
if (!mode || !videoPath) throw new Error('usage: node video-frames.mjs probe|frames <videoPath> [outDir everySec startSec endSec]');
const ORIGIN = 'http://localhost:8766';
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--autoplay-policy=no-user-gesture-required'] });
const page = await browser.newPage({ viewport: { width: 1000, height: 1000 } });
await page.goto(ORIGIN + '/design-source/README.md'); // any real same-origin page; content replaced below
await page.setContent(`<body style="margin:0;background:#000"><video id="v" muted preload="auto" crossorigin="anonymous" style="display:block;max-height:960px;max-width:980px"></video></body>`);
const meta = await page.evaluate(async (src) => {
  const v = document.getElementById('v');
  v.src = src;
  await new Promise((res, rej) => { v.onloadedmetadata = res; v.onerror = () => rej(new Error('video load error code ' + (v.error && v.error.code))); });
  return { duration: v.duration, width: v.videoWidth, height: v.videoHeight };
}, `${ORIGIN}/${videoPath}`);
console.log(JSON.stringify(meta));
if (mode === 'probe') { await browser.close(); process.exit(0); }

mkdirSync(outDir, { recursive: true });
const step = Number(everySec), start = Number(startSec), end = Math.min(Number(endSec ?? meta.duration), meta.duration);
const stamps = [];
for (let t = start; t < end; t += step) stamps.push(Number(t.toFixed(2)));
const video = page.locator('#v');
const files = [];
for (const t of stamps) {
  const landed = await page.evaluate((time) => new Promise((res) => { const v = document.getElementById('v'); v.onseeked = () => res(v.currentTime); v.currentTime = time; }), t);
  if (Math.abs(landed - t) > 0.5) throw new Error(`seek to ${t}s landed at ${landed}s (server must support HTTP Range: use node range-server.mjs)`);
  await page.waitForTimeout(120); // let the frame paint
  const name = `t${String(t.toFixed(2)).padStart(7, '0')}.png`;
  await video.screenshot({ path: `${outDir}/${name}` });
  files.push({ t, name });
}
// contact sheets: 12 frames per sheet, 6 columns, labelled with timestamp
const perSheet = 12;
const sheetPage = await browser.newPage({ viewport: { width: 1800, height: 1000 } });
for (let i = 0; i < files.length; i += perSheet) {
  const chunk = files.slice(i, i + perSheet);
  const cells = chunk.map(f => `<figure style="margin:0;color:#fff;font:14px sans-serif;text-align:center"><img src="${ORIGIN}/${outDir.replace(/^\.\.\//, '')}/${f.name}" style="${meta.width > meta.height ? 'width:580px' : 'height:420px'};display:block"><figcaption>${f.t}s</figcaption></figure>`).join('');
  await sheetPage.setContent(`<body style="margin:0;background:#222"><div style="display:flex;flex-wrap:wrap;gap:8px;padding:8px">${cells}</div></body>`);
  await sheetPage.waitForLoadState('networkidle');
  await sheetPage.screenshot({ path: `${outDir}/sheet-${String(i / perSheet + 1).padStart(2, '0')}.png`, fullPage: true });
}
writeFileSync(`${outDir}/frames.json`, JSON.stringify({ meta, step, files }, null, 1));
console.log(`frames: ${files.length}, sheets: ${Math.ceil(files.length / perSheet)} -> ${outDir}`);
await browser.close();
