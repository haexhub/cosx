<template>
  <div class="">
    <ul class="">
      <li class="
        grid
        grid-cols-2 
        space-x-8 
        mb-2 
        shadow 
        shadow-lg 
        shadow-background
      ">
        <span class="py-1 text-right">
          letzte Änderung
        </span>
        <span class="py-1 text-left">
          Title
        </span>
      </li>

      <li
        v-for="(history, index) in modelValue.history"
        :key="history
            .last_modified
            ?.toString()"
        class="
          grid 
          grid-cols-2 
          space-x-8
          rounded 
          transition 
          hover:ring
          hover:bg-background
        "
        @click="restoreKey(index)"
      >
        <button class="flex justify-end">

          <span class="w-20">{{
            new Date(
              history
                .last_modified
                ?.toString() || ""
            )
              ?.toLocaleDateString()
          }}
          </span>

          <span>-</span>

          <span class="w-18 text-left px-2">
            {{
            new Date(
              history
                .last_modified
                ?.toString() || ""
            )
              ?.toLocaleTimeString()
          }}
          </span>
        </button>

        <button class="text-left">
          {{ history.title }}
        </button>

      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "@vue/runtime-core";
import { IVaultKey } from "../../store/vault-store";

const props = defineProps({
  modelValue: {
    type: Object as PropType<IVaultKey>,
    required: true,
  },
});

const restoreKey = (index: number) => {
  const history = props.modelValue.history;
  Object.assign(props.modelValue, history[index]);
  props.modelValue.history = history;
};
</script>