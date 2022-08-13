import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
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
