<script setup lang="ts">
import PokeballIcon from './icons/PokeballIcon.vue'
</script>

<template>
  <div class="grid h-screen place-items-center">
    <PokeballIcon class="loader" />
  </div>
</template>

<style scoped>
.loader {
  animation: anim 2s infinite;
}
@keyframes anim {
  to {
    transform: rotate(1turn);
  }
}
</style>
