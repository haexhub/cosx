<template>
  <div class="w-full h-full">
    <NuxtLayout>
      <div class="">
        <UContainer>
          <Profile />
        </UContainer>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})
</script>
