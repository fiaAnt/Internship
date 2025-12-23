const { defineConfig } = require('cypress');

module.exports = defineConfig({
  video: true,
  videosFolder: 'cypress/videos',
  projectId: null,
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    setupNodeEvents(on, config) {},
  },
  env: {
    USERNAME: 'standard_user',
    PASSWORD: 'secret_sauce',
  },
});
