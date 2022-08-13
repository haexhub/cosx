<template>
  <div
    class="bg-background-focus rounded-md p-6 w-full"
    @keyup.enter="saveDirectory()"
    @keyup.esc="close()"
  >
    <!-- 
    parentDirectoryId {{ parentDirectoryId }} <br />
    directory {{ directory }} -->

    <div class="flex flex-col">
      <vault-input
        title="Name"
        type="text"
        v-model="directory.name"
        :readonly="!modelValue"
      />
    </div>

    <div class="flex justify-between pt-2">
      <basic-button
        class="
        bg-warning 
        hover:bg-warning-hover 
        focus:bg-warning-focus
      "
        @click="close"
      >
        Abbrechen
      </basic-button>

      <basic-button @click="saveDirectory()">
        Speichern
      </basic-button>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { IVaultDirectory, vaultStore } from "../../store/vault-store";
import { onBeforeMount, onBeforeUpdate } from "@vue/runtime-core";

const props = defineProps({
  vaultId: {
    type: String,
    required: true,
  },

  directoryId: String,

  modelValue: Boolean,

  createMode: Boolean,

  parentDirectoryId: String,
});

const emit = defineEmits(["close", "update:modelValue"]);

const directory = ref({} as IVaultDirectory);
/* const input = ref(); */

const setFocus = () => {
  /* setTimeout(
    () => (input?.value as HTMLElement)?.getElementsByTagName("input")[0]?.focus()
    , 10) */
};

const getDirectoryDetails = () => {
  if (props.directoryId) {
    directory.value = JSON.parse(
      JSON.stringify(
        vaultStore.getDirectory(
          props.directoryId,
          props.vaultId
        ) as IVaultDirectory
      )
    );
  } else {
    directory.value = vaultStore.createDirectory();
  }
};

const saveDirectory = async () => {
  if (props.createMode && directory.value.id) {
    const addSuccess = vaultStore.addDirectory(
      directory.value,
      props.parentDirectoryId,
      props.vaultId
    );

    if (addSuccess) {
      const saveSuccess = await vaultStore.saveVault(props.vaultId);
      if (!saveSuccess) vaultStore.deleteDirectory(directory.value.id);
    }
  } else if (directory.value.id) {
    const success = await vaultStore.updateDirectory(
      directory.value,
      props.vaultId
    );

    if (success) await vaultStore.saveVault(props.vaultId);
  }
  close();
};

const close = () => {
  emit("close");
  emit("update:modelValue", false);
  directory.value = vaultStore.createDirectory();
};

onBeforeMount(() => {
  //setFocus();
  getDirectoryDetails();
});

onBeforeUpdate(() => {
  //setFocus();

  if (
    !directory.value.id ||
    (props.directoryId && props.directoryId !== directory.value.id)
  )
    getDirectoryDetails();
});
</script>