<script lang="ts" setup>
import SearchBar from '@/components/SearchBar.vue'
import TheList from '@/components/TheList.vue'
import FixedFooter from '@/components/FixedFooter.vue'
</script>

<template>
  <div class="view-layout">
    <main class="max-w-[570px] w-full px-6 md:px-0 pb-20">
      <SearchBar />
      <TheList />
    </main>

    <FixedFooter />
  </div>
</template>

<style scoped>
main {
  margin: 0 auto;
}
.view-layout {
  display: grid;
  height: 100vh;
}
</style>
