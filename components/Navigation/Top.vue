<template>
  <div class="fixed top-0 w-full bg-gray-200 dark:bg-gray-900 z-50 h-20 border-b border-primary/40">
    <div class="flex items-center h-full justify-between">
      <div class="w-22 px-3">
        <NuxtLink :to="localePath({ name: 'index' })">
          <UIcon
            name="i-game-icons-dungeon-gate"
            class="w-14 h-14 text-primary"
          />
        </NuxtLink>
      </div>

      <div class="w-full flex px-4">
        <div class="ml-auto flex space-x-4">
          <UButton
            :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
            color="gray"
            variant="ghost"
            aria-label="Theme"
            @click="isDark = !isDark"
          />
          <NavigationLanguageChooser />
          <UButton
            icon="i-mdi-login-variant"
            label="Sign In"
            :to="localePath('/login')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})
</script>
