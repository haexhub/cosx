<template>
  <div>
    <ul>
      <li
        v-for="(attribute, index) in attributes"
        :key="index"
        class="grid grid-cols-2"
      >

        <basic-input>
          {{ Object.keys(attribute)[0] }}
        </basic-input>

        <basic-input>
          {{ Object.values(attribute)[0] }}
        </basic-input>

      </li>

      <li class="grid grid-cols-2">
        <basic-input>
        </basic-input>
        <basic-input>
        </basic-input>

        <Icon
          name="IconPlus"
          class="w-6"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "@vue/runtime-core";
import { IKeyValue } from "../../store/vault-store";

defineProps({
  attributes: {
    type: Array as PropType<IKeyValue[]>,
  },
});
</script>