<template>
  <div class="">
    <NuxtLayout>
      <UCard :ui="ui">
        <Swiper
          :modules="[SwiperAutoplay, SwiperEffectCreative]"
          :slides-per-view="1"
          :loop="true"
          :autoplay="{ delay: 8000, disableOnInteraction: true }"
        >
          <SwiperSlide
            v-for="slide in 10"
            :key="slide"
          >
            <strong>{{ slide }}</strong>
          </SwiperSlide>
        </Swiper>
        <ClientOnly>
          <UButton
            :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
            color="gray"
            variant="ghost"
            aria-label="Theme"
            @click="isDark = !isDark"
          />

          <template #fallback>
            <div class="w-8 h-8" />
          </template>
        </ClientOnly>
      </UCard>
      <UButton icon="i-heroicons-magnifying-glass" />
      <UDropdown :items="[[{ label: 'Edit', shortcuts: ['E'] }]]" />

      <h1>Nuxt Routing set up successfully!</h1>
      <p>Current route: {{ route.path }}</p>
      <a
        href="https://nuxt.com/docs/getting-started/routing"
        target="_blank"
      >
        Learn more about Nuxt Routing
      </a>
      <div>

        <p>{{ $t('welcome') }}</p>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { locale } = useI18n()

const ui = /*ui*/ {
  background: 'bg-white dark:bg-slate-900',
}
const { metaSymbol } = useShortcuts()

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
