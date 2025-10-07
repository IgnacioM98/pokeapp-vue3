import type { Pokemon, PokemonSpecific } from '@/types/Pokemon'

export async function getPokemons(): Promise<Pokemon[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000)) // notorious delay to visualize the loading view
  const response = await fetch('https://pokeapi.co/api/v2/pokemon') // ?limit=100
  const data = await response.json()
  return data.results as Pokemon[]
}

export async function getPokemonByName(name: string): Promise<PokemonSpecific> {
  await new Promise((resolve) => setTimeout(resolve, 1000)) // notorious delay to visualize the loading view
  const url = 'https://pokeapi.co/api/v2/pokemon/' + name
  const response = await fetch(url)
  const data = await response.json()
  return { ...data, url }
}
