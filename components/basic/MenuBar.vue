<template>
  <div class="
    bg-background-overlay
    fixed 
    bottom-0 
    left-0 
    w-full 
    h-16 
  ">
    <button class="
      bg-primary
      hover:bg-primary-hover
      duration-500
      transform
      rotate-45 
      w-16
      h-16
      mx-auto
      relative 
      bottom-8
      rounded
      hover:ring
      block
      z-50
    " @click.capture="toogleMenu" @blur="hideMenu">

      <ul v-show="isVisible" class="
            -mt-20
            -ml-25
            absolute 
            w-32
            -rotate-45
            transform
          ">
        <li class="
              transition-opacity 
              duration-500 
              flex 
              mb-1
            " :class="opacity">
          <button class="
                p-2 
                rounded 
                hover:bg-primary
                duration-500
              " @click="showCreateKey">

            <span class="text-md">
              Schlüssel
            </span>

            <Icon name="IconKey" class="w-6 pl-2" />
          </button>
        </li>

        <li class="transition-all duration-500" :class="opacity">
          <button class="
              p-2 
              rounded 
              hover:bg-primary 
              duration-500
            " @click="showCreateDirectory">

            <span class="text-md">
              Ordner
            </span>

            <Icon name="IconFolder" class="w-6 pl-2" />
          </button>
        </li>

      </ul>

      <Icon class="
          w-12
          mt-1.5
          duration-300 
          cursor-pointer 
          transform
        " :class="rotate" name="IconPlus" @blur="hideMenu" />
    </button>

    <div class="absolute top-0 w-full h-full mx-auto">
      <div class="flex p-4 space-x-4 justify-around max-w-5xl mx-auto">
        <NuxtLink to="/vault">
          <Icon name="IconDungeon" class="w-8 hover:text-primary" />
        </NuxtLink>

        <NuxtLink to="/message">
          <Icon name="IconMessage" class="w-8 hover:text-primary" />
        </NuxtLink>

        <NuxtLink to="/storage">
          <Icon name="IconSDCard" class="w-8 hover:text-primary" />
        </NuxtLink>

        <NuxtLink to="/calendar">
          <Icon name="IconCalendar" class="w-8 hover:text-primary" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, } from "@vue/reactivity";
import { onBeforeMount, onBeforeUpdate } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { IVaultDirectory, IVaultKey, useVaultStore } from "@/composables/vault-store";

const route = useRoute()

const vaultStore = useVaultStore()

const isVisible = ref(false)
const isOverlayVisible = ref(false)
const isKey = ref(false)
const isDirectory = ref(false)

const opacity = ref("opacity-0");
const margin = ref("-mt-10");
const rotate = ref("rotate-45");

const hashParams = reactive({
  vaultId: "",
  directoryId: ""
})

const showMenu = () => {
  isVisible.value = true
  setTimeout(() => {
    opacity.value = "opacity-100";
    margin.value = "-mt-20";
    rotate.value = "rotate-180";
  }, 10);
}

const hideMenu = () => {
  opacity.value = "opacity-0";
  margin.value = "-mt-10";
  rotate.value = "rotate-45";
  setTimeout(() => {
    isVisible.value = false;
  }, 500);
}

const toogleMenu = () => {
  if (isVisible.value)
    hideMenu()
  else
    showMenu()
}

const showCreateKey = () => {
  isOverlayVisible.value = true;
  isKey.value = true;
  isDirectory.value = false;
};

const showCreateDirectory = () => {
  isOverlayVisible.value = true;
  isKey.value = false;
  isDirectory.value = true;
};

const createNewDirectory = async (directory: IVaultDirectory) => {
  try {
    const success = await vaultStore.addDirectory(
      directory,
      hashParams.directoryId
    );
    if (success) await vaultStore.saveVault(hashParams.vaultId);
  } catch (error) { }
}

const createNewKey = async (newKey: IVaultKey) => {
  try {
    const success = await vaultStore.addKey(
      newKey,
      hashParams.directoryId
    );
    if (success) await vaultStore.saveVault(hashParams.vaultId);
  } catch (error) { }
}

onBeforeMount(() => {
  //Object.assign(hashParams, vaultStore.extractHashParams(route.hash))
})

onBeforeUpdate(() => {
  //Object.assign(hashParams, vaultStore.extractHashParams(route.hash))
})
</script>