<script setup lang="ts">
const emit = defineEmits<{
  (e: 'click'): void
}>()

interface Props {
  active?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})
</script>

<template>
  <button
    class="grid place-items-center button"
    :disabled="props.disabled"
    @click="!disabled && emit('click')"
  >
    <span v-if="$slots.icon">
      <slot name="icon"></slot>
    </span>
  </button>
</template>

<style scoped>
.button {
  border-radius: 60px;
  height: 44px;
  width: 44px;
  background-color: #f5f5f5;
}

.button:deep(.icon-yellow) {
  fill: #eca539;
}
.button:deep(.icon-gray) {
  fill: #bfbfbf;
}
</style>
