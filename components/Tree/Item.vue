<template>
  <li class="ml-6 bg-red-400">
    <div class="px-2 hover:bg-primary flex"  @click="disabled = !disabled">
      <input
        type="text"
        :disabled="disabled"
        :id="id"
        v-model="item.name"
        class="bg-transparent w-full"
        @click="() => { 
          console.log('awdawd')
          disabled = !disabled}"
        
      />
      {{  disabled }}
    </div>

    <Tree :items="item?.items"> </Tree>
  </li>
</template>

<script setup lang="ts">
interface IItem {
  name: string
  items: IItem[]
}

const props = defineProps({
  item: {
    type: Object as PropType<IItem>,
    default: () => ({ name: '', items: [] }),
  },
})

const id = `id_${Math.random()}`
const disabled = ref(true)

onBeforeMount(() => {
  props.item.items = props.item?.items ?? []
  props.item.name = props.item?.name ?? ''
})
</script>
