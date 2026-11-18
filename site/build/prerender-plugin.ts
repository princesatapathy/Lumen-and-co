import type { Plugin } from 'vite';
import { pageHtml } from '../src/page';

const emptyMountPoint = '<div id="app"></div>';

// Build only: writes the whole page into dist/index.html so crawlers and no-JS visitors get real content.
// The dev server keeps an empty #app (src/main.ts renders it there).
export function prerenderPlugin(): Plugin {
  return {
    name: 'prerender-page',
    transformIndexHtml: {
      order: 'pre',
      handler(html, context) {
        if (context.server) return html;
        const markerCount = html.split(emptyMountPoint).length - 1;
        if (markerCount !== 1) {
          throw new Error(`prerender: expected exactly one ${emptyMountPoint} in index.html, found ${markerCount}`);
        }
        // Function replacer: page HTML may contain "$&" style sequences that a string replacement would interpret.
        return html.replace(emptyMountPoint, () => `<div id="app">${pageHtml}</div>`);
      },
    },
  };
}
