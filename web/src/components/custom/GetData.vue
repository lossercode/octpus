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
  componentList[props.index]['configs'][1].value.push({ select: '', fieldName: '' })
}
const deleteData = (index: number) => {
  componentList[props.index]['configs'][1].value.splice(index, 1)
}
</script>
<template>
  <el-form :inline="true">
    <el-form-item :label="componentList[props.index].configs[0].formLabel">
      <el-row>
        <el-col :span="20">
          <el-input v-model="componentList[props.index].configs[0].value" placeholder="使用xpath" />
        </el-col>
        <el-col :span="4" class="flex">
          <el-tooltip
            effect="dark"
            :content="componentList[props.index].configs[0].tips"
            placement="right"
          >
            <el-icon size="18"><QuestionFilled /></el-icon>
          </el-tooltip>
        </el-col>
      </el-row>
    </el-form-item>
    <el-divider />
    <h4>获取子节点数据</h4>
    <el-row
      v-for="(data, index) in componentList[props.index]['configs'][1].value"
      :key="data.name"
    >
      <el-form-item label="匹配子元素">
        <el-input v-model="data['select']" placeholder="使用xpath" />
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
