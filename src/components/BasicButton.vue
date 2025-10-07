<script setup lang="ts">
import { computed } from 'vue'

const emit = defineEmits<{
  (e: 'click'): void
}>()

interface Props {
  active?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
  disabled: false,
})

const buttonClasses = computed(() => {
  if (props.disabled) {
    return 'bg-gray-300 text-gray-500 cursor-not-allowed '
  }
  if (props.active) {
    return 'is-red'
  } else {
    return 'is-gray'
  }
})
</script>

<template>
  <button
    :class="['py-4 px-8 flex items-center justify-center button', buttonClasses]"
    :disabled="disabled"
    @click="!disabled && emit('click')"
  >
    <span v-if="$slots.icon" class="mr-2">
      <slot name="icon"></slot>
    </span>
    <slot>Click Here</slot>
  </button>
</template>

<style scoped>
.button {
  border-radius: 60px;
  color: white;
  height: 44px;
  font-weight: 700;
  font-size: 18px;
}
.button.is-red {
  background-color: #f22539;
  border: 1px solid #f22539;
}
.button.is-gray {
  background-color: #bfbfbf;
  border: 1px solid #bfbfbf;
}
</style>
