const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  use: {
    baseURL: process.env.TIPFRAME_BASE_URL || 'http://127.0.0.1:8000',
    browserName: 'chromium'
  },
  timeout: 15000,
  reporter: 'line'
});
