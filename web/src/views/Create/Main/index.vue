<script setup lang="ts">
import { ref } from 'vue'
import { useComponentStore } from '@/stores'
import { deepCopy, findItem } from '@/utils'
import { schemas } from '@/schema'
import RenderFlow from '@/components/common/RenderFlow.vue'
const { componentList, addComponent, deleteComponent } = useComponentStore()
const showDialog = ref<boolean>(false)
const lineTop = ref<number>(0)
const showLine = ref<boolean>(false)
const currentComponent = ref<number>(0)

//监听组件拖拽drop事件
const handleDrop = (e: any) => {
  //停止拖拽后网格线消失
  showLine.value = false
  //获取组件的id
  const id = e.dataTransfer.getData('id')
  //在schema中找到对应组件
  const component = schemas.filter((item) => item.id === id)[0]
  //深拷贝对应组件放到pinia中，并且根据当前的指示线的高度来进行计算要插入的位置，
  addComponent(deepCopy(component), Math.floor(lineTop.value / 50))
  //判断元素是否是嵌套组件
  if (component.nestedEnd) {
    addComponent(
      deepCopy(findItem(schemas, component.nestedEnd)),
      Math.floor(lineTop.value / 50) + 1
    )
  }
  //拖拽结束后将当前组件索引指向拖拽组件
  currentComponent.value = Math.floor(lineTop.value / 50)
  //判断是否处于嵌套组件中
  isLoop(currentComponent.value)
  //打开配置项
  showDialog.value = true
}
//判断是否处于嵌套组件中
const isLoop = (currentIndex: number) => {
  let temp = currentIndex - 1
  //第一个元素不需要判断
  if (temp < 0) {
    componentList[currentIndex].indent = 0
    return
  }
  let indent = 0
  //如果前面一个是循环结束标志，就直接在前面一个的indent上加一，如果是同级元素就相同的indent
  if (componentList[temp].nestedEnd) {
    indent = componentList[temp].indent ? componentList[temp].indent + 1 : 1
  } else {
    indent = componentList[temp].indent
  }
  componentList[currentIndex].indent = indent
  //如果当前组件是嵌套组件，结尾组件也需要设置缩进
  if (componentList[currentIndex].nestedEnd) componentList[currentIndex + 1].indent = indent
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
</script>
<template>
  <div class="container" @drop.stop="handleDrop" @dragover.stop.prevent>
    <div class="wrap">
      <el-row class="content">
        <!-- 左侧流程序号 -->
        <el-col :span="1">
          <div class="index" v-for="(item, index) in componentList" :key="item.id">
            {{ index + 1 }}
          </div>
        </el-col>
        <!-- 流程图渲染 -->
        <el-col :span="23" @dragover="dragover">
          <el-row v-for="(component, index) in componentList" :key="component.id" align="middle">
            <el-col :span="23">
              // 渲染单个组件
              <div class="component">
                <RenderFlow
                  :index="index"
                  :icon="component.iconName"
                  :title="component.title"
                  :configs="component.configs"
                  :indent="component.indent ?? 0"
                  @change="(index:number) => (showDialog = true) && (currentComponent = index)"
                />
              </div>
            </el-col>
            <!-- 如果有typeName表示不是嵌套组件的结束组件，可以删除 -->
            <el-col :span="1" class="center" v-if="component.typeName !== 'nestedEnd'">
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
      <el-dialog
        v-model="showDialog"
        title="配置项"
        :width="componentList[currentComponent]?.dialogWidth"
      >
        <!-- style="--el-dialog-width: 32%" -->
        <!-- <el-form v-model="componentList[currentComponent]">
          <el-form-item
            v-for="config in componentList[currentComponent]?.configs"
            :key="config.propName"
            :label="config.formLabel"
          >
            <el-row style="width: 100%" align="middle">
              <el-col :span="20">
                <component
                  :is="config.componentName"
                  v-model="config.value"
                  :options="config.options"
                />
              </el-col>
              <el-col :span="4" class="flex" v-if="config.tips">
                <el-tooltip effect="dark" :content="config.tips" placement="right">
                  <el-icon class="tips" size="18"><QuestionFilled /></el-icon>
                </el-tooltip>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form> -->
        <component :is="componentList[currentComponent]?.componentName" :index="currentComponent" />
        <template #footer>
          <span>
            <el-button type="primary" @click="showDialog = false">确定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
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
