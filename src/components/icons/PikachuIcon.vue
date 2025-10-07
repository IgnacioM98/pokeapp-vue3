<script lang="ts" setup>
import Pikachu from '@/assets/pokedex/Pikachu.svg?component'
import CircleRed from '@/assets/pokedex/CircleRed.svg?component'
</script>

<template>
  <div class="flex items-center justify-center mb-8">
    <component :is="CircleRed" class="z-10 mt-14 mr-5" />
    <component :is="Pikachu" class="absolute flex items-center justify-center z-20" />
  </div>
</template>
