<script setup lang="ts">
import type { Player } from "~~/utils/types/player";

interface Props {
  profile: Player;
  isPlaying: boolean;
}

const props = defineProps<Props>();
</script>
<template>
  <div class="relative">
    <div
      class="absolute inset-0 z-0 blur-2xl transition-all"
      :class="[isPlaying ? 'opacity-100' : 'opacity-0']"
      :style="{ backgroundColor: props.profile.color }"
    ></div>
    <div
      class="relative z-10 flex w-[160px] flex-col items-center gap-3 rounded-lg p-3"
      :style="{ backgroundColor: props.profile.color }"
    >
      <section id="avatar">
        <ImageRenderImage :src="props.profile.avatar" class="rounded-lg" />
      </section>
      <section id="playerInfo" class="flex flex-col gap-2 text-center">
        <p class="font-medium text-primary-content">{{ props.profile.name }}</p>
        <p class="font-bold text-primary-content">2 Win</p>
      </section>
    </div>
  </div>
</template>
