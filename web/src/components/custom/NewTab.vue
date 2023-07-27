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
    propName: 'url',
    value: '',
    beforeDes: '网址'
  },
  {
    propName: 'wait',
    value: 1,
    beforeDes: '等待',
    afterDes: '秒'
  }
])
const tips = [
  '请输入完整的网址，如包括https等信息',
  '有些网页需要等待全部元素加载完毕后才能进行后续的爬虫操作'
]
onMounted(() => {
  if (props.statu === 1) {
    data.length = 0
    data.push(...componentList[props.index].props)
  }
})
</script>
<template>
  <el-form>
    <el-form-item label="完整网址">
      <el-row style="width: 100%" align="middle">
        <el-col :span="20">
          <el-input v-model="data[0].value" />
        </el-col>
        <el-col :span="4" class="flex-center">
          <el-tooltip effect="dark" :content="tips[0]" placement="right">
            <el-icon size="18"><QuestionFilled /></el-icon>
          </el-tooltip>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="等待时间">
      <el-row style="width: 100%" align="middle">
        <el-col :span="8">
          <el-input-number v-model="data[1].value" />
        </el-col>
        <el-col :span="6" class="flex-center">
          <span>单位（秒）</span>
        </el-col>
        <el-col :span="4" class="flex-center">
          <el-tooltip effect="dark" :content="tips[1]" placement="right">
            <el-icon size="18"><QuestionFilled /></el-icon>
          </el-tooltip>
        </el-col>
      </el-row>
    </el-form-item>
    <el-row justify="end">
      <el-button type="primary" @click="emit('transferData', data)">确定</el-button>
    </el-row>
    <!-- <el-form-item
      v-for="config in componentList[props.index].config"
      :label="config.label"
      :key="config.propName"
    >
      <el-row style="width: 100%" align="middle">
        <el-col :span="20">
          <el-input v-model="config.value" />
        </el-col>
        <el-col :span="4" class="flex-center" v-if="config.tip">
          <el-tooltip effect="dark" :content="config.tip" placement="right">
            <el-icon size="18"><QuestionFilled /></el-icon>
          </el-tooltip>
        </el-col>
      </el-row>
    </el-form-item> -->
  </el-form>
</template>
<style scoped>
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
