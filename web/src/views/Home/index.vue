<script setup lang="ts">
import Header from '@/components/common/Header.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
<template>
  <Header />
  <div class="main">
    <div class="wrap">
      <h1 class="title">可视化拖拽爬虫工具</h1>
      <p class="des">一个插件 + 可视化拖拽 + 云端分析 = 轻量级爬虫解决方案</p>
      <div class="download">
        <el-button type="primary" size="large">下载插件</el-button>
        <el-button size="large" plain type="primary" @click="router.push('user')"
          >新建项目</el-button
        >
      </div>
    </div>
  </div>
</template>
<style scoped>
.main {
  width: 100%;
  height: calc(100vh - 50px);
  background-image: url('background.88556a8.png');
  position: absolute;
  top: 50px;
}
.wrap {
  width: 80%;
  margin: 0 auto;
}
.title {
  letter-spacing: 2px;
  font-size: 40px;
  font-weight: 600;
  color: #000;
  line-height: 48px;
  text-align: center;
  margin-top: 100px;
  margin-bottom: 40px;
}
.des {
  letter-spacing: 1px;
  font-size: 16px;
  color: #000;
  text-align: center;
  margin: auto auto 38px;
}
.download {
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
