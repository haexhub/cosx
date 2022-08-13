<template>
  <transition
    enter-active-class="scale-in-center"
    leave-active-class="scale-out-center"
  >
    <div
      v-show="modelValue"
      tabindex="-1"
      class="
        absolute 
        transition-all 
        duration-1000 
        bg-transparent 
        top-0 
        left-0 
        py-1/2 
        xs:p-0 
        sm:px-1/6 
        md:(px-1/5 py-40) 
        lg:(px-1/4 py-60) 
        h-full 
        w-full 
        z-40
      "
      @keyup.esc="$emit('update:modelValue', false)"
    >
      <div
        ref="overlay"
        class="bg-background-overlay rounded-lg p-2 min-w-100 max-w-170 ring m-2 mx-auto"
      >
        <slot />
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { onBeforeUpdate, onMounted, ref } from "@vue/runtime-core";

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const overlay = ref({} as HTMLElement);

const setFocus = () => {
  setTimeout(() => {
    overlay.value?.getElementsByTagName("input")[0]?.focus();
  }, 10);
};

onMounted(() => {
  setFocus();
});

onBeforeUpdate(() => {
  setFocus();
});
</script>