const { defineConfig } = require('cypress');
const baseConfig = require('../cypress.config');

// Environment config for the buggy app: https://qauto2.forstudy.space
module.exports = defineConfig({
  ...baseConfig,
  e2e: {
    ...baseConfig.e2e,
    baseUrl: 'https://qauto2.forstudy.space',
    specPattern: 'cypress/e2e/garage.cy.js',
  },
  env: {
    ...baseConfig.env,
    userEmail: 'marvl.qauto2.21@test.com',
    userPassword: 'Password1',
  },
});
