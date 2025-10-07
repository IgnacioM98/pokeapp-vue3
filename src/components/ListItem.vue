<script setup lang="ts">
import FavoriteIcon from '@/assets/FavoriteIcon.svg?component'
import IconButton from './IconButton.vue'
import { computed } from 'vue'
import { capitalize } from '@/utils/textFormat'

interface Props {
  label: string
  id: string
  active?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: ' ',
  id: '0',
  active: false,
  disabled: false,
})

const emit = defineEmits<{
  (e: 'select', id: string): void
  (e: 'favorite', id: string): void
}>()

const handleSelect = (): void => {
  emit('select', props.id)
}
const handleFavorite = (): void => {
  emit('favorite', props.id)
}

const iconColor = computed(() => (props?.active ? '#eca539' : '#bfbfbf'))
</script>

<template>
  <div class="w-full my-3">
    <div class="relative flex items-center justify-between px-[20px] item">
      <div class="w-full w-full cursor-auto" @click.stop="handleSelect">
        <div class="text-lato-normal lato-title">{{ capitalize(props.label) }}</div>
      </div>
      <IconButton
        @click="handleFavorite"
        :active="active"
        :disabled="disabled"
        class="cursor-pointer"
      >
        <template #icon>
          <component :is="FavoriteIcon" :fill="iconColor" />
        </template>
      </IconButton>
    </div>
  </div>
</template>

<style scoped>
.item {
  background-color: #ffffff;
  border-radius: 5px;
  height: 60px;
}
.lato-title {
  font-size: 22px;
  color: #353535;
}
</style>
