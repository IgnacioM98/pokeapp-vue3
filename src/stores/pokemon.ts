import { defineStore } from 'pinia'
import type { Pokemon, PokemonSpecific } from '@/types/Pokemon'
import { getPokemonByName, getPokemons } from './functions'

interface State {
  pokemons: Pokemon[]
  pokemonSpecific: PokemonSpecific | null
  favorites: string[]
  filter: 'all' | 'favorites'
  query: string
  isLoading: boolean
  modalIsLoading: boolean
}

export const usePokemonStore = defineStore('pokemon', {
  state: (): State => {
    return {
      pokemons: [],
      pokemonSpecific: null,
      favorites: [],
      filter: 'all',
      query: '',
      isLoading: false,
      modalIsLoading: false,
    }
  },
  getters: {
    filteredPokemons: (state): Pokemon[] => {
      if (state.filter === 'all') {
        return state.pokemons
      }
      return state.pokemons.filter((pokemon) => state.favorites.includes(pokemon.name))
    },
    Pokemons: (state): Pokemon[] => {
      if (state.filter === 'all') {
        return state.pokemons
      }
      return state.pokemons.filter((pokemon) => state.favorites.includes(pokemon.name))
    },
  },
  actions: {
    setPokemons(pokemons: Pokemon[]) {
      this.pokemons = pokemons
    },
    setFavorites(pokemons: Pokemon[]) {
      this.pokemons = pokemons
    },
    setLoading(isLoading: boolean) {
      this.isLoading = isLoading
    },
    setQuery(query: string) {
      this.query = query
    },
    toggleFavorite(pokemonIdOrName: string): void {
      const index = this.favorites.indexOf(pokemonIdOrName)
      if (index === -1) {
        this.favorites.push(pokemonIdOrName)
      } else {
        this.favorites.splice(index, 1)
      }
    },
    toggleFilter(): void {
      this.filter = this.filter === 'all' ? 'favorites' : 'all'
    },
    async searchPokemons(): Promise<void> {
      this.isLoading = true
      this.query = ''
      this.pokemons = []
      this.pokemonSpecific = null

      try {
        const result = await getPokemons()
        this.pokemons = result
      } catch (error) {
        console.error('Error getting pokemons:', error)
      } finally {
        this.isLoading = false
      }
    },
    async searchSpecificPokemon(name: string, updateList: boolean): Promise<void> {
      if (updateList) {
        this.isLoading = true
        this.pokemons = []
        this.query = name
      } else {
        this.modalIsLoading = true
        this.pokemonSpecific = null
      }

      try {
        const result = await getPokemonByName(name)
        if (updateList) {
          this.pokemons = [result]
          this.filter = 'all'
        } else {
          this.pokemonSpecific = result
        }
      } catch (error) {
        console.error('Error getting specific pokemon:', error)
      } finally {
        this.isLoading = false
        this.modalIsLoading = false
      }
    },
  },
})
