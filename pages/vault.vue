<template>

  <NuxtLayout name="vault-layout">

    <NuxtChild />
    <button @click="toggleNavbar()">hide</button>
    <template #buttonMenu>
      <!-- <transition
        enter-active-class="slide-in-bottom"
        leave-active-class="slide-out-bottom"
      > -->
      h
      <!-- <navbar-button-item-menu /> -->
      <!-- <navbar-button-vault-menu />
         -->

      <!-- <navbar-page-navigation /> -->
      <!-- </transition> -->
    </template>

    <template #navbar>
      <transition
        enter-active-class="slide-in-bottom"
        leave-active-class="slide-out-bottom"
      >

        <!-- <navbar-vault-mark-menu
          v-if="menuStore.isMarkMenuVisible"
          :parentDirectoryId="hashParams.directoryId"
          @close="refVaultList?.unmarkAllItems()"
        /> -->

        <navbar-page-navigation />
      </transition>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useMenuStore } from "~~/store/menu-store";

const menuStore = useMenuStore();
const { toggleNavbar } = useMenuStore();
const test = () => {
  menuStore.toggleNavbar();
};
</script>