<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
</script>
<template>
  <div class="title">日志</div>
  <div class="search">
    <el-row>
      <el-col :span="8">
        <el-input placeholder="搜索日志" :suffix-icon="Search" />
      </el-col>
      <el-col :span="4" :offset="12" class="operation">
        <span style="font-size: 12px">只记录最近30天的日志</span>
      </el-col>
    </el-row>
  </div>
  <div class="table">
    <el-table>
      <el-table-column label="名称" />
    </el-table>
  </div>
</template>
<style scoped>
.title {
  height: 40px;
  font-size: 18px;
  line-height: 40px;
}
.operation {
  display: flex;
  justify-content: flex-end;
}
.table {
  margin-top: 20px;
}
</style>
