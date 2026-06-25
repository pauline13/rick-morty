import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  snapshotPathTemplate: '{testDir}/{testFileDir}/{arg}{ext}',
  expect: {
    toHaveScreenshot: {
      animations: 'disabled'
    }
  },
  use: {
    baseURL: 'http://127.0.0.1:6006',
    viewport: {
      width: 390,
      height: 240
    },
    trace: 'on-first-retry'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ],
  webServer: {
    command: 'npm run storybook -- --host 127.0.0.1',
    url: 'http://127.0.0.1:6006',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000
  }
});
