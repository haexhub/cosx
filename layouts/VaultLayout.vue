<template>
  <div class="h-full">
    <swiper class="mySwiper h-full">
      <swiper-slide class="bg-yellow-200">
        <vault />

      </swiper-slide>
      <swiper-slide class="bg-green-200">
        <vault-storage />

      </swiper-slide>

      <swiper-slide>
        <swiper class=" h-64 my-10">
          <swiper-slide class="bg-blue-200">
            lalalal

          </swiper-slide>
          <swiper-slide class="bg-red-200">
            uhuhuhu

          </swiper-slide>
        </swiper>
      </swiper-slide>
    </swiper>

    <navbar>
      <navbar-page-navigation />
    </navbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { useMenuStore } from "@/store/menu-store";
import { useVaultStore } from "~~/store/vault-store";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css/bundle";
/* 
import { Navigation, Pagination, Scrollbar, A11y } from "swiper"; */
</script>
