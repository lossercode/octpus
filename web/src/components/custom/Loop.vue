<script setup lang="ts">
import type { ComponentProps } from '@/schema'
import { onMounted, reactive } from 'vue'
import { useComponentStore } from '@/stores'
/**
 * 2023/7/27 16：38
 * @description: 每个组件都有一定的重复代码，目前还未想到办法解决
 * @return {*}
 */
const { componentList } = useComponentStore()
const emit = defineEmits(['transferData'])
const props = defineProps({
  index: {
    type: Number,
    required: true
  },
  statu: {
    type: Number,
    required: true
  }
})
onMounted(() => {
  if (props.statu === 1) {
    data.length = 0
    data.push(...componentList[props.index].props)
  }
})
const data = reactive<ComponentProps[]>([
  {
    propName: 'count',
    value: 1,
    beforeDes: '循环',
    afterDes: '次'
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
<style scoped></style>
