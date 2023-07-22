<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const optionSelected = ref(0)
const listSelected = ref(0)
const router = useRouter()
// const emit = defineEmits(['changeComponent'])
const options = [
  {
    label: '项目',
    icon: 'House',
    list: [
      { label: '我的项目', component: '/user/myTasks' },
      { label: '项目日志', component: '/user/taskLogs' }
    ]
  },
  {
    label: '教程',
    icon: 'Notebook',
    list: [
      { label: 'xpath语法', component: 'xpath' },
      { label: '实操文档', component: 'example' }
    ]
  },
  {
    label: '客服',
    icon: 'Service',
    list: []
  },
  {
    label: '设置',
    icon: 'Setting',
    list: []
  }
]
const changeList = (component: string, index: number) => {
  listSelected.value = index
  router.push(component)
}
const changeOption = (index: number) => {
  optionSelected.value = index
  router.push(options[index].list[0].component)
}
</script>
<template>
  <el-row>
    <el-col :span="4">
      <div
        v-for="(option, index) in options"
        :key="option.label"
        :class="optionSelected === index ? 'selected' : ''"
        class="option"
        @click="changeOption(index)"
      >
        <div class="icon">
          <el-icon :size="20">
            <component :is="option.icon" />
          </el-icon>
        </div>
        <div class="text">{{ option.label }}</div>
      </div>
    </el-col>
    <el-col :span="18" :offset="2">
      <div
        class="list"
        :class="listSelected === index ? 'selected' : ''"
        v-for="(option, index) in options[optionSelected].list"
        :key="option.label"
        @click="changeList(option.component, index)"
      >
        {{ option.label }}
      </div>
    </el-col>
  </el-row>
</template>
<style scoped>
.option {
  width: 50px;
  height: 50px;
  margin-bottom: 20px;
  cursor: pointer;
  font-size: 12px;
  border-radius: 5px;
}
.icon,
.text {
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  height: 30px;
}
.text {
  height: 20px;
}
.list {
  width: 80%;
  height: 40px;
  margin: 0 0 10px 0;
  padding-left: 20px;
  border-radius: 5px;
  line-height: 40px;
  cursor: pointer;
  font-size: 14px;
}

.selected {
  background: #eaf4fe;
}
</style>
