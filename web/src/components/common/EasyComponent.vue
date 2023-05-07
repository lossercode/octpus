<script setup lang="ts">
/**
 * @description: 将一些简单的组件提取到一起
 * @return {*}
 * @Date: 2023-04-12 10:41:13
 */
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
    <el-form-item
      v-for="config in componentList[props.index].configs"
      :label="config.formLabel"
      :key="config.formLabel"
    >
      <el-row style="width: 100%" align="middle">
        <el-col :span="20">
          <el-input v-model="config.value" />
        </el-col>
        <el-col :span="4" class="flex-center" v-if="config.tips">
          <el-tooltip effect="dark" :content="config.tips" placement="right">
            <el-icon size="18"><QuestionFilled /></el-icon>
          </el-tooltip>
        </el-col>
      </el-row>
    </el-form-item>
  </el-form>
</template>
<style scoped>
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
