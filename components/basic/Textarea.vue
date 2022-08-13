<template>
  <div class="flex-col text-slate-200">
    <label
      :for="id"
      class="p-2 rounded text-sm"
    >
      {{ title }}
    </label>

    <textarea
      v-bind="$attrs"
      :name="title"
      :id="id"
      :value="modelValue"
      class="
        bg-background 
        p-1.5 
        mt-1
        rounded 
        w-full
      "
      @input="$emit('update:modelValue', handleInput($event))"
      :rows="rows"
    >
    </textarea>

    <Icon
      v-if="copyMode"
      name="IconCopy"
      class="
        w-6 
        pt-2
        mt-1
        bg-background 
        absolute 
        -ml-10 
        transition
        hover:text-primary
      "
      @click.exact="copyToClipboard"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, onBeforeUpdate } from "vue";
import { cryptoStore } from "../../store/crypto-store";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },

  rows: {
    type: Number,
    default: 3,
  },

  modelValue: {
    type: String || Number,
    default: "",
  },

  copyMode: {
    type: Boolean,
    default: false,
  },
});

const eyeMargin = ref("-ml-10");
const id = cryptoStore.getUUID();

const handleInput = (event: Event) => {
  return (event.target as HTMLInputElement).value;
};

const copyToClipboard = () => {
  navigator.clipboard.writeText(props.modelValue);
};

onBeforeMount(() => {});

onBeforeUpdate(() => {});
</script>