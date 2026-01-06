const { defineConfig } = require('cypress');

module.exports = defineConfig({
  video: true,
  videosFolder: 'cypress/videos',
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
  },
  env: {
    USERNAME: 'standard_user',
    PASSWORD: 'secret_sauce',
  },
});
