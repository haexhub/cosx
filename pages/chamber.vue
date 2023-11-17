<template>
  <div class="w-full h-full">
    <NuxtLayout>
      chamber
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})
</script>
