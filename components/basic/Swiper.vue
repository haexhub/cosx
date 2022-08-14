<template>
  <swiper
    v-bind="swiperConfig"
    @swiper="setController"
  >
    <slot />
  </swiper>
</template>

<script setup lang="ts">
import { Swiper } from "swiper/vue";
import {
  Autoplay,
  EffectFade,
  Lazy,
  Navigation,
  Pagination,
  SwiperOptions as ISwiperOptions,
  Swiper as ISwiper,
} from "swiper";

import "swiper/css";
import { PropType } from "vue";

const { swiperOptions } = defineProps({
  swiperOptions: {
    type: Object as PropType<ISwiperOptions>,
    default: () => {},
  },
});

const defaultOptions = {
  modules: [Pagination, Navigation, EffectFade, Lazy, Autoplay],
  pagination: {
    clickable: true,
  },
  navigation: true,
  lazy: {
    checkInView: true,
    enabled: true,
  },
  slidesPerView: 1,
  spaceBetween: 10,
  preloadImages: false,
  rewind: true,
  autoplay: false,
};

const swiperConfig = {
  ...defaultOptions,
  ...swiperOptions,
};

const controller = ref();

const setController = (swiper: ISwiper) => {
  controller.value = swiper;
};

defineExpose({
  controller,
});
</script>