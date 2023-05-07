<script setup lang="ts">
import Aside from './aside.vue'
import Header from '@/components/common/Header.vue'
</script>
<template>
  <Header />
  <el-container>
    <el-aside>
      <Aside />
    </el-aside>
    <el-main>
      <RouterView />
    </el-main>
  </el-container>
</template>
<style scoped>
.el-aside {
  height: calc(100vh - 50px);
  border-right: 1px solid #eaf4fe;
  width: 24vw;
  padding: 20px;
}
.el-main {
  padding: 20px 40px;
}
</style>
