<template>
  <client-only>
    <nav class="flex p-3 space-x-2 md:p-4 md:space-x-4 justify-around max-w-5xl mx-auto">
      <Icon @click="slide.setActiveIndex(0)">
        <IconDungeon
          class="w-6 md:w-8 hover:text-primary"
          :class="{'text-primary': slide.activeIndex === 0 }"
        />
      </Icon>

      <Icon @click="slide.setActiveIndex(1)">
        <IconMessage
          class="w-6 md:w-8 hover:text-primary"
          :class="{'text-primary': slide.activeIndex === 1 }"
        />
      </Icon>

      <Icon @click="slide.setActiveIndex(2)">
        <IconSDCard
          class="w-6 md:w-8 hover:text-primary"
          :class="{'text-primary': slide.activeIndex === 2 }"
        />
      </Icon>

      <Icon @click="slide.setActiveIndex(3)">
        <IconCalendar
          class="w-6 md:w-8 hover:text-primary"
          :class="{'text-primary': slide.activeIndex === 3 }"
        />
      </Icon>

    </nav>
  </client-only>
</template>

<script setup lang="ts">
import { usePageSlider } from "~~/store/slide-store";

const slide = usePageSlider();
defineEmits(["navigate"]);
</script>