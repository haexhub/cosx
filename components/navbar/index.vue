<template>
  <transition
    enter-active-class="slide-in-bottom"
    leave-active-class="slide-out-bottom"
    :duration="1000"
  >
    <div
      v-show="menuStore.isNavbarVisible"
      class="bg-background-overlay fixed bottom-0 left-0 w-full h-12 md:h-16 min-w-sm z-10 text-gray-200"
    >
      <!-- <transition
        enter-active-class="slide-in-bottom"
        leave-active-class="slide-out-bottom"
        :duration="500"
      > -->
      <a
        v-show="menuStore.isActionButtonVisible"
        class="bg-primary relative mx-auto transform rotate-45 w-12 md:w-16 h-12 md:h-16 bottom-6 md:bottom-8 rounded block z-20 hover:bg-primary-hover hover:ring"
        @click.stop="menuStore.toogleActionButtonMenu()"
        @blur="menuStore.hideActionButtonMenu()"
      >
        <div class="-rotate-45 transform relative">

          <slot name="buttonMenu"></slot>

        </div>

        <Icon class="p-1 md:p-2">
          <IconPlus
            class="w-10 md:w-12 cursor-pointer transform duration-300"
            :class="menuStore.iconClass"
          />
        </Icon>
      </a>
      <!-- </transition> -->

      <div class="absolute top-0 w-full h-full mx-auto">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useMenuStore } from "@/store/menu-store";

const menuStore = useMenuStore();
</script>