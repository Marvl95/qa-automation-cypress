const { defineConfig } = require('cypress');
const baseConfig = require('../cypress.config');

// Environment config for the stable app: https://qauto.forstudy.space
module.exports = defineConfig({
  ...baseConfig,
  e2e: {
    ...baseConfig.e2e,
    baseUrl: 'https://qauto.forstudy.space',
    specPattern: 'cypress/e2e/garage.cy.js',
  },
  env: {
    ...baseConfig.env,
    userEmail: 'marvl.qauto21@test.com',
    userPassword: 'Password1',
  },
});
