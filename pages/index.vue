<template>
  <nuxt-layout name="vault-layout">
    <div class="h-screen ">
      <div>

        <NuxtLink to="/vault">vault page</NuxtLink>
      </div>

      <Icon v-show="menuStore.isNavbarVisible">
        <IconInfo
          class="w-10 mt-1 md:w-12 md:mt-1.5 cursor-pointer transform duration-300 bg-yellow-500"
          :class="menuStore.iconClass"
        />
      </Icon>
      <IconKey class="w-10" />

      <navbar />

      <a
        v-show="!menuStore.isActionButtonVisible"
        class="bg-primary relative mx-auto transform rotate-45 w-12 md:w-16 h-12 md:h-16 bottom-6 md:bottom-8 rounded block z-20 hover:bg-primary-hover hover:ring"
      >
        <Icon>
          <IconPlus
            class="cursor-pointer transform duration-300"
            :class="menuStore.iconClass"
          />
        </Icon>
      </a>
    </div>
  </nuxt-layout>
</template>

<script setup lang="ts">
import { useMenuStore } from "~~/store/menu-store";

const menuStore = useMenuStore();
const name = "IconKey";
</script>