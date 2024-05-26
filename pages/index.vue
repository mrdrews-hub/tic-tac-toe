<script setup lang="ts">
const router = useRouter();
const route = useRoute();

const filter = reactive({
  search: ''
})

const { data, error, pending, refresh: refreshRoomList } = await useLazyFetch(`/api/room`, {
  headers: useRequestHeaders(['cookie']),
  query: filter,
  immediate: false,
})
const handleJoinRoom = (id) => {
  router.push(`/${id}`)
}

const handleCreateRoom = async () => {
  const { data, error, pending } = await useFetch('/api/room', {
    headers: useRequestHeaders(['cookie']),
    method: 'post',
    body: {
      name: 'ajigile',
      players: ["", ""]
    }
  })
  if (error.value) {
    throw new Error("Error")
  }
  refreshRoomList()
}
const handleSearchRooms = useDebounceFn(async (keyword) => {
  try {
    filter.search = keyword
  } catch (error) {
    
  }
}, 600) 

// watchDebounced(filter, () => {
//   refreshRoomList({ dedupe: true })
// }, { deep: true, debounce: 500 })
onMounted(() => {
  refreshRoomList()
})
</script>
<template>
  <div class="grid min-h-screen py-24">
    <section id="roomList" class="w-full md:max-w-xl md:mx-auto">
      <RoomList
        :rooms="data?.room"
        :searchValue="filter.search"
        :loading="pending"
        @onJoin="handleJoinRoom"
        @onCreate="handleCreateRoom"
        @onSearch="handleSearchRooms"
      />
    </section>
  </div>
</template>