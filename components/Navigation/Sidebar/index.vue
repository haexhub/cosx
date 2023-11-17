<template>
  <div class="bg-gray-200 dark:bg-gray-900 w-16 absolute left-0 top-0 h-full z-40 border-r border-r-primary/30 pt-20">
    <aside
      class="flex flex-col items-center shadow h-full bg-gray-200 text-gray-700 dark:bg-gray-900 dark:text-white py-4"
    >
      <div class="w-full">
        <slot />
      </div>

      <div class="mt-auto h-16 flex items-center w-full">
        <slot name="bottom" />
      </div>
    </aside>
  </div>
</template>
