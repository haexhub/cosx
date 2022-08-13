<template>
  <div
    class="
    bg-background
    h-screen 
    w-screen 
    text-slate-300
    min-h-screen min-w-screen
    manrope
  "
    @click.exact="menuStore.hideActionButtonMenu()"
  >
    <div class="flex justify-center items-center space-x-6">

      <div class="flex justify-center h-30 ">
        <cos-logo onlyIcon />
        <!-- <basic-input
          v-model="search"
          class="mt-10 z-10 opacity-70 absolute"
          icon="IconMagnify"
          inputClass="bg-background w-50"
          @clickIcon="isSearchEnabled = true"
        /> -->
      </div>

      <!-- <basic-dropdown-menu text="Auswahl">
        <basic-dropdown-item
          v-for="vault in vaultStore.vaults"
          :key="vault.id"
        >{{vault.fileHandle?.name}}</basic-dropdown-item>
      </basic-dropdown-menu> -->
    </div>
    <div class="
      min-w-sm
      max-w-5xl 
      mx-auto
      ">

      <swiper class="mySwiper">
        <swiper-slide>
          <slot></slot>

        </swiper-slide>

      </swiper>

      <navbar>
        <template #buttonMenu>
          <slot name="buttonMenu"></slot>
        </template>

        <template #navbar>
          <slot name="navbar"></slot>
        </template>
      </navbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { useMenuStore } from "@/composables/menu-store";
import { useVaultStore } from "@/composables/vault-store";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

const search = ref("");
const isSearchEnabled = ref(true);

const vaultStore = useVaultStore();
const menuStore = useMenuStore();
</script>
