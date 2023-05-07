/** * @description: 监听DOM变动组件 * @return {*} * @Date: 2023-04-12 16:04:30 */
<script setup lang="ts">
import { useComponentStore } from '@/stores'
const props = defineProps({
  index: {
    type: Number,
    required: true
  }
})
const { componentList } = useComponentStore()

const addData = () => {
  componentList[props.index]['configs'][2].value.push({ select: '', fieldName: '' })
}
const deleteData = (index: number) => {
  componentList[props.index]['configs'][2].value.splice(index, 1)
}
</script>
<template>
  <el-form :inline="true">
    <el-form-item label="监听元素">
      <el-input v-model="componentList[props.index]['configs'][0].value" />
    </el-form-item>
    <el-form-item label="监听时长(可选)">
      <el-input-number v-model="componentList[props.index]['configs'][1].value" />
    </el-form-item>
    <el-form-item label="分钟" />
    <el-divider />
    <h4>页面新增元素时</h4>
    <el-row
      v-for="(data, index) in componentList[props.index]['configs'][2].value"
      :key="data.name"
    >
      <el-form-item label="匹配元素">
        <el-input v-model="data['select']" />
      </el-form-item>
      <el-form-item label="命名为">
        <el-input v-model="data['fieldName']" />
      </el-form-item>
      <el-form-item>
        <el-icon :size="20" style="cursor: pointer" @click="deleteData(index)"><Delete /></el-icon>
      </el-form-item>
    </el-row>
    <el-form-item>
      <el-button @click="addData">添加匹配项</el-button>
    </el-form-item>
  </el-form>
</template>
<style scoped>
.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-divider {
  margin: 0;
}
</style>
