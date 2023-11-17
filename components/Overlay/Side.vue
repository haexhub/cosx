<template>
  <USlideover
    v-model="isOpen"
    side="left"
    :ui="{
      width: 'max-w-xs',
      ring: 'ring-2',
    }"
  >
    <UCard>
      <div class="flex flex-col flex-wrap p-6 flex-none h-screen">
        <nav class="flex flex-col">
          <slot />
        </nav>
      </div>
    </UCard>
  </USlideover>
</template>

<script setup lang="ts">
import { isOpen } from "./useSidebar"

/* const props = defineProps({
  isOpen: Boolean,
}) */

const emit = defineEmits(['update:isOpen'])

/* const isOpen = computed({
  get: () => props.isOpen,
  set: open => emit('update:isOpen', open),
}) */
</script>
