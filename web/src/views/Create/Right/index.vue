<script setup lang="ts"></script>
<template>
  <div class="container">
    <el-row>
      <el-col :span="8" class="flex">变量</el-col>
      <el-col :span="8" class="flex">元素</el-col>
      <el-col :span="8" class="flex">流程</el-col>
    </el-row>
    <el-empty description="有待开发" />
  </div>
</template>
<style scoped>
.container {
  width: 17vw;
  height: calc(98vh - 70px);
  position: absolute;
  right: 1vw;
  top: 70px;
  background: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 10px;
}
.el-row {
  height: 46px;
}
.flex {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}
</style>
