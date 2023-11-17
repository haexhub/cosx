<template>
  <div
    @click="uploadButton.click()"
    class="rounded-full overflow-hidden cursor-pointer"
  >
    <UseImage
      :src="src"
      v-if="src"
      class="w-48 h-48"
    >
      <template #loading>
        <USkeleton
          :ui="{ rounded: 'rounded-full' }"
          class="w-48 h-48"
        />
      </template>

      <template #error> Failed </template>
    </UseImage>

    <div v-else>
      <UButton
        icon="i-material-symbols-frame-person-rounded"
        size="xl"
      />
    </div>

    <input
      :disabled="uploading"
      @change="uploadAvatar"
      accept="image/*"
      ref="uploadButton"
      class="hidden"
      type="file"
    />
  </div>
</template>

<script setup>
import { UseImage } from '@vueuse/components'

const props = defineProps(['path', 'size'])

const { path, size } = toRefs(props)

const emit = defineEmits(['update:path', 'upload'])

const supabase = useSupabaseClient()

const uploading = ref(false)
const src = ref('')
const files = ref()

const uploadButton = ref()

const toast = useToast()

const downloadImage = async () => {
  try {
    if (path.value) {
      const { data, error } = await supabase.storage.from('avatars').download(path.value)
      if (error) throw error
      src.value = URL.createObjectURL(data)
    }
  } catch (error) {
    toast.add({ title: error.message, color: 'red', timeout: 60000 })
    console.error('Error downloading image: ', error.message)
  }
}

const uploadAvatar = async evt => {
  files.value = evt.target.files
  try {
    uploading.value = true
    if (!files.value || files.value.length === 0) {
      throw new Error('You must select an image to upload.')
    }
    const file = files.value[0]
    const fileExt = file.name.split('.').pop()
    const filePath = `avatar.${fileExt}`

    let { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file, {
      upsert: true,
    })
    if (uploadError) throw uploadError
    emit('update:path', filePath)
    emit('upload')
  } catch (error) {
    toast.add({ title: error?.message ?? error, color: 'red' })
  } finally {
    uploading.value = false
  }
}

downloadImage()

watch(path, () => {
  downloadImage()
})
</script>
