<template>

  <div class="flex flex-col">
    <vault-input
      v-show="key.title || modelValue"
      title="Title"
      type="text"
      v-model="key.title"
      :copyMode="!modelValue"
      :readonly="!modelValue"
    />

    <vault-input
      v-show="key.username || modelValue"
      title="Nutzername"
      type="text"
      v-model="key.username"
      :copyMode="!modelValue"
      :readonly="!modelValue"
    />

    <vault-input
      v-show="key.password || modelValue"
      title="Passwort"
      type="password"
      v-model="key.password"
      :copyMode="!modelValue"
      :readonly="!modelValue"
    />

    <basic-textarea
      v-show="key.description || modelValue"
      v-model="key.description"
      :copyMode="!modelValue"
      :readonly="!modelValue"
      title="Beschreibung"
    ></basic-textarea>
  </div>

</template>


<script setup lang="ts">
import { PropType } from "@vue/runtime-core";
import { IVaultKey } from "../../store/vault-store";

const props = defineProps({
  editMode: Boolean,
  modelValue: Object as PropType<IVaultKey>,
});
</script>