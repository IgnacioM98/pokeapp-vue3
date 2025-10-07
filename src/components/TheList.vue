<script setup lang="ts">
import { usePokemonStore } from '@/stores/pokemon'
import { ref, watch } from 'vue'
import BasicButton from './BasicButton.vue'
import ListItem from './ListItem.vue'
import LoadingModal from './LoadingModal.vue'
import PokemonModal from './PokemonModal.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const redirect = () => router.replace('/')

const pokemonStore = usePokemonStore()

const openModal = ref<boolean>(false)

const onCloseModal = () => (openModal.value = false)

const onFavorite = (id: string): void => pokemonStore.toggleFavorite(id)
const onSelect = async (id: string): Promise<void> => pokemonStore.searchSpecificPokemon(id, false)
const isFavorite = (id: string): boolean => pokemonStore.favorites.includes(id)

watch(
  () => pokemonStore.pokemonSpecific,
  (newValue) => {
    openModal.value = newValue ? true : false
  },
  { deep: false },
)
</script>

<template>
  <ListItem
    v-for="pokemon in pokemonStore.filteredPokemons"
    :key="pokemon.name"
    :label="pokemon.name"
    :id="pokemon.name"
    :active="isFavorite(pokemon.name)"
    @favorite="onFavorite"
    @select="onSelect"
  />
  <div
    v-if="pokemonStore.filteredPokemons.length === 0 && pokemonStore.filter == 'all'"
    class="flex flex-col items-center gap-4 text-center"
  >
    <div class="text-lato-bold lato-title">Uh-oh!</div>
    <div class="text-lato-normal lato-subtitle max-w-[560px]">You look lost on your journey!</div>
    <BasicButton @click="redirect" active class="mt-4">Go back home</BasicButton>
  </div>
  <PokemonModal
    v-if="pokemonStore.pokemonSpecific"
    :active="isFavorite(pokemonStore?.pokemonSpecific?.name || '')"
    :pokemon-specific="pokemonStore.pokemonSpecific"
    :is-open="openModal"
    @favorite="onFavorite"
    @close="onCloseModal"
  />
  <LoadingModal :is-open="pokemonStore.modalIsLoading" />
</template>

<style scoped>
.lato-title {
  font-size: 36px;
  color: #353535;
}
.lato-subtitle {
  font-size: 20px;
  color: #5e5e5e;
}
</style>
