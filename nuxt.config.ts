// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  devServer: {
    port: 4000
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxthub/core',
    '@nuxt/eslint',
    'nuxt-auth-utils',
  ],
  future: { compatibilityVersion: 4 },
  css: ['~/assets/css/main.css'],
  hub: {
    database: true,
    kv: true,
    cache: true,
    ai: true,
  },
  nitro: {
    experimental: {
      // Enable Server API documentation within NuxtHub
      openAPI: true
    }
  },
  auth: {
    webAuthn: true,
  },
})