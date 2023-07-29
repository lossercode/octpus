<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useComponentStore } from '@/stores'
import { deepCopy } from '@/utils'
import { schemas } from '@/schema'
import RenderFlow from '@/components/common/RenderFlow.vue'
import { getTaskContent } from '@/api/tasks'
import { useRoute } from 'vue-router'
import type { ComponentProps } from '@/schema'
import type { Component } from '@/schema'
const { componentList, deleteComponent } = useComponentStore()
const showDialog = ref<boolean>(false)
const lineTop = ref<number>(0)
const showLine = ref<boolean>(false)
// 记录当前组件名称
const currentComponent = ref<string>('')
// 组件当前的状态，0表示新建，1表示修改
const componentStatu = ref<number>(0)
const currentIndex = ref<number>(0)
const route = useRoute()

//监听组件拖拽drop事件
const handleDrop = (e: any) => {
  // 组件状态为新增状态
  // componentStatu.value = 0
  //停止拖拽后网格线消失
  showLine.value = false
  // 获取组件的名称
  currentComponent.value = e.dataTransfer.getData('name')
  // //打开配置项
  showDialog.value = true
}

/**
 * @description: 设置组件缩进属性，主要用来判断层级关系
 * @param {*} currentIndex 鼠标拖放事件结束后根据位置计算出来要插入的位置
 * @return {*}
 */
const setIndent = (currentIndex: number) => {
  let temp = currentIndex - 1
  //第一个元素无需设置
  if (temp < 0) {
    return
  }
  //如果前面一个是循环结束标志，就直接在前面一个的indent上加一，如果是同级元素就相同的indent
  if (componentList[temp].nestedProps) {
    componentList[currentIndex].indent = componentList[temp].indent + 1
  } else {
    componentList[currentIndex].indent = componentList[temp].indent
  }
  //如果当前组件是嵌套组件，结尾组件也需要设置缩进
  if (componentList[currentIndex].nestedProps) {
    componentList[currentIndex + 1].indent = componentList[currentIndex].indent
  }
}
/**
 * @description: 监听拖拽事件，计算出网格线的位置
 * @return {*}
 * @Date: 2023-03-16 14:40:53
 * @param {*} e
 */
const dragover = (e: any) => {
  // console.log(e.target)
  showLine.value = true
  //获取鼠标的相对位置,根据视图窗口的左上角来计算的,90为父元素的pageX高度
  const top = e.pageY - 90
  const currentY = componentList.length * 50 + 20
  if (currentY < top) {
    lineTop.value = currentY
  } else {
    lineTop.value = Math.floor(top / 50) * 50 + 20
  }
}

/**
 * @description: 添加新组件/修改组件
 * @param {*} data 通过模态款获取到的配置信息
 * @return {*}
 */
const addComponent = (data: ComponentProps[]) => {
  // 如果组件状态处于修改状态就不添加
  if (componentStatu.value === 1) {
    componentList[currentIndex.value].props = data
    showDialog.value = false
    return
  }
  // 从schema中提取当前选中的组件, 注意是深拷贝，即新建一个对象
  const component = deepCopy(schemas.filter((item) => item.name === currentComponent.value)[0])
  // 设置当前组件的属性
  component.props = data
  // 根据指示线的位置确定要插入的位置
  const index = Math.floor(lineTop.value / 50)
  // 插入到组件列表中
  componentList.splice(index, 0, component)
  // 如果是嵌套组件，嵌套结尾组件也要插入
  if (component.nestedProps) {
    const nestedEnd: Component = { ...component.nestedProps, name: 'Nested', props: [] }
    componentList.splice(index + 1, 0, nestedEnd)
  }
  // 设置缩进
  setIndent(index)
  // 关闭模态款
  showDialog.value = false
  console.log(componentList)
}

const editComponent = (index: number) => {
  // 通过模态框进行配置
  showDialog.value = true
  componentStatu.value = 1
  currentIndex.value = index
  currentComponent.value = componentList[index].name
}

onMounted(async () => {
  // 初始加载时获取任务具体配置信息
  const content = await getTaskContent(Number(route.params.id))
  if (content.length > 0) {
    componentList.length = 0
    componentList.push(...content)
    console.log(componentList)
  }
})
</script>
<template>
  <div class="container" @drop.stop="handleDrop" @dragover.stop.prevent>
    <div class="wrap">
      <el-row class="content">
        <!-- 左侧流程序号 -->
        <el-col :span="1">
          <div class="index" v-for="(item, index) in componentList" :key="item.name">
            {{ index + 1 }}
          </div>
        </el-col>
        <!-- 流程图渲染 -->
        <el-col :span="23" @dragover="dragover">
          <el-row v-for="(component, index) in componentList" :key="component.name" align="middle">
            <el-col :span="23">
              <!-- 渲染单个组件 -->
              <div class="component">
                <RenderFlow
                  :index="index"
                  :icon="component.iconName"
                  :title="component.title"
                  :config="component.props"
                  :indent="component.indent"
                  @change="editComponent"
                />
              </div>
            </el-col>
            <!-- 如果有typeName表示不是嵌套组件的结束组件，可以删除 -->
            <el-col :span="1" class="center" v-if="component.props.length">
              <el-icon color="#F56C6C" :size="22" @click="deleteComponent(index)">
                <Delete />
              </el-icon>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <!-- 对齐线 -->
      <div class="line" :style="{ top: lineTop + 'px' }" v-if="showLine" />
      <!-- 配置项模态框 -->
    </div>
  </div>
  <el-dialog v-model="showDialog" title="配置项" width="38%" destroy-on-close>
    <component
      :is="currentComponent"
      :index="currentIndex"
      :statu="componentStatu"
      @transferData="addComponent"
    />
  </el-dialog>
</template>
<style scoped>
.container {
  width: calc(68vw);
  height: calc(98vh - 70px);
  position: absolute;
  left: calc(14vw);
  top: 70px;
  box-sizing: border-box;
  padding: 0 20px;
  background: #eaf4fe;
}
.wrap {
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  overflow-y: auto;
}

.wrap::-webkit-scrollbar {
  width: 8px;
  height: 4px;
}
/*滚动条滑块*/
.wrap::-webkit-scrollbar-thumb {
  border-radius: 3px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
  background: #dcdbdb;
}
/*滚动条里面轨道*/
.wrap::-webkit-scrollbar-track {
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.05);
}
/*滚动条的小边角*/
.wrap::-webkit-scrollbar-corner {
  background: transparent;
}
.content {
  width: 100%;
  height: 100%;
}
.content .el-col {
  height: 100%;
}
.index {
  height: 50px;
  line-height: 40px;
  box-sizing: border-box;
  padding-bottom: 10px;
  color: #b4b4b4;
  border-right: 1px dotted #ccc;
}
.component {
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
}
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-icon {
  cursor: pointer;
}
.line {
  position: absolute;
  left: 0;
  width: 100%;
  height: 3px;
  background: #1890ff;
}
.line::before,
.line::after {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  z-index: 3;
}
.line::before {
  left: 0;
  top: -5px;
  border-top: 6px solid transparent;
  border-left: 6px solid #1890ff;
  border-bottom: 6px solid transparent;
}
.line::after {
  right: 0;
  top: -5px;
  border-top: 6px solid transparent;
  border-right: 6px solid #1890ff;
  border-bottom: 6px solid transparent;
}
.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
