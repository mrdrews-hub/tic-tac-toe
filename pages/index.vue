<script setup lang="ts">
const router = useRouter();
const rooms = [
  {
    id: 1,
    name: 'Andru Room',
    player: []
  },
  {
    id: 2,
    name: 'Party ges',
    player: []
  },
  {
    id: 3,
    name: 'Mid Or Feed',
    player: ['', '']
  },
]

const handleJoinRoom = (id) => {
  router.push(`/${id}`)
}
</script>
<template>
  <div class="grid min-h-screen py-24">
    <section id="roomList" class="w-full md:max-w-xl md:mx-auto">
      <RoomList :rooms="rooms" @onJoin="handleJoinRoom" />
    </section>
  </div>
</template>