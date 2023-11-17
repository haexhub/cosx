// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  alias: {},

  app: {
    pageTransition: { name: 'page', mode: 'in-out' },
  },

  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'nuxt-swiper',
  ],

  i18n: {
    locales: ['en', 'de'],
    strategy: 'prefix_and_default',
    defaultLocale: 'de',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root', // recommended
      alwaysRedirect: true,
    },
    vueI18n: './i18n.config.ts',
  },

  ui: { icons: 'all' },

  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/**', '/en/**', '/de/**', '/files'],
    },
  },
})
