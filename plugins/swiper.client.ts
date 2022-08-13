import { useSwiper } from "swiper/vue";


export default defineNuxtPlugin(nuxtApp => {
  return {
    provide: {
      swiper: useSwiper()
    }
  }
})
