<template>
  <div class="group w-60 bg-white dark:bg-gray-800 p-3 rounded-md ring-1">
    <img
      class="h-36 w-full object-cover transform transition group-hover:-translate-y-1 group-hover:scale-110 duration-400 ease-out"
      :src="src"
    />
    <ul
      class="mt-3 flex-wrap hidden group-hover:flex "
    >
      <li class="mr-auto">
        <NuxtLink
          href="#"
          class="flex text-gray-400 hover:text-primary"
        >
          <UIcon
            name="i-carbon-share"
            class="w-6 h-6"
          />
        </NuxtLink>
      </li>
      <li class="mr-2">
        <NuxtLink
          href="#"
          class="flex text-gray-400 hover:text-primary"
        >
          <UIcon
            name="i-clarity-favorite-line"
            class="w-6 h-6"
          />
        </NuxtLink>
      </li>

      <li class="mr-2">
        <NuxtLink
          href="#"
          class="flex text-gray-400 hover:text-primary"
        >
          <UIcon
            name="i-material-symbols-bookmark-add-outline"
            class="w-6 h-6"
          />
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps({
  src: String,
})
</script>
