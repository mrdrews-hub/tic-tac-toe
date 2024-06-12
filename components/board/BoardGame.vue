<script setup lang="ts">
import type { Player } from "~/utils/types/player";

interface Props {
  players: Player[];
  currentPlaying: Player;
  rows: string[][];
}
const props = defineProps<Props>();
const emits = defineEmits(["onMove", "onFinish", "onInvalidMove"]);

const tileColor = (tile: string) => {
  return props.players.filter((p) => p.tile === tile).map((p) => p.color)[0];
};
</script>

<template>
  <div class="grid max-w-[700px] grid-cols-3 rounded-md border-2">
    <div
      v-for="(row, rowIndex) in rows"
      :key="rowIndex"
      class="w-full bg-gray-400"
    >
      <div
        v-for="(col, colIndex) in row"
        :key="colIndex"
        @click="() => emits('onMove', rowIndex, colIndex)"
        class="flex aspect-square items-center justify-center border text-4xl font-extrabold text-white transition-all hover:bg-primary/30"
        :class="[
          rows[rowIndex][colIndex] ? 'cursor-not-allowed' : 'cursor-crosshair',
        ]"
        :style="{ backgroundColor: tileColor(rows[rowIndex][colIndex]) }"
      >
        {{ rows[rowIndex][colIndex] }}
      </div>
    </div>
  </div>
</template>
