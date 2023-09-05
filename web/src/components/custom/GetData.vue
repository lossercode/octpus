<script setup lang="ts">
import type { ComponentProps, ValueProps } from '@/schema'
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
    propName: 'crawlData',
    value: [],
    beforeDes: '命名为'
  }
])
const newElement = reactive<ValueProps[]>([
  {
    element: '',
    nameAs: ''
  }
])
const submit = () => {
  data[1].value = newElement
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
  <el-row>
    <el-col>
      <h4>定位元素</h4>
      <el-input v-model="data[0].value" />
      <h4>值域设置</h4>
      <el-row v-for="(item, index) in newElement" :key="index" style="margin-bottom: 18px">
        <el-col :span="9">
          <el-input placeholder="属性名称" v-model="item.element" />
        </el-col>
        <el-col :span="9" :offset="1">
          <el-input placeholder="将字段命名为" v-model="item.nameAs" />
        </el-col>
        <el-col :span="5" class="flex">
          <el-icon
            :size="22"
            style="cursor: pointer"
            @click="newElement.push({ element: '', nameAs: '' })"
          >
            <CirclePlus />
          </el-icon>
          <el-icon
            :size="22"
            style="cursor: pointer"
            @click="newElement.length > 1 && newElement.splice(index, 1)"
          >
            <Delete />
          </el-icon>
        </el-col>
      </el-row>
      <!-- <el-form>
        <el-form-item label="元素定位">
          <el-input v-model="data[0].value" />
        </el-form-item>
        <el-form-item label="命名字段">
          <el-input v-model="data[1].value" />
        </el-form-item>
        <el-row justify="end">
          <el-button type="primary" @click="emit('transferData', data)">确定</el-button>
        </el-row>
      </el-form> -->
      <el-row justify="end" style="width: 100%">
        <el-button type="primary" @click="submit">确定</el-button>
      </el-row>
    </el-col>
  </el-row>
</template>
<style scoped>
.flex {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
