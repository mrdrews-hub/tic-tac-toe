<script setup lang="ts">
interface Props {
  value: "x" | "o"
}
const props = defineProps<Props>()
</script>
<template>
  <div class="flex justify-center items-center aspect-square border text-4xl font-extrabold hover:bg-primary/30 transition-all hover:cursor-crosshair">
    {{ props.value }}
  </div>
</template>
