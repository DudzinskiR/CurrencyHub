import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',
    baseURL: process.env.ROOT || 'http://localhost:3000',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Desktop Chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'Desktop Firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'Desktop Webkit',
      use: { ...devices['Desktop Safari'] },
    },

    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5']}
    }

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

  ],
  outputDir: 'test-results/',
  webServer: [
    {
      command: 'cd ../frontend && npm install && npm run start',
      url: process.env.FRONTEND_ROOT || 'http://localhost:3000',
      timeout: 120 * 1000,
      env: {
        "REACT_APP_API_ROOT": `${process.env.BACKEND_ROOT || 'http://localhost'}:${process.env.BACKEND_PORT || "8080"}`
      }
    },
    {
      command: 'cd ../backend && npm install && npm run migrate:reset && npm run start',
      url: `${process.env.BACKEND_ROOT || 'http://localhost'}:${process.env.BACKEND_PORT || "8080"}`,
      timeout: 120 * 1000,
      env: {
        "NODE_ENV": 'test',
        "PORT": process.env.BACKEND_PORT || "8080"
      }
    }
  ]
});
