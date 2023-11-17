<template>
  <UTooltip
    :text="tooltip"
    :popper="{ placement: 'right' }"
    class="w-full justify-center flex hover:text-primary"
  >
    <NuxtLink
      v-if="href"
      :to="localePath(href)"
      class="w-full flex justify-center"
    >
      <UIcon
        :name="icon"
        class="w-6 h-6 m-2"
      />
    </NuxtLink>
  </UTooltip>
</template>

<script setup lang="ts">
import type { RouteLocation } from 'vue-router'
import type { RouteLocationRaw } from 'vue-router'

defineProps({
  href: Object as PropType<RouteLocationRaw | RouteLocation>,
  icon: String,
  tooltip: String,
})

const localePath = useLocalePath()
</script>
