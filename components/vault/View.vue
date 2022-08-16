<template>
  
<div>vault view</div>
</template>

<script setup lang="ts">

import { usePageSliderStore } from "@/store/slide-store"
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

//const menuStore = useMenuStore();
//const vault = useVaultStore();
const slides = usePageSliderStore();
const refSwiper = ref();
const setController = (swiper: any) => {
  slides.setSwiper(refSwiper.value.controller)
};

//onMounted(() => slides.setSwiper(refSwiper.value.controller));
</script>