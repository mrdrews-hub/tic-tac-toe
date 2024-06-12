<script setup>
import { nanoid } from "nanoid";
const userId = useCookie("_nID");

userId.value = userId.value || nanoid();
</script>
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
