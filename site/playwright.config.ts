import { defineConfig } from '@playwright/test';

// Uses the Chrome already installed on this machine (D-15): no browser download.
export default defineConfig({
  testDir: 'tests/e2e',
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:5173/',
    channel: 'chrome',
    headless: true,
  },
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:5173/',
    reuseExistingServer: true,
  },
});
