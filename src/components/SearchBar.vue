<script setup lang="ts">
import { ref } from 'vue'
import SearchLens from '@/assets/SearchLens.svg?component'
import { usePokemonStore } from '@/stores/pokemon'
const pokemonStore = usePokemonStore()

const searchValue = ref<string>(pokemonStore.query || '')

const handleSearch = (): void => {
  const trimmedValue = searchValue.value.trim()

  if (trimmedValue.length > 0) {
    pokemonStore.searchSpecificPokemon(trimmedValue, true)
    // searchValue.value = '' // clear input after search
  } else if (trimmedValue.length === 0) {
    // if input is cleared reset the list
    pokemonStore.searchPokemons()
  }
}
</script>

<template>
  <div class="w-full my-10">
    <form @submit.prevent="handleSearch" name="searchForm">
      <div class="relative flex items-center">
        <component :is="SearchLens" class="absolute left-4" fill="#BFBFBF" />
        <input
          name="query"
          placeholder="Search"
          v-model="searchValue"
          class="w-full py-3 pl-12 pr-6 h-[50px] search-bar"
        />
      </div>
    </form>
  </div>
</template>

<style scoped>
.search-bar {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  border-radius: 5px;
}
</style>
