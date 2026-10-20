import { defineConfig, devices } from '@playwright/test';

const PORT = 3100;

// Set PW_CHANNEL=chrome to reuse a locally installed Chrome when the Playwright browser download isn't possible.
const channel = process.env.PW_CHANNEL || undefined;

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    locale: 'en-US',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'mobile', use: { ...devices['Pixel 7'], channel } },
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 }, channel } },
  ],
  webServer: {
    command: 'npm run start',
    url: `http://localhost:${PORT}/en`,
    reuseExistingServer: false,
    timeout: 120_000,
    env: { PORT: String(PORT), CONTACT_DRY_RUN: '1' },
  },
});
