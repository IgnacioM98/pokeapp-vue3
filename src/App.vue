<script lang="ts" setup>
import LoadingView from './views/LoadingView.vue'
import { usePokemonStore } from '@/stores/pokemon'
const pokemonStore = usePokemonStore()
</script>

<template>
  <LoadingView v-if="pokemonStore.isLoading" />
  <main v-else>
    <RouterView />
  </main>
</template>
