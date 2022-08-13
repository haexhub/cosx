<template>
  <div class="py-6">
    <div class="
      w-full 
      flex 
      items-center 
      justify-center
    ">

      <Icon>
        <IconDungeon class="
          w-20
          opacity-10
          text-light-50
        " />
      </Icon>

      <h1
        v-if="!onlyIcon"
        class="
          absolute
          flex 
          flex-col 
          text-light-100 
          text-lg
          text-center 
          expanse 
          font-bold
          expanse 
        "
      >
        <span>Chamber</span>
        <span class="text-sm">of</span>
        <span class="text-primary">Secrets</span>

      </h1>
    </div>
  </div>

</template>

<script setup lang="ts">
defineProps({
  onlyIcon: Boolean,
});
</script>