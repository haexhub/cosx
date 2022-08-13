<template>
  <div class="flex-col text-slate-200">
    <label
      :for="id"
      class="p-2 rounded text-sm"
    >
      {{ title }}
    </label>

    <input
      v-bind="$attrs"
      :name="title"
      :id="id"
      :type="currentType"
      :value="modelValue"
      class="
        bg-background 
        p-1.5 
        mt-1
        rounded 
        w-full
      "
      @input="$emit('update:modelValue', handleInput($event))"
    />

    <Icon
      v-if="
      type === 'password'
      && currentType === 'password'
    "
      name="IconEye"
      class="
        w-6 
        pt-1.5 
        mt-1
        bg-background 
        absolute
        transition
        hover:text-primary
        focus:text-primary  
      "
      :class="eyeMargin"
      @click="currentType = 'text'"
    />

    <Icon
      v-if="type === 'password' && currentType === 'text'"
      name="IconEyeOff"
      class="
        w-6 
        pt-1.5
        mt-1
        bg-background 
        absolute 
        transition
        hover:text-primary
        focus:text-primary
      "
      :class="eyeMargin"
      @click="currentType = 'password'"
    />

    <Icon
      v-if="copyMode"
      name="IconCopy"
      class="
        w-6 
        pt-1.5
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
  title: String,

  type: {
    type: String,
    default: "text",
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

const currentType = ref("text");
const eyeMargin = ref("-ml-10");
const id = cryptoStore.getUUID();

const handleInput = (event: Event) => {
  return (event.target as HTMLInputElement).value;
};

const copyToClipboard = () => {
  navigator.clipboard.writeText(props.modelValue);
};

onBeforeMount(() => {
  currentType.value = props.type;

  if (props.type === "password") {
    if (props.copyMode) {
      eyeMargin.value = "-ml-20";
    } else {
      eyeMargin.value = "-ml-10";
    }
  }
});

onBeforeUpdate(() => {
  if (props.type === "password") {
    if (props.copyMode) {
      eyeMargin.value = "-ml-20";
    } else {
      eyeMargin.value = "-ml-10";
    }
  }
});
</script>