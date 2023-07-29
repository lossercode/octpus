<script setup lang="ts">
import type { ComponentProps } from '@/schema'
import { useComponentStore } from '@/stores'
import { onMounted, reactive } from 'vue'
const emit = defineEmits(['transferData'])
const { componentList } = useComponentStore()
onMounted(() => {
  if (props.statu === 1) {
    data.length = 0
    data.push(...componentList[props.index].props)
  }
})
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
const data = reactive<ComponentProps[]>([
  {
    propName: 'speed',
    value: 1,
    afterDes: '秒后滚动到底部'
  }
])
const tip = ['以秒为单位，最小1秒，最大5秒']
</script>
<template>
  <el-form>
    <el-form-item label="等待时间">
      <el-row style="width: 100%" align="middle">
        <el-col :span="14">
          <el-input-number v-model="data[0].value" />
        </el-col>
        <el-col :span="4" class="flex-center">
          <el-tooltip effect="dark" :content="tip[0]" placement="right">
            <el-icon size="18"><QuestionFilled /></el-icon>
          </el-tooltip>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item>
      <el-row justify="end" style="width: 100%">
        <el-button type="primary" @click="emit('transferData', data)">确定</el-button>
      </el-row>
    </el-form-item>
  </el-form>
</template>
<style scoped>
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
