export interface Pokemon {
  name: string
  url: string
}

export interface PokemonSpecific extends Pokemon {
  id: string
  height: number
  weight: number
  types: { slot: number; type: { name: string; url: string } }[]
  sprites: {
    front_default: string | null
    other?: {
      'official-artwork'?: {
        front_default: string | null
      }
    }
  }
}
