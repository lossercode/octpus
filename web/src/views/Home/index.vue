<script setup lang="ts">
// import { computed } from 'vue'
// const text = computed(() => {
//   return localStorage.getItem('token') ? '进入控制台' : '请登录'
// })
import Header from '@/components/common/Header.vue'
</script>
<template>
  <Header />
  <div class="main">
    <div class="wrap">
      <h1 class="title">技术，让生活更美好</h1>
      <p class="des">一个插件 + 低代码拖拽 + 协作共享 + 云端分析 = 全栈式数据解决方案</p>
      <div class="download">
        <el-button type="primary" size="large">下载插件</el-button>
        <el-button size="large" plain type="primary">新建项目</el-button>
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
