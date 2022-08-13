<template>
  <!-- <transition
    enter-active-class="slide-in-bottom"
    leave-active-class="slide-out-bottom"
    :duration="500"
  > -->

  <ul
    v-show="menuStore.isActionButtonMenuVisible"
    class="
      -mt-25
      md:-mt-35
      -ml-15
      absolute 
      w-32
    "
  >
    <li
      @click="$emit('createKey')"
      class="mb-1"
    >
      <button class="
        py-1
        px-2
        md:py-2
        md:px-3
        rounded 
        z-0
        hover:bg-primary
      ">

        <span class="text-md">
          Schlüssel
        </span>

        <Icon>
          <IconKey class="w-6 pl-2" />
        </Icon>
      </button>
    </li>

    <li @click="$emit('createDirectory')">
      <button class="
        z-0
        py-1
        px-2
        md:py-2
        md:px-3
        rounded 
        hover:bg-primary 
      ">

        <span class="text-md">
          Gruppe
        </span>

        <Icon>
          <IconFolder class="w-6 pl-2" />
        </Icon>
      </button>
    </li>
  </ul>

  <!-- </transition> -->
</template>

<script setup lang="ts">
import { useMenuStore } from "@/store/menu-store";

const menuStore = useMenuStore();
</script>