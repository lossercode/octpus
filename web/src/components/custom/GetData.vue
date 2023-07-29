<script setup lang="ts">
import type { ComponentProps } from '@/schema'
import { onMounted, reactive } from 'vue'
import { useComponentStore } from '@/stores'

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
const { componentList } = useComponentStore()
const data = reactive<ComponentProps[]>([
  {
    propName: 'element',
    value: '',
    beforeDes: '获取元素',
    afterDes: '值'
  },
  {
    propName: 'name',
    value: '',
    beforeDes: '命名为'
  }
])
onMounted(() => {
  if (props.statu === 1) {
    data.length = 0
    data.push(...componentList[props.index].props)
  }
})
</script>
<template>
  <el-row justify="center">
    <el-col :span="20">
      <el-form>
        <el-form-item label="元素定位">
          <el-input v-model="data[0].value" />
        </el-form-item>
        <el-form-item label="命名字段">
          <el-input v-model="data[1].value" />
        </el-form-item>
        <el-row justify="end">
          <el-button type="primary" @click="emit('transferData', data)">确定</el-button>
        </el-row>
      </el-form>
    </el-col>
  </el-row>
</template>
<style scoped></style>
