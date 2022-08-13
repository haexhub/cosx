<template>

  <button
    class="
      flex 
      w-full
      py-1
      px-2
      transition
      ease-in-out
      my-1
      space-x-2
      overflow-x-hidden
    "
    :class="[
      !isMarked ? defaultClass : '',
      isDirectory && !isMarked ? directoryClass : '',
    
      isKey && !isMarked ? keyClass : '',
    
      isMarked ? markClass : ''
    ]"
    @click.exact.stop="isMarked ? unmark() : select()"
    @click.ctrl.stop="toogleMark()"
    @contextmenu.prevent="toogleMark()"
  >
    <span class="
      text-left
      min-w-84
      h-6
      overflow-hidden
      flex-1
    ">
      {{ text }}
    </span>

    <span
      v-show="isKey"
      class="min-w-84 h-6 text-left overflow-hidden flex-1 pr-6 w-0 hidden sm:block"
    >
      {{ key.username }}
    </span>

    <Icon
      v-show="isMarked"
      name="IconPencil"
      class="w-6 mr-4 absolute z-10 right-6"
      @click.capture.stop="editItem()"
    />
  </button>

  <basic-overlay v-model="isOverlayVisible">
    <vault-key
      v-if="isKey"
      :parentDirectoryId="props.parentDirectoryId"
      :keyId="props.keyId"
      :vaultId="props.vaultId"
      v-model="editMode"
      @close="isOverlayVisible = false"
    />

    <vault-directory
      v-if="isDirectory"
      :parentDirectoryId="props.parentDirectoryId"
      :directoryId="props.directoryId"
      :vaultId="props.vaultId"
      v-model="editMode"
      @close="isOverlayVisible = false"
    />
  </basic-overlay>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, onBeforeUpdate, reactive } from "vue";

import { useRouter } from "vue-router";
import {
  vaultStore,
  IVaultDirectory,
  IVaultKey,
} from "../../store/vault-store";

import { listStore } from "../../store/list-store";

const props = defineProps({
  vaultId: {
    type: String,
    required: true,
  },
  directoryId: {
    type: String,
    default: "",
  },
  keyId: {
    type: String,
    default: "",
  },
  parentDirectoryId: {
    type: String,
    default: "rootDirectory",
  },
});

const router = useRouter();

const directory = reactive({} as IVaultDirectory);
const key = reactive({} as IVaultKey);

const isMarked = ref(false);
const isDirectory = ref(false);
const isKey = ref(false);
const isOverlayVisible = ref(false);

const refListItem = ref();
const editMode = ref(false);

const defaultClass =
  "border border-slate-200 focus:border-none focus:bg-background-focus focus:outline hover:border-none hover:bg-background-hover hover:outline";
const directoryClass =
  "text-directory hover:text-directory-hover focus:text-directory-hover";
const keyClass = "text-key hover:text-key-hover focus:text-key-focus";
const markClass = "ring ring-red-200";

const text = ref("");

const mark = () => {
  isMarked.value = true;

  if (isDirectory.value) {
    listStore.mark({ directoryId: props.directoryId });
  } else {
    listStore.mark({ keyId: props.keyId });
  }
};

const unmark = () => {
  isMarked.value = false;

  if (isDirectory.value) {
    listStore.unmark({ directoryId: directory.id });
  } else {
    listStore.unmark({ keyId: key.id });
  }
};

const toogleMark = () => {
  if (isMarked.value) {
    unmark();
  } else {
    mark();
  }
};

const getDirectoryDetails = () => {
  if (props.directoryId) {
    isDirectory.value = true;
    isKey.value = false;

    Object.assign(
      directory,
      vaultStore.getDirectory(props.directoryId, props.vaultId)
    );

    text.value = directory.name || "";
  }
};

const editItem = () => {
  console.log("editItem");
  editMode.value = true;
  isOverlayVisible.value = true;
};

const getKeyDetails = () => {
  if (props.keyId) {
    isDirectory.value = false;
    isKey.value = true;

    Object.assign(key, vaultStore.getKey(props.keyId, props.vaultId));
    text.value = key.title || "";
  }
};

/* const saveKey = async (key: IVaultKey) => {
  try {
    //console.log("item savekey", key)
    await vaultStore.saveKey(key);
  } catch (error) {
    console.log("ERROR Item saveKey", error);
  }
}; */

const select = () => {
  if (isDirectory.value)
    router.push({
      hash: `#vaultId=${props.vaultId}&directoryId=${props.directoryId}`,
    });
  else if (isKey.value) {
    isKey.value = true;
    isDirectory.value = false;
    isOverlayVisible.value = true;
  }
};

onBeforeMount(() => {
  getDirectoryDetails();
  getKeyDetails();
});

onBeforeUpdate(() => {
  getKeyDetails();
  getDirectoryDetails();
});

defineExpose({
  mark,
  unmark,
  directoryId: props.directoryId,
  keyId: props.keyId,
});
</script>
