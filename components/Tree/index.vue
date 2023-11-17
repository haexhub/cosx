<template>
  <ul>
    <TreeItem
      v-for="item in items"
      :item="item"
    >
    </TreeItem>
    <slot />
  </ul>
</template>

<script setup lang="ts">
defineProps({
  items: Array,
})
</script>
