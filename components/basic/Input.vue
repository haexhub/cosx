<template>
  <div class="flex-col text-slate-200">
    <label
      v-if="label"
      :for="id"
      class="p-2 rounded text-sm"
    >
      {{ label }}
    </label>

    <input
      :name="label"
      :id="id"
      :type="type"
      :value="modelValue"
      class="
        p-1.5 
        mt-1
        rounded 
        w-full
        ring
        pr-10
      "
      :class="inputClass"
      @input="$emit('update:modelValue', handleInput($event))"
    />
    <Icon
      v-if="icon"
      :name="icon"
      class="
        w-6 
        pt-1.5 
        mt-1
        -ml-10
        absolute
        transition
        hover:text-primary
        focus:text-primary  
      "
      :class="iconClass"
      @click="$emit('clickIcon')"
    />

  </div>
</template>

<script setup lang="ts">
import { useCryptoStore } from "@/composables/crypto-store";

const props = defineProps({
  label: String,

  type: {
    type: String,
    default: "text",
  },

  modelValue: {
    type: String || Number,
    default: "",
  },

  icon: String,
  iconClass: String,
  inputClass: String,
});

const cryptoStore = useCryptoStore();
const id = ref("");

const handleInput = (event: Event) => {
  return (event.target as HTMLInputElement).value;
};

onMounted(async () => (id.value = await cryptoStore.getUUID()));
</script>