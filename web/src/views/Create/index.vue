<script setup lang="ts">
import Header from './Header/index.vue'
import Aside from './Aside/index.vue'
import Main from './Main/index.vue'
import Right from './Right/index.vue'
</script>
<template>
  <div class="app">
    <Header />
    <Aside />
    <Main />
    <Right />
  </div>
</template>
<style scoped>
.app {
  width: 100vw;
  height: 100vh;
  background: #eaf4fe;
}
</style>
