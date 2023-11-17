<template>
  <div
    ref="dropZoneRef"
    class="border border-dashed p-4 flex flex-col items-center bg-gray-200/80 dark:bg-gray-800/40"
  >
    <div class="w-full h-full">
      <p>Drop files on to drop zones</p>
      {{ fileSystem.isSupported }}
      <UButton
        block
        label="Dateien auswählen"
        @click="fileDialog.open"
        icon="i-heroicons-document-plus"
      />
      <!-- icon="i-streamline-interface-upload-desktop-action-actions-computer-desktop-device-display-monitor-screen-upload" -->

      <div class="flex flex-col w-full min-h-200px h-auto justify-center items-center mt-6 rounded">
        <div>General DropZone</div>
        <div>
          <UCheckbox
            label="isOverDropZone:"
            v-model="isOverDropZone"
          />
        </div>
        <div class="flex flex-wrap justify-center items-center space-x-2">
          <div
            v-for="(file, index) in filesData"
            :key="index"
            class=""
          >
            <FileImagePreview :src="file.src" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/* import { useDropZone } from '@vueuse/core'
import { useFileSystemAccess } from '@vueuse/core' */
//import { useImage } from '@vueuse/core'
const fileSystem = useFileSystemAccess()

const fileDialog = useFileDialog({
  // Select directories instead of files if set true
})

//const { isLoading } = useImage({ src: ""})

const filesData = ref<
  { name: string; size: number; type: string; lastModified: number; src: string }[]
>([])
const imageFilesData = ref<{ name: string; size: number; type: string; lastModified: number }[]>([])

const dropZoneRef = ref<HTMLDivElement>()
const imageDropZoneRef = ref<HTMLElement>()

const onDrop = (files: File[] | null) => {
  // called when files are dropped on zone
  console.log('droped', files)
  filesData.value = []
  if (files) {
    filesData.value = files.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      src: URL.createObjectURL(file),
    }))
  }
}

const onImageDrop = (files: File[] | null) => {
  imageFilesData.value = []
  if (files) {
    imageFilesData.value = files.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
    }))
  }
}

const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop,
  // specify the types of data to be received.
})

const { isOverDropZone: isOverImageDropZone } = useDropZone(imageDropZoneRef, {
  dataTypes: ['image/*'],
  onDrop: onImageDrop,
})

fileDialog.onChange((files: FileList) => {
  const arr = [...files]
  console.log(files)
  filesData.value.push(
    ...arr.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      src: URL.createObjectURL(file),
    }))
  )
})
</script>
