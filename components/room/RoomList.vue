<script setup lang="ts">
const props = defineProps({
  rooms: Array
})
const emits = defineEmits(['onJoin'])
const isRoomFull = (item) => item.player.length === 2
</script>
<template>
  <div class="flex flex-col rounded-md bg-neutral-800 px-4 py-6 gap-3">
    <div v-for="(item, index) in props.rooms" :key="index" class="py-4 px-3 bg-gray-800 w-full border-b border-neutral-600 rounded-lg flex justify-between items-center">
      {{ item.name }}
      <button
        type="button"
        class=" px-5 text-white rounded-full bg-emerald-600 hover:bg-emerald-800 disabled:bg-rose-500 disabled:cursor-not-allowed transition-all"
        :disabled="isRoomFull(item)"
        @click="emits('on-join', item.id)"
      >
        {{ isRoomFull(item)  ? 'Full' : 'Join' }}
    </button>
    </div>
    <button type="button" class="py-2 w-full text-center font-medium text-lg bg-emerald-600 hover:bg-emerald-700 transition-all rounded-md">Create Room</button>
  </div>
</template>