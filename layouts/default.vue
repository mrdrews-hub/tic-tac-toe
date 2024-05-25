<script setup lang="ts"></script>
<template>
  <main class="container mx-auto min-h-screen">
    <slot name="header"></slot>
    <slot></slot>
    <slot name="footer"></slot>
  </main>
</template>