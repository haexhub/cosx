<template>
  <UButton
    @click="swiper.slideNext()"
    block
    color="primary"
    icon="i-ic-baseline-person-add-alt-1"
    label="Sign Up"
  />
</template>

<script setup lang="ts">
const swiper = useSwiper()
</script>
