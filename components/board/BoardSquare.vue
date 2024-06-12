<script setup lang="ts">
interface Props {
  value: "x" | "o";
}
const props = defineProps<Props>();
</script>
<template>
  <div
    class="flex aspect-square items-center justify-center border text-4xl font-extrabold transition-all hover:cursor-crosshair hover:bg-primary/30"
  >
    {{ props.value }}
  </div>
</template>
