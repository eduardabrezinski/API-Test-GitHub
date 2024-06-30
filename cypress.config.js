const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
     baseUrl: 'https://api.github.com',
    env: {
      hideCredentials: true,
      requestMode: true
    },
    experimentalRunAllSpecs: true // permite rodar todos os testes visuais de uma vez só
  },
  fixturesFolder: false,
  video: false
})
