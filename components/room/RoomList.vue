<script setup lang="ts">
const props = defineProps({
  rooms: Array,
  searchValue: String,
  loading: Boolean
})
const emits = defineEmits(['onJoin', 'onCreate', 'onSearch'])
const isRoomFull = (item) => item?.player?.length === 2
</script>
<template>
  <div class="relative flex flex-col rounded-md bg-neutral-800 px-4 py-6 gap-3 min-h-24">
    <input type="search" class="input" placeholder="Search Rooms..." :value="props.searchValue" @input="emits('onSearch', $event.target?.value)">
    <div v-if="props.loading" class="absolute inset-0 bg-black/20 flex justify-center items-center">
      <span class="loading loading-bars loading-md"></span>
    </div>
    <div v-if="props.rooms?.length === 0" class="min-h-[200px]">
      No Rooms Available
    </div>
    <div v-else v-for="(item, index) in props.rooms" :key="index" class="py-4 px-3 bg-gray-800 w-full border-b border-neutral-600 rounded-lg flex justify-between">
      <p class="flex flex-col gap-1">
        {{ item.name }}
        <span class="text-xs text-neutral-400">id: {{ item?.id }}</span>
      </p>
      <button
        type="button"
        class="px-5 py-1 h-fit text-white rounded-full bg-emerald-600 hover:bg-emerald-800 disabled:bg-rose-500 disabled:cursor-not-allowed transition-all"
        :disabled="isRoomFull(item)"
        @click="() => emits('on-join', item.id)"
      >
        {{ isRoomFull(item)  ? 'Full' : 'Join' }}
    </button>
    </div>
    <button type="button" @click="() => emits('onCreate')" class="py-2 w-full text-center font-medium text-lg bg-emerald-600 hover:bg-emerald-700 transition-all rounded-md">Create Room</button>
  </div>
</template>