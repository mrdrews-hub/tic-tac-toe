<script setup lang="ts">
import type { Player } from '~/utils/types/player';

const router = useRouter();
const route = useRoute();
const userId = useCookie('_nID')

const filter = reactive({
  search: ''
})

const { data, error, pending, refresh: refreshRoomList } = await useLazyFetch(`/api/room`, {
  headers: useRequestHeaders(['cookie']),
  query: filter,
  immediate: false,
})

const handleCheckUser = () => {
  
}

const lastSelectedRoom = ref(null)
const handleJoinRoom = (id) => {
  if (!localStorage.getItem('user')) {
    shouldCreateUser.value = true
    lastSelectedRoom.value = id
    return
  }
  router.push(`/${id}`)
}

const handleCreateRoom = async (autoJoin = false) => {
  if (!localStorage.getItem('user')) {
    shouldCreateUser.value = true
    actionAfterCreate.value = "create"
    return
  }
  const user1 = JSON.parse(localStorage.getItem('user'))
  const { data, error, pending } = await useFetch('/api/room', {
    headers: useRequestHeaders(['cookie']),
    method: 'post',
    body: {
      name: 'ajigile',
      players: [user1, ""]
    }
  })
  if (error.value) {
    throw new Error("Error")
  }
  if (autoJoin) {
    router.push(`/${data.value?.data[0]?.id}`)  
  }
  refreshRoomList()
}
const handleSearchRooms = useDebounceFn(async (keyword) => {
  try {
    filter.search = keyword
  } catch (error) {
    
  }
}, 600) 

const shouldCreateUser = ref(false)
const actionAfterCreate = ref('create')
const handleCreateUser = (value: Partial<Player>) => {
  const user = {
    avatar: value.avatar,
    color: value.color,
    id: userId.value,
    name: value.name,
    tile: null,
    win: 0
  }
  localStorage.setItem('user', JSON.stringify(user))
  shouldCreateUser.value = false
  if (actionAfterCreate.value === 'join') {
    router.push(`/${lastSelectedRoom.value}`)
  } else {
    handleCreateRoom(true)
  }
}
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
    <PlayerModalCreatePlayer @create-user="(value) => handleCreateUser(value)" :show="shouldCreateUser" />
  </div>
</template>