import './styles/index.css';
import { initBehavior } from './behavior';

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) throw new Error('Missing #app mount point');

// Production HTML already contains the page (prerendered at build time, see build/prerender-plugin.ts).
// Only the dev server serves an empty #app, so the page string is loaded and rendered here.
// The DEV check lets the build drop this import, so the page text is not shipped a second time inside the JS.
if (import.meta.env.DEV && !app.firstElementChild) {
  const { pageHtml } = await import('./page');
  app.innerHTML = pageHtml;
}
initBehavior();
