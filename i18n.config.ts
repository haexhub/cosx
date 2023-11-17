import componentLogin from "@/components/Login/locale.json"

export default defineI18nConfig(() => ({
  legacy: false,

  messages: {
    en: {
      welcome: 'Welcome',
      component: {
        login: componentLogin.en,
      },
    },
    de: {
      welcome: 'Willkommen',
      component: {
        login: componentLogin.de,
      },
    },
  },
}))
