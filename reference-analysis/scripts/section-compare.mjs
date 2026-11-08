// Step 4: dumps geometry and computed styles of every top-level section, reference vs our site. Numbers only, text is never stored.
// node section-compare.mjs [widths=375,768,1280]   -> prints section heights, writes ../data/section-compare-<who>-<width>.json
import { chromium } from '../../dev-tools/browser.mjs';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';

const viewportWidths = (process.argv[2] || '375,768,1280').split(',').map(Number);
const sites = [['ref', 'https://naveenrkcreates.com/'], ['ours', 'http://localhost:5173/']];
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });

const dumpSections = () => {
  const round = (value) => Math.round(value * 10) / 10;
  const describe = (element, sectionTop) => {
    const rect = element.getBoundingClientRect();
    const style = getComputedStyle(element);
    const ownText = [...element.childNodes].filter((node) => node.nodeType === 3).map((node) => node.textContent.trim()).join('');
    return {
      tag: element.tagName.toLowerCase(),
      x: round(rect.left), y: round(rect.top + scrollY - sectionTop), w: round(rect.width), h: round(rect.height),
      hasOwnText: ownText.length > 0, ownTextLength: ownText.length,
      font: `${style.fontFamily.split(',')[0].replace(/"/g, '')} ${style.fontWeight} ${style.fontStyle === 'italic' ? 'italic ' : ''}${style.fontSize}/${style.lineHeight} ls ${style.letterSpacing}`,
      color: style.color, background: style.backgroundColor,
      radius: style.borderTopLeftRadius, border: `${style.borderTopWidth} ${style.borderTopColor}`,
      padding: style.padding, display: style.display, flexDirection: style.flexDirection, gap: style.gap, gridColumns: style.gridTemplateColumns,
      textAlign: style.textAlign, opacity: style.opacity, boxShadow: style.boxShadow === 'none' ? undefined : style.boxShadow,
    };
  };
  const topLevel = [...document.querySelectorAll('header, section, footer')].filter((element) => !element.parentElement.closest('header, section, footer'));
  return topLevel.map((section) => {
    const top = section.getBoundingClientRect().top + scrollY;
    return {
      section: describe(section, top),
      children: [...section.querySelectorAll('*')].filter((element) => !element.closest('svg') || element.tagName.toLowerCase() === 'svg').filter((element) => element.getBoundingClientRect().width > 0).map((element) => describe(element, top)),
    };
  });
};

const results = {};
for (const [who, url] of sites) {
  for (const width of viewportWidths) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(url, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1500);
    await page.evaluate(async () => {
      document.documentElement.style.scrollBehavior = 'auto';
      for (let y = 0; y < document.documentElement.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise((resolve) => setTimeout(resolve, 120)); }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(800);
    const sections = await page.evaluate(dumpSections);
    results[`${who}-${width}`] = sections;
    writeFileSync(fileURLToPath(new URL(`../data/section-compare-${who}-${width}.json`, import.meta.url)), JSON.stringify(sections, null, 1));
    await page.screenshot({ path: fileURLToPath(new URL(`../screenshots/compare/step4-${who}-${width}.png`, import.meta.url)), fullPage: true });
    await page.close();
  }
}
await browser.close();

for (const width of viewportWidths) {
  console.log(`\nwidth ${width}   ref / ours / diff`);
  const reference = results[`ref-${width}`];
  const ours = results[`ours-${width}`];
  for (let index = 0; index < Math.max(reference.length, ours.length); index += 1) {
    const referenceHeight = reference[index]?.section.h;
    const ourHeight = ours[index]?.section.h;
    console.log(String(index).padStart(2), (reference[index]?.section.tag ?? '-').padEnd(8), String(referenceHeight).padStart(7), String(ourHeight).padStart(7), String(Math.round((ourHeight - referenceHeight) * 10) / 10).padStart(7));
  }
}
