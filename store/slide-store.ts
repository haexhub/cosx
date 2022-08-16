import { defineStore, skipHydrate } from 'pinia'
import Swiper from 'swiper'

export const usePageSlider = defineStore("pageSlider", () => {

  const swiper = ref()
  const activeIndex = ref(0)
  const setActiveIndex = (index: number) => {
    activeIndex.value = index
    swiper.value.slideTo(index)
  }

  const setSwiper = (controller: Swiper) => {
    console.log("set swiper", controller)
    swiper.value = controller
  }


  return {
    activeIndex: skipHydrate(activeIndex),
    setActiveIndex,
    setSwiper,
  }

})