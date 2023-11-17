<template>
  <NuxtLink :to="localePath('/')">
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
</script>
