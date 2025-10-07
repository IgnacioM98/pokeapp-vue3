<script setup lang="ts">
import PokeBackground from '@/assets/PokeBackground.svg?component'
import FavoriteIcon from '@/assets/FavoriteIcon.svg?component'
import BasicButton from './BasicButton.vue'
import IconButton from './IconButton.vue'
import CloseCircle from '@/assets/CloseCircle.svg?component'
import type { PokemonSpecific } from '@/types/Pokemon'
import { computed } from 'vue'
import { capitalize } from '@/utils/textFormat'

interface Props {
  isOpen: boolean
  pokemonSpecific: PokemonSpecific | null
  active?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
  pokemonSpecific: null,
  id: '0',
  active: false,
})

const toTypesCapitalized = (
  dataArray: { slot: number; type: { name: string; url: string } }[], // PokemonSpecific.types
  separator: ', ' | '/' = ', ',
): string => {
  const names = dataArray.map((item) => capitalize(item.type.name))
  return names.join(separator)
}

const emit = defineEmits<{
  (e: 'favorite', id: string): void
  (e: 'close'): void
}>()

const handleFavorite = (): void => {
  if (props.pokemonSpecific?.name) emit('favorite', props.pokemonSpecific.name) // Name being used as ID
}

const handleClose = (): void => {
  emit('close')
}

const pokemonAttributes = computed(() => {
  if (props.pokemonSpecific) {
    return {
      name: capitalize(props.pokemonSpecific.name),
      weight: props.pokemonSpecific.weight,
      height: props.pokemonSpecific.height,
      types: toTypesCapitalized(props.pokemonSpecific.types),
    }
  } else {
    return {
      name: '',
      weight: 0,
      height: 0,
      types: '',
    }
  }
})
const handleShareClick = async () => {
  const p = pokemonAttributes.value

  const attributes = [
    p.name,
    p.weight.toString(),
    p.height.toString(),
    toTypesCapitalized(props?.pokemonSpecific?.types || [], '/'),
  ]
  const copyString = attributes.join(', ')

  try {
    if (!navigator.clipboard) {
      console.warn('Clipboard API not available')
      return
    }
    await navigator.clipboard.writeText(copyString)
  } catch (err) {
    console.error('Error al copiar:', err)
  }
}

const iconColor = computed(() => (props?.active ? '#eca539' : '#bfbfbf'))
</script>

<template>
  <div
    v-if="props.isOpen"
    class="fixed inset-0 flex items-center justify-center dialog-container"
    aria-modal="true"
    role="dialog"
  >
    <div class="bg-white w-full max-w-[570px] mx-6 md:mx-0 main-dialog overflow-hidden">
      <div
        class="relative h-[220px] w-[570px] w-full overflow-hidden justify-items-center items-center"
      >
        <component :is="PokeBackground" class="h-full cover" />

        <img
          v-if="props.pokemonSpecific?.sprites.other?.['official-artwork']?.front_default"
          :src="props.pokemonSpecific?.sprites.other['official-artwork'].front_default"
          alt="Center Icon"
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 **w-[180px] h-[180px] object-cover z-10**"
        />

        <component
          @click="handleClose"
          :is="CloseCircle"
          class="absolute z-20 top-[15px] right-[15px] cursor-pointer object-contain"
          fill="#ffffff"
        />
      </div>
      <div class="px-[30px] py-5 space-y-3">
        <div class="text-lato-bold lato-title flex items-center gap-1">
          Name:
          <div class="text-lato-normal mt-[0.1rem]">
            {{ pokemonAttributes.name }}
          </div>
        </div>
        <div class="h-px w-full line" />
        <div class="text-lato-bold lato-title flex items-center gap-1">
          Weight:
          <div class="text-lato-normal mt-[0.1rem]">{{ pokemonAttributes.weight }}</div>
        </div>
        <div class="h-px w-full line" />
        <div class="text-lato-bold lato-title flex items-center gap-1">
          Height:
          <div class="text-lato-normal mt-[0.1rem]">{{ pokemonAttributes.height }}</div>
        </div>
        <div class="h-px w-full line" />
        <div class="text-lato-bold lato-title flex items-center gap-1">
          Types:
          <div class="text-lato-normal mt-[0.1rem]">
            {{ pokemonAttributes.types }}
          </div>
        </div>
        <div class="h-px w-full line" />
      </div>

      <div class="px-[30px] flex justify-between pb-5">
        <BasicButton @click="handleShareClick" active>Share to my friends</BasicButton>
        <IconButton @click="handleFavorite" :active="active" class="cursor-pointer">
          <template #icon>
            <component :is="FavoriteIcon" :fill="iconColor" />
          </template>
        </IconButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line {
  background-color: #e8e8e8;
}
.dialog-container {
  background-color: rgba(0, 0, 0, 0.5);
}

.main-dialog {
  border-radius: 5px;
}

.lato-title {
  font-size: 18px;
  color: #5e5e5e;
}
</style>
