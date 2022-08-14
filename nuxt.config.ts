import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      title: "CoS Vault",
      link: [{
        rel: "icon",
        type: "image/x-icon",
        href: "/dungeon.ico"
      }],
      viewport: "width=device-width, initial-scale=1, maximum-scale=1",
      charset: "utf-8",
      meta: [{
        name: "description",
        content: "Chamber of Secrets Vault."
      }],

    }
  },

  typescript: {
    shim: false,
    strict: true,
  },

  modules: [
    'nuxt-windicss',
    [
      '@pinia/nuxt',
      {
        autoImports: [
          // automatically imports `usePinia()`
          'defineStore',
          // automatically imports `usePinia()` as `usePiniaStore()`
          [
            'defineStore',
            'definePiniaStore'
          ],
        ],
      },
    ],
  ],

  windicss: {
    scan: {
      dirs: ['./'],
      exclude: [
        'node_modules',
        'dist',
        '.nuxt',
        '.git',
      ],
    },
  },
})
