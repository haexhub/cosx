<template>
  <div class="h-full flex flex-col bg-purple-700">
    <slot />

  </div>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";

import { Swiper, SwiperSlide, useSwiper } from "swiper/vue";
import { Controller, Swiper as ISwiper } from "swiper";

import "swiper/css";
import { usePageSlider } from "~~/store/slide-store";

const slides = usePageSlider();
const refSwiper = ref();

const onSlideChange = (s: any) => console.log(s);
//onMounted(() => slides.pages.setSwiper(refSwiper.value.controller));
</script>
