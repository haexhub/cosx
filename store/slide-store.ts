import { defineStore, skipHydrate } from 'pinia'
import Swiper from 'swiper'

export const useSlideStore = defineStore("slideStore", () => {
  const pages = {
    swiper: ref(),
    activeIndex: ref(0),
    setActiveIndex: (index: number) => {
      pages.activeIndex.value = index
      pages.swiper.value.slideTo(index)
    },
    setSwiper: (swiper: Swiper) => {
      pages.swiper.value = swiper
    }
  }

  return {
    pages
  }

})