<template>

  <div
    class="
    bg-background-focus 
    rounded-md 
  "
    @keyup.esc="close()"
    @keydown.enter="modelValue ? saveKey():'' "
  >
    <aside class="">
      <ul class="flex space-x-3 justify-center">

        <li>
          <basic-button
            @click="show = 'info'"
            class="flex justify-center"
          >
            <Icon
              name="IconInfo"
              class="w-6"
            />
            <span class="pl-2">Allgemein</span>
          </basic-button>
        </li>

        <li>
          <basic-button
            @click="show = 'attributes'"
            class="flex justify-center"
          >
            <Icon
              name="IconKeyShield"
              class="w-6"
            />
            <span class="pl-2">Attribute</span>
          </basic-button>
        </li>

        <li v-if="!createMode">
          <basic-button
            @click="show = 'history'"
            class="flex justify-center"
          >
            <Icon
              name="IconHistory"
              class="w-6"
            />
            <span class="pl-2">History</span>
          </basic-button>
        </li>
      </ul>
    </aside>

    <main class="p-4">
      <div class="flex justify-end">
        <Icon
          v-show="!modelValue && !createMode"
          name="IconPencil"
          class="w-6 "
          @click="$emit('update:modelValue', true)"
        />

        <Icon
          v-show="modelValue && !createMode"
          name="IconPencilOff"
          class="w-6 "
          @click="$emit('update:modelValue', false)"
        />
      </div>

      <transition
        :duration="500"
        enter-active-class="fade-in-left"
        leave-active-class="fade-out-right"
        mode="out-in"
      >
        <vault-key-history
          v-if="show ==='history'"
          v-model="key"
        />

        <div
          v-else-if="show === 'attributes'"
          class=""
        >

        </div>

        <div v-else-if="show === 'info'">
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
        </div>

      </transition>
    </main>

    <footer>
      <div class="flex justify-end p-4 space-x-4">
        <basic-button
          v-show="modelValue && !createMode"
          class="
          bg-warning 
          hover:bg-warning-hover 
          focus:bg-warning-focus
        "
          @click="deleteKey"
        >
          Löschen
        </basic-button>

        <basic-button
          @click="saveKey"
          v-show="modelValue"
        >
          Speichern
        </basic-button>

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
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onBeforeUpdate, ref } from "vue";
import { vaultStore, IVaultKey } from "../../store/vault-store";

const props = defineProps({
  keyId: {
    type: String,
    default: "",
  },

  vaultId: {
    type: String,
    default: "",
  },

  parentDirectoryId: {
    type: String,
  },

  modelValue: Boolean,

  createMode: Boolean,
});

const emit = defineEmits(["close", "update:modelValue"]);

const key = ref({} as IVaultKey);
const show = ref("info");

const saveKey = async () => {
  if (props.createMode && key.value.id) {
    const addSuccess = vaultStore.addKey(
      key.value,
      props.parentDirectoryId,
      props.vaultId
    );

    console.log("addSuccess", addSuccess);
    if (addSuccess) {
      const saveSuccess = await vaultStore.saveVault(props.vaultId);
      if (!saveSuccess) vaultStore.deleteKey(key.value.id);
    }
  } else if (!props.createMode && key.value.id) {
    const updateSuccess = await vaultStore.updateKey(key.value);

    console.log("updateSuccess", updateSuccess);
    if (updateSuccess) await vaultStore.saveVault(props.vaultId);
  }
  close();
};

const getKeyDetails = () => {
  if (props.keyId)
    Object.assign(key.value, vaultStore.getKey(props.keyId, props.vaultId));
  else {
    key.value = vaultStore.createKey();
  }
};

const deleteKey = () => {
  vaultStore.deleteKey(props.keyId, props.vaultId);
  close();
};

const restoreKey = (index: number) => {
  console.log("restrore key", index);
  const history = key.value.history;
  Object.assign(key.value, history[index]);
  key.value.history = history;
};

const close = () => {
  emit("close");
  emit("update:modelValue", false);

  key.value = vaultStore.createKey();
};

onBeforeMount(() => {
  //setFocus()
  getKeyDetails();
});

onBeforeUpdate(() => {
  //setFocus()

  if (!key.value.id || key.value.id !== props.keyId) getKeyDetails();
});
</script>