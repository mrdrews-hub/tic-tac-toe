<script setup lang="ts">
import type { Player } from "~~/utils/types/player";

interface Props {
  profile: Player;
  isPlaying: boolean;
}

const props = defineProps<Props>()
</script>
<template>
  <div class="relative">
    <div class="absolute inset-0 blur-2xl z-0 transition-all" :class="[isPlaying ? 'opacity-100' : 'opacity-0']" :style="{ backgroundColor: props.profile.color }"></div>
    <div class="rounded-lg flex flex-col gap-3 p-3 w-[160px] items-center z-10 relative" :style="{ backgroundColor: props.profile.color }">
      <section id="avatar">
        <ImageRenderImage :src="props.profile.avatar" class="rounded-lg" />
      </section>
      <section id="playerInfo" class="flex flex-col gap-2 text-center">
        <p class="text-primary-content font-medium">{{ props.profile.name }}</p>
        <p class="text-primary-content font-bold">2 Win</p>
      </section>
    </div>
  </div>
</template>