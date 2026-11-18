import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { prerenderPlugin } from './build/prerender-plugin';

export default defineConfig({ plugins: [tailwindcss(), prerenderPlugin()] });
