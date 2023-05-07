<script setup lang="ts">
import { useComponentStore } from '@/stores'
const props = defineProps({
  index: {
    type: Number,
    required: true
  }
})
const options = [
  {
    value: 1,
    label: '1秒'
  },
  {
    value: 2,
    label: '2秒'
  },
  {
    value: 3,
    label: '3秒'
  }
]
const { componentList } = useComponentStore()
</script>
<template>
  <el-form>
    <el-form-item label="等待时间">
      <el-select v-model="componentList[props.index].configs[0].value">
        <el-option
          v-for="option in options"
          :label="option.label"
          :value="option.value"
          :key="option.value"
        />
      </el-select>
    </el-form-item>
  </el-form>
</template>
<style scoped></style>
