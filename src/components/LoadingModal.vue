<script setup lang="ts">
import TheLoading from './TheLoading.vue'

interface Props {
  isOpen: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
})
</script>

<template>
  <div
    v-if="props.isOpen"
    class="fixed inset-0 flex items-center justify-center dialog-container"
    aria-modal="true"
    role="dialog"
  >
    <TheLoading />
    <!-- <div class="bg-white w-full max-w-[570px] mx-6 md:mx-0 main-dialog overflow-hidden">

    </div> -->
  </div>
</template>

<style scoped>
.dialog-container {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
