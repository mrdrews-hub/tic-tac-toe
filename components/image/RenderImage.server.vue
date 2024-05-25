
<script setup>
const props = defineProps({
  src: String
})
</script>
<template>
  <NuxtImg :src="props.src" preset="avatar" />
</template>