<script setup lang="ts">
import { schemas } from '@/schema'

const componentType = ['流程控制', '数据获取', '其他行为']
//拖拽时传递组件的名称
const handleDragStart = (componentName: string, e: any) => {
  e.dataTransfer.setData('componentName', componentName)
}
</script>
<template>
  <div class="container">
    <el-row v-for="(list, index) in componentType" :key="index">
      <el-col>
        <el-row>
          <el-col>
            <p>{{ list }}</p>
          </el-col>
        </el-row>
        <el-row
          v-for="item in schemas.filter((item) => item.type === index)"
          :key="item.title"
          class="item"
          align="middle"
          draggable="true"
          @dragstart="handleDragStart(item.name, $event)"
        >
          <el-col :span="6" class="center">
            <el-icon :size="22">
              <component :is="item.iconName" />
            </el-icon>
          </el-col>
          <el-col :span="12">
            <span>{{ item.title }}</span>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped>
.container {
  width: 13vw;
  height: calc(98vh - 70px);
  position: absolute;
  left: 1vw;
  top: 70px;
  box-sizing: border-box;
  padding: 10px;
  background: #fff;
  border-radius: 8px;
  overflow-y: auto;
}
/*滚动条高宽度*/
.container::-webkit-scrollbar {
  width: 8px;
  height: 4px;
}
/*滚动条滑块*/
.container::-webkit-scrollbar-thumb {
  border-radius: 3px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
  background: #dcdbdb;
}
/*滚动条里面轨道*/
.container::-webkit-scrollbar-track {
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.05);
}
/*滚动条的小边角*/
.container::-webkit-scrollbar-corner {
  background: transparent;
}

p {
  font-size: 14px;
}
.item {
  height: 42px;
  width: 100%;
  background: #f7f7f7;
  margin-bottom: 5px;
  font-size: 12px;
  cursor: move;
}
.center {
  display: flex;
  justify-content: center;
}
</style>
