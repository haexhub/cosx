<template>
  <div class="bg-white dark:bg-gray-900 w-screen h-screen">
    <NuxtPage />
    <UNotifications />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Chamber of Secrets',
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
})

</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.2s;
}
.slide-left-enter-from {
  opacity: 0;
  transform: translate(50px, 0);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translate(-50px, 0);
}
.slide-right-enter-from {
  opacity: 0;
  transform: translate(-50px, 0);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translate(50px, 0);
}
</style>
