<template>
  <ul class="px-2 pb-20">

    <div
      v-show="directories.length < 1 && keys.length < 1"
      class="flex flex-col space-y-2 max-w-sm mt-10 mx-auto"
    >
      <basic-button @click="$emit('createKey')">
        Schlüssel hinzufügen
      </basic-button>
      <basic-button @click="$emit('createDirectory')">
        Gruppe hinzufügen
      </basic-button>
    </div>

    <li
      v-show="directories.length > 0 || keys.length > 0"
      class="flex space-x-4"
    >
      <button class="
        text-left
        text-sm
        py-1
        min-w-84
        px-2
        flex-1
      ">
        Titel
      </button>

      <button
        v-show="keys.length > 0"
        class="
        text-left
        text-sm
        flex-auto
        py-1
        px-2
        hidden sm:block
        min-w-84
      "
      >
        Nutzer
      </button>
    </li>
    <li
      v-for="directory in directories"
      :key="directory.id"
      @click="$emit('select')"
    >
      <vault-list-item
        :vaultId="vaultId"
        :directoryId="directory.id"
        :ref="item"
      />
    </li>

    <li
      v-for="key in keys"
      :key="key.id"
      @click="$emit('select')"
    >
      <vault-list-item
        :vaultId="vaultId"
        :keyId="key.id"
        :ref="item"
      />
    </li>

    <li
      v-if="parentDirectoryId === '' && showTrashDirectory"
      @click="$emit('select')"
    >
      <vault-list-item
        :vaultId="vaultId"
        directoryId="trash"
        :ref="item"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import {
  onBeforeMount,
  onBeforeUpdate,
  PropType,
  ref,
} from "@vue/runtime-core";
import { menuStore } from "../../store/menu-store";
import {
  IKeyValue,
  IVaultDirectory,
  IVaultKey,
  vaultStore,
} from "../../store/vault-store";
import { listStore } from "../../store/list-store";

defineProps({
  directories: {
    type: Array as PropType<IVaultDirectory[]>,
    default: [],
  },

  keys: {
    type: Array as PropType<IVaultKey[]>,
    default: [],
  },

  parentDirectoryId: {
    type: String,
    default: "",
  },

  vaultId: {
    type: String,
    required: true,
  },

  showTrashDirectory: {
    type: Boolean,
    default: true,
  },
});

let items = [] as IKeyValue[];

const item = (el: IKeyValue) => {
  if (
    el?.directoryId &&
    !items.some((item) => item.directoryId === el.directoryId)
  ) {
    items.push(el);
  }

  if (el?.keyId && !items.some((item) => item.keyId === el.keyId)) {
    items.push(el);
  }
};

onBeforeUpdate(() => (items = []));

const markAllItems = () => {
  try {
    items.forEach((item) => {
      item.mark();
    });
    showMarkMenu();
  } catch (error) {
    console.log("ERROR markAllItems", error);
  }
};

const unmarkAllItems = () => {
  try {
    items.forEach((item) => {
      item.unmark();
    });

    listStore.clear();
    menuStore.hideMarkMenu();
    menuStore.showNavbar();
    menuStore.showActionButton();
  } catch (error) {
    console.log("ERROR unmarkAllItems", error);
  }
};

const deleteMarkedItems = async () => {
  console.log("deleteMarkedItems");
  if (
    listStore.getState().directories.length > 0 ||
    listStore.getState().keys.length > 0
  ) {
    await listStore.deleteMarkedItems();
    unmarkAllItems();
  }
};

const showMarkMenu = () => {
  //console.log("showmarkmenu");
  listStore.getState().directories.length > 0 ||
  listStore.getState().keys.length > 0 ||
  listStore.getState().memory.length > 0
    ? menuStore.showMarkMenu() && menuStore.hideActionButton()
    : "";
};

defineExpose({ unmarkAllItems, deleteMarkedItems, showMarkMenu, markAllItems });
</script>