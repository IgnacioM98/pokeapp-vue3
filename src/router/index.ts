import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { usePokemonStore } from '@/stores/pokemon'
import { getPokemons } from '@/stores/functions'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/loading',
      name: 'loading',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoadingView.vue'),
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('../views/PokelistView.vue'),
      beforeEnter: async () => {
        const pokemonStore = usePokemonStore()
        pokemonStore.setLoading(true)
        pokemonStore.setQuery('')
        try {
          const pokemons = await getPokemons()
          pokemonStore.setPokemons(pokemons)
          // next() // proceed to the route normally
        } catch (error) {
          console.error('Error getting pokemons:', error)
          // next(false)
          return { name: 'home' } // Back to welcome view on error
        } finally {
          pokemonStore.setLoading(false)
        }
      },
    },
  ],
})

export default router
