<script setup lang="ts">
const props = defineProps({
  countdown: Number,
  player: Object,
});
</script>
<template>
  <div
    class="flex w-full max-w-md flex-col items-center justify-center rounded-md bg-primary p-4 text-primary-content"
  >
    <Transition :name="'slide-up'" mode="out-in">
      <p class="text-3xl font-bold" :key="props.player">
        <span :style="{ color: props.player.color }">{{
          props.player.name
        }}</span>
        Turn's
      </p>
    </Transition>

    <div class="flex flex-col">
      <span class="font-mono text-5xl font-bold">
        <Transition
          :name="props.countdown < 10 ? 'slide-up' : null"
          mode="out-in"
        >
          <span
            :class="[
              props.countdown < 10 ? 'text-rose-600' : 'text-emerald-600',
            ]"
            :key="props.countdown"
            class="countdown"
            >{{ props.countdown }}</span
          >
        </Transition>
      </span>
    </div>
  </div>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
