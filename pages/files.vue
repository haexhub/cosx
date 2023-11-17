<template>
  <div class="w-full h-full">
    <NuxtLayout>
      <div class="">
        <!-- <div class="max-w-screen-sm">
          <Tree
            class="bg-yellow-50"
            :items="files"
          >
          </Tree>
        </div> -->
        <FileUpload />
        <Gallary />
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const files = [
  { name: 'file 1' },
  { name: 'file 2' },
  {
    name: 'file 3',
    items: [
      { name: 'file 3 1' },
      { name: 'file 3 2' },
      { name: 'file 3 3', items: [{ name: 'file 3 3 1' }] },
    ],
  },
]
</script>
