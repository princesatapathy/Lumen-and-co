// Guards the "own copy only" rule (D-07): lists text on OUR site that overlaps the reference. Prints only our own strings; reference text is compared in memory and never stored.
// node copy-overlap.mjs [minimumOverlap=0.34]
import { chromium } from '../../dev-tools/browser.mjs';

const minimumOverlap = Number(process.argv[2] || 0.34);
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });

const readTextBlocks = async (url) => {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForTimeout(1500);
  const blocks = await page.evaluate(() => [
    ...[...document.querySelectorAll('body *:not(script):not(style):not(noscript)')]
      .filter((element) => [...element.childNodes].some((node) => node.nodeType === 3 && node.textContent.trim()))
      .map((element) => element.textContent),
    ...[...document.querySelectorAll('[aria-label],[alt],[title],[placeholder]')].flatMap((element) => ['aria-label', 'alt', 'title', 'placeholder'].map((name) => element.getAttribute(name) ?? '')),
    ...[...document.querySelectorAll('meta[name="description"],meta[property^="og:"],meta[name^="twitter:"]')].map((element) => element.getAttribute('content') ?? ''),
    document.title,
  ].filter((text) => text.trim()));
  await page.close();
  return [...new Set(blocks)];
};
const normalize = (text) => text.toLowerCase().replace(/[^a-z0-9' ]+/g, ' ').replace(/\s+/g, ' ').trim();
const wordTrigrams = (words) => words.slice(0, Math.max(words.length - 2, 0)).map((_, index) => words.slice(index, index + 3).join(' '));

const referenceBlocks = (await readTextBlocks('https://naveenrkcreates.com/')).map(normalize);
const ourBlocks = await readTextBlocks('http://localhost:5173/');
await browser.close();

const referenceWholeBlocks = new Set(referenceBlocks);
const referenceTrigrams = new Set(referenceBlocks.flatMap((block) => wordTrigrams(block.split(' '))));

const findings = ourBlocks.map((block) => {
  const words = normalize(block).split(' ').filter(Boolean);
  if (words.length === 0) return null;
  if (referenceWholeBlocks.has(words.join(' '))) return { overlap: 1, kind: 'exact', block };
  const trigrams = wordTrigrams(words);
  if (trigrams.length === 0) return null;
  const overlap = trigrams.filter((trigram) => referenceTrigrams.has(trigram)).length / trigrams.length;
  return overlap >= minimumOverlap ? { overlap, kind: 'trigram', block } : null;
}).filter(Boolean).sort((first, second) => second.overlap - first.overlap);

for (const { overlap, kind, block } of findings) console.log(overlap.toFixed(2), kind.padEnd(7), block.trim().replace(/\s+/g, ' ').slice(0, 130));
console.log(`\n${findings.length} of our ${ourBlocks.length} text blocks overlap the reference`);
