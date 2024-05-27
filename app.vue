<script setup>
const userId = useCookie('_nID')

userId.value = userId.value || crypto.randomUUID()
</script>
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
