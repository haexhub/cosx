<template>
  <div>
    <vault-input
      id="password"
      title="Passwort"
      type="password"
      v-model="password"
      @keyup.enter.stop="handleEnter"
    />
    <div class="flex justify-between pt-2">
      <basic-button
        class="
        bg-warning 
        focus:bg-warning-focus 
        hover:bg-warning-hover"
        @click="$emit('close')"
      >Abbrechen</basic-button>

      <basic-button
        v-if="newVault"
        @click.prevent="createVault"
      >Speichern</basic-button>

      <basic-button
        v-else
        @click.prevent="openVault"
      >Öffnen</basic-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { PropType } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { vaultStore, IFileSystemFileHandle } from "../../store/vault-store";
import { cryptoStore } from "../../store/crypto-store";

const props = defineProps({
  fileHandle: {
    type: Object as PropType<IFileSystemFileHandle>,
    required: true,
  },
  newVault: Boolean,
});

const emit = defineEmits(["close"]);

const router = useRouter();

const password = ref("");

const openVault = async () => {
  try {
    console.log("openVault");
    const vault = await cryptoStore.decryptVaultFileHandle(
      props.fileHandle,
      password.value
    );

    if (!vault) return;

    const success = vaultStore.addVaultFile(vault);

    if (success) {
      emit("close");
      setTimeout(() => {
        router.push({
          path: "/vault",
          hash: `#vaultId=${vault.id}`,
        });
      }, 300);
    }
  } catch (error) {
    console.log("ERROR openVault", error);
  }
};

const createVault = async () => {
  try {
    if (!props.fileHandle) return false;

    const newVault = Object.assign({}, vaultStore.templateNewVault);
    newVault.password = password.value;
    newVault.fileHandle = props.fileHandle;

    if (newVault.id) {
      const successAddVaultFile = vaultStore.addVaultFile(newVault);

      if (!successAddVaultFile) return false;

      const success = await vaultStore.saveVault(newVault.id);

      if (success) {
        emit("close");
        setTimeout(() => {
          router.push({
            path: "/vault",
            hash: `#vaultId=${newVault.id}`,
          });
        }, 300);
      }
    }
  } catch (error) {
    console.log("ERROR openvault", error);
  }
};

const handleEnter = async () => {
  try {
    if (props.newVault) {
      await createVault();
    } else {
      await openVault();
    }
  } catch (error) {}
};
</script>