<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  configs: {
    type: Array<any>,
    required: true
  },
  //组件的位置索引，方便定位
  index: {
    type: Number,
    required: true
  },
  indent: {
    type: Number,
    required: true
  }
})
const emit = defineEmits(['change'])
const changeComponent = () => {
  emit('change', props.index)
}
//使用计算属性过滤是否需要渲染描述字段
const items = computed(() => {
  return props.configs.filter((item) => item.preDes)
})
</script>
<template>
  <el-row align="middle">
    <el-col :span="2" :offset="props.indent" :class="{ line: props.indent > 0 }">
      <el-icon size="24">
        <component :is="props.icon" />
      </el-icon>
    </el-col>
    <el-col :span="3">
      <span>{{ props.title }}</span>
    </el-col>
    <el-col :span="1">
      <span />
    </el-col>
    <el-col :span="16" class="flex">
      <div class="flex gap" v-for="item in items" :key="item.propName">
        <div class="preDes" v-if="item.preDes">{{ item.preDes }}</div>
        <div @click="changeComponent" class="value" v-if="item.preDes">
          {{
            (typeof item.value === 'string' && item.value.length > 20) ||
            typeof item.value === 'object'
              ? '变量{ X } '
              : item.value
          }}
        </div>
        <div v-if="item.suffixDes" class="suffixDes">{{ item.suffixDes }}</div>
      </div>
    </el-col>
  </el-row>
</template>
<style scoped>
.el-row {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.el-col {
  height: 100%;
  display: flex;
  align-items: center;
}
.line {
  border-left: 1px solid #ccc;
}
.el-col:first-child {
  justify-content: center;
}
.el-col:nth-child(2) {
  font-weight: bolder;
}
.el-col:nth-child(3) span {
  display: block;
  height: 28px;
  width: 1px;
  background: #eaf4fe;
}

.flex {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.gap {
  margin-right: 20px;
}
.preDes {
  font-size: 12px;
  margin-right: 5px;
}

.suffixDes {
  font-size: 12px;
  margin-left: 5px;
}
.value {
  display: block;
  height: 24px;
  background-color: #eaf4fe;
  line-height: 24px;
  color: #409eff;
  box-sizing: border-box;
  padding: 0 5px;
  cursor: pointer;
  overflow: hidden;
}
</style>
