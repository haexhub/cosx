<template>
  <div>test

    menuStore

    {{store.isMarkMenuVisible}}

    {{ vaultStore.rootDirectoryId}}
  </div>
</template>

<script setup lang="ts">
import { useMenuStore } from "@/store/menu-store";
import { useVaultStore } from "@/store/vault-store";
const store = useMenuStore();
const vaultStore = useVaultStore();
</script>