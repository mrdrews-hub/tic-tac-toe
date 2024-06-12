<script setup lang="ts">
const props = defineProps({
  rooms: Array,
  searchValue: String,
  loading: Boolean,
});
const emits = defineEmits(["onJoin", "onCreate", "onSearch"]);
const isRoomFull = (item) => item?.player?.length === 2;
</script>
<template>
  <div
    class="relative flex min-h-24 flex-col gap-3 rounded-md bg-neutral-800 px-4 py-6"
  >
    <input
      type="search"
      class="input"
      placeholder="Search Rooms..."
      :value="props.searchValue"
      @input="emits('onSearch', $event.target?.value)"
    />
    <div
      v-if="props.loading"
      class="absolute inset-0 flex items-center justify-center bg-black/20"
    >
      <span class="loading loading-bars loading-md"></span>
    </div>
    <div v-if="props.rooms?.length === 0" class="min-h-[200px]">
      No Rooms Available
    </div>
    <div
      v-else
      v-for="(item, index) in props.rooms"
      :key="index"
      class="flex w-full justify-between rounded-lg border-b border-neutral-600 bg-gray-800 px-3 py-4"
    >
      <p class="flex flex-col gap-1">
        {{ item.name }}
        <span class="text-xs text-neutral-400">id: {{ item?.id }}</span>
      </p>
      <button
        type="button"
        class="h-fit rounded-full bg-emerald-600 px-5 py-1 text-white transition-all hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-rose-500"
        :disabled="isRoomFull(item)"
        @click="() => emits('on-join', item.id)"
      >
        {{ isRoomFull(item) ? "Full" : "Join" }}
      </button>
    </div>
    <button
      type="button"
      @click="() => emits('onCreate')"
      class="w-full rounded-md bg-emerald-600 py-2 text-center text-lg font-medium transition-all hover:bg-emerald-700"
    >
      Create Room
    </button>
  </div>
</template>
