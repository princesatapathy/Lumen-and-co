// Push a local/any HTML page into Figma as editable layers via Figma's html-to-design capture.
// Flow: the Figma tool generate_figma_design (fileKey) -> gets captureId -> runs this script -> polls the tool until "completed".
// Run: node figma-capture.mjs <pageUrl> <captureId> [promptId] [viewportWidth=1280] [selector=body]
import { chromium } from '../../dev-tools/browser.mjs';

const [pageUrl, captureId, promptId, viewportWidth = '1280', selector = 'body'] = process.argv.slice(2);
if (!pageUrl || !captureId) throw new Error('usage: node figma-capture.mjs <pageUrl> <captureId> [promptId] [viewportWidth] [selector]');

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const page = await browser.newPage({ viewport: { width: Number(viewportWidth), height: 900 } });
if (process.env.MOTION !== 'on') await page.emulateMedia({ reducedMotion: 'reduce' }); // static capture: no mid-animation or hidden-reveal layers. MOTION=on keeps animations (states sheet freezes them itself)
await page.goto(pageUrl, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready); // capture with real fonts, not fallbacks
if (process.env.CLICK_BEFORE_CAPTURE) await page.click(process.env.CLICK_BEFORE_CAPTURE); // e.g. '[data-menu-toggle]' for the mobile-menu-open frame
const captureScript = await (await page.context().request.get('https://mcp.figma.com/mcp/html-to-design/capture.js')).text();
await page.evaluate((source) => { const el = document.createElement('script'); el.textContent = source; document.head.appendChild(el); }, captureScript);
await page.waitForTimeout(500);
const endpoint = `https://mcp.figma.com/mcp/capture/${captureId}/submit?bindVariables=true${promptId ? `&promptId=${promptId}` : ''}`;
const result = await page.evaluate((args) => window.figma.captureForDesign(args), { captureId, endpoint, selector });
console.log(JSON.stringify(result));
await browser.close();
