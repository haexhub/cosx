<template>
  <UButton
    @click="swiper.slidePrev()"
    block
    color="primary"
    icon="i-ic-outline-log-in"
    label="Sign In"
  />
</template>

<script setup lang="ts">
const swiper = useSwiper()
</script>
