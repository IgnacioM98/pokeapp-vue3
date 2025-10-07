<script setup lang="ts">
import BasicButton from './BasicButton.vue'
import PikachuIcon from './icons/PikachuIcon.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const redirect = () => router.push('/list')
</script>

<template>
  <div class="grid h-screen place-items-center">
    <div class="flex flex-col items-center gap-10 text-center">
      <PikachuIcon />
      <div class="text-lato-bold lato-title">Welcome to Pokédex</div>
      <div class="text-lato-normal lato-subtitle max-w-[560px] mx-10">
        The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the
        Pokémon world.
      </div>
      <BasicButton @click="redirect" :active="true" class="mt-4">Get started</BasicButton>
    </div>
  </div>
</template>

<style scoped>
.lato-title {
  font-size: 26px;
  color: #353535;
}
.lato-subtitle {
  font-size: 18px;
  color: #5e5e5e;
}
</style>
