<script setup lang="ts">
import BasicButton from './BasicButton.vue'
import MenuIcon from '@/assets/MenuIcon.svg?component'
import FavoriteIcon from '@/assets/FavoriteIcon.svg?component'
import { usePokemonStore } from '@/stores/pokemon'
const pokemonStore = usePokemonStore()

const onPress = (name: 'all' | 'favorites'): void => {
  if (pokemonStore.filter !== name) {
    pokemonStore.toggleFilter()
  } else {
    // refresh the list
    pokemonStore.searchPokemons()
  }
}

const isActive = (name: 'all' | 'favorites'): boolean => pokemonStore.filter === name
</script>

<template>
  <footer class="fixed-footer py-4">
    <div class="flex flex-row max-w-[570px] w-full buttons-container">
      <BasicButton @click="onPress('all')" :active="isActive('all')" class="button">
        <template #icon>
          <component :is="MenuIcon" fill="#ffffff" />
        </template>
        All
      </BasicButton>
      <BasicButton @click="onPress('favorites')" :active="isActive('favorites')" class="button">
        <template #icon>
          <component :is="FavoriteIcon" fill="#ffffff" />
        </template>
        Favorites
      </BasicButton>
    </div>
  </footer>
</template>

<style scoped>
.fixed-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: white;
  display: grid;
  place-items: center;
  z-index: 1000;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
}

.buttons-container {
  justify-content: space-around;
}

@media (min-width: 700px) {
  .buttons-container {
    justify-content: space-between;
  }
}

.button {
  width: 150px;
}
@media (min-width: 500px) {
  .button {
    width: 220px;
  }
}
@media (min-width: 900px) {
  .button {
    width: 275px;
  }
}
</style>
