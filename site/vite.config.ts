import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { prerenderPlugin } from './build/prerender-plugin';
import { seoPlugin } from './build/seo-plugin';

export default defineConfig({ plugins: [tailwindcss(), prerenderPlugin(), seoPlugin()] });
