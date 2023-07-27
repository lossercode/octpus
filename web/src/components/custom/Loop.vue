<script setup lang="ts">
import type { ComponentProps } from '@/schema'
import { reactive } from 'vue'
const emit = defineEmits(['transferData'])
const data = reactive<ComponentProps[]>([
  {
    propName: 'count',
    value: 1
  }
])
</script>
<template>
  <el-form>
    <el-form-item label="循环次数">
      <el-input-number v-model="data[0].value" />
    </el-form-item>
    <el-row justify="end">
      <el-button type="primary" @click="emit('transferData', data)">确定</el-button>
    </el-row>
  </el-form>
</template>
<style scoped>
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
