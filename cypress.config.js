const { defineConfig } = require('cypress');

module.exports = defineConfig({
  // Global options (apply to all testing types)
  viewportWidth: 1280,
  viewportHeight: 720,
  defaultCommandTimeout: 8000,
  pageLoadTimeout: 30000,
  requestTimeout: 10000,
  responseTimeout: 30000,
  video: false,
  screenshotOnRunFailure: true,
  watchForFileChanges: true,
  retries: {
    runMode: 1,
    openMode: 0,
  },
  fixturesFolder: 'cypress/fixtures',

  // E2E-specific options
  e2e: {
    baseUrl: 'https://qauto.forstudy.space',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
