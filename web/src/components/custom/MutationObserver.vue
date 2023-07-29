/** * @description: 监听DOM变动组件 * @return {*} * @Date: 2023-04-12 16:04:30 */
<script setup lang="ts">
import type { ValueProps, ComponentProps } from '@/schema'
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
    propName: 'parentElement',
    value: '',
    beforeDes: '监听父元素'
  },
  {
    propName: 'end',
    value: 'time',
    beforeDes: '结束时机'
  },
  {
    propName: 'time',
    value: 0
  },
  {
    propName: 'child',
    value: ''
  },
  {
    propName: 'newElement',
    value: []
  }
])
const newElement = reactive<ValueProps[]>([
  {
    element: '',
    name: ''
  }
])
const options = [
  {
    value: 'time',
    label: '时间'
  },
  {
    value: 'element',
    label: '元素消失'
  }
]
const submit = () => {
  data[4].value = newElement
  emit('transferData', data)
}
onMounted(() => {
  if (props.statu === 1) {
    data.length = 0
    data.push(...componentList[props.index].props)
  }
})
</script>
<template>
  <el-form>
    <el-form-item label="监听元素">
      <el-input v-model="data[0].value" />
    </el-form-item>
    <el-form-item label="停止时机">
      <el-select v-model="data[1].value">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="监听时长" v-if="data[1].value === 'time'">
      <el-input-number v-model="data[2].value" />
    </el-form-item>
    <el-form-item label="判别元素" v-else>
      <el-input v-model="data[3].value" />
    </el-form-item>
    <el-form-item label="当出现新元素时" />

    <el-row v-for="(item, index) in newElement" :key="item.name" style="margin-bottom: 18px">
      <el-col :span="9">
        <el-input v-model="item.element" placeholder="元素xpath操作" />
      </el-col>
      <el-col :span="9" :offset="1">
        <el-input v-model="item.name" placeholder="将字段命名为" />
      </el-col>
      <el-col :span="5" class="flex">
        <el-icon
          :size="22"
          style="cursor: pointer"
          @click="newElement.push({ element: '', name: '' })"
          ><CirclePlus
        /></el-icon>
        <el-icon
          :size="22"
          style="cursor: pointer"
          @click="newElement.length > 1 && newElement.splice(index, 1)"
          ><Delete
        /></el-icon>
      </el-col>
    </el-row>

    <el-form-item>
      <el-row justify="end" style="width: 100%">
        <el-button type="primary" @click="submit">确定</el-button>
      </el-row>
    </el-form-item>
  </el-form>
</template>
<style scoped>
.flex {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.el-divider {
  margin: 0;
}
</style>
