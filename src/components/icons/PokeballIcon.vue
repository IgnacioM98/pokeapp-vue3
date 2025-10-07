<script lang="ts" setup>
import Pokeball from '@/assets/Pokeball.svg?component'
</script>

<template>
  <div class="flex items-center justify-center">
    <component :is="Pokeball" class="z-10" />
  </div>
</template>
