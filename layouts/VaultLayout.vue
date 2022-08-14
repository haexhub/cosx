<template>
  <div class="h-full flex flex-col bg-purple-700">
    <cos-logo class="" />
    <div class="h-full">
      <basic-swiper
        class="h-full"
        ref="refSwiper"
        @slideChange="slides.pages.setActiveIndex($event.activeIndex)"
      >
        <swiper-slide class="bg-yellow-200 h-full">
          <vault />
        </swiper-slide>

        <swiper-slide class="bg-green-200">
          <vault-message />
        </swiper-slide>

        <swiper-slide class="bg-green-200">
          <vault-storage />
        </swiper-slide>

        <swiper-slide class="bg-green-200">
          <vault-calendar />
        </swiper-slide>
      </basic-swiper>
    </div>
    <navbar>
      <navbar-page-navigation @navigate="slides.pages.setActiveIndex($event)" />
    </navbar>

  </div>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";

import { Swiper, SwiperSlide, useSwiper } from "swiper/vue";
import { Controller, Swiper as ISwiper } from "swiper";

import "swiper/css";
import { useSlideStore } from "~~/store/slide-store";

const slides = useSlideStore();
const refSwiper = ref();

const onSlideChange = (s: any) => console.log(s);
onMounted(() => slides.pages.setSwiper(refSwiper.value.controller));
</script>
