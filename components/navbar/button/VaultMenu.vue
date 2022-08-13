<template>

  <ul
    v-show="menuStore.isActionButtonMenuVisible"
    class="
      -mt-30
      -ml-25
      w-60
      absolute 
      flex
      flex-col
      justify-center
    "
  >
    <li
      @click="$emit('openVault')"
      class="mb-1"
    >
      <button class="
        py-1
        px-2
        md:py-2
        md:px-3
        rounded 
        z-0
        hover:bg-primary
      ">

        <span class="text-md">
          Vault öffnen
        </span>

        <Icon>
          <IconDungeon class="w-6 pl-2" />
        </Icon>
      </button>
    </li>

    <li
      @click="$emit('createVault')"
      class="mb-1"
    >
      <button class="
        py-1
        px-2
        md:py-2
        md:px-3
        rounded 
        z-0
        hover:bg-primary
      ">

        <span class="text-md">
          neue Vault erstellen
        </span>

        <Icon>
          <IconPlus class="w-6 pl-2" />
        </Icon>
      </button>
    </li>
  </ul>

</template>

<script setup lang="ts">
import { useMenuStore } from "@/store/menu-store";

const menuStore = useMenuStore();
</script>