<script setup lang="ts">
import { useComponentStore } from '@/stores'
const props = defineProps({
  index: {
    type: Number,
    required: true
  }
})
const { componentList } = useComponentStore()
</script>
<template>
  <el-form>
    <el-form-item label="循环次数">
      <el-input-number v-model="componentList[props.index].configs[0].value" />
    </el-form-item>
  </el-form>
</template>
<style scoped></style>
