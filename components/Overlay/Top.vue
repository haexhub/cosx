<template>
  <nav
    class="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 dark:bg-gray-900 h-20"
  >
    <div class="w-full flex justify-around">
      <UButton
        @click="isOpen = !isOpen"
        color="primary"
        icon="i-heroicons-bars-3"
        size="sm"
        square
        variant="solid"
      />

      <NuxtLink
        class="text-sm font-bold leading-relaxed inline-block mx-4 py-2 whitespace-nowrap uppercase dark:text-white"
        :to="localePath('/')"
      >
        Chamber of Secrets
      </NuxtLink>

      <OverlayAvatarMenu v-if="user?.id" />
      <UButton
        :to="localePath('/login')"
        color="primary"
        icon="i-ic-outline-log-in"
        label="Sign In"
        v-else
      />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { isOpen } from './useSidebar'
const user = useSupabaseUser()
const localePath = useLocalePath()
</script>
