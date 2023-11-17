<template>
  <USelectMenu
    :options="options"
    @change="switchLocale"
    size="lg"
    v-model="language"
    variant="outline"
  >
    <template #label>
      <UIcon
        :name="language.icon"
        class="w-4 h-4"
        v-if="language.icon"
      />
      {{ language.label }}
    </template>
  </USelectMenu>
</template>

<script setup lang="ts">
const { locale, setLocale, defaultLocale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

interface IOption {
  label: string
  value: string
  icon: string
}

const options = [
  { label: 'DE', value: 'de', icon: 'i-emojione-flag-for-germany' },
  { label: 'EN', value: 'en', icon: 'i-emojione-flag-for-united-kingdom' },
]

const language = ref({
  ...options.find(option => option.value === locale?.value),
})

const switchLocale = (option: IOption) => {
  locale.value = option.value ?? defaultLocale
  setLocale(locale.value ?? defaultLocale)
  navigateTo(localePath(route.path))
}
</script>
