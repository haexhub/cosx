<template>
  <client-only>
    <nav class="flex p-3 space-x-2 md:p-4 md:space-x-4 justify-around max-w-5xl mx-auto">

      <Icon @click="$swiper.slideTo(1)">
        <IconDungeon class="w-6 md:w-8 hover:text-primary" />
      </Icon>

      <Icon @click="$swiper.slideTo(2)">
        <IconMessage class="w-6 md:w-8 hover:text-primary" />
      </Icon>

      <Icon @click="$swiper.slideTo(3)">
        <IconSDCard class="w-6 md:w-8 hover:text-primary" />
      </Icon>

      <Icon @click="$swiper.slideTo(4)">
        <IconCalendar class="w-6 md:w-8 hover:text-primary" />
      </Icon>

    </nav>
  </client-only>
</template>

<script setup lang="ts">
onMounted(() => {
  //swiper.value = useSwiper();
});
</script>


<style>
.nuxt-link-active {
  @apply text-primary;
}

.nuxt-link-exact-active {
  @apply text-primary;
}
</style>