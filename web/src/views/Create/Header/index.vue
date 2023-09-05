<script setup lang="ts">
import { updateTaskContent } from '@/api/tasks'
import { useComponentStore } from '@/stores'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const { componentList } = useComponentStore()
const token = ref<number>(0)
const showDialog = ref<boolean>(false)
const copy = () => {
  navigator.clipboard.writeText(token.value.toString()).then(
    function () {
      ElMessage({
        type: 'success',
        message: '复制成功'
      })
    },
    function () {
      ElMessage({
        type: 'error',
        message: '复制失败'
      })
    }
  )
}
const makeFile = async () => {
  const data = JSON.stringify(componentList)
  console.log(data)
  const id = Number(route.params.id)
  const result = await updateTaskContent(id, data)
  token.value = result
  showDialog.value = true
}
</script>
<template>
  <el-header>
    <el-row align="middle">
      <el-col :span="2">
        <el-icon :size="24">
          <Back />
        </el-icon>
        <span style="font-size: 14px"> 返回主页</span>
      </el-col>
      <!-- <el-col :span="2">
        <span>返回主页</span>
      </el-col> -->
      <el-col :span="2" :offset="18">
        <el-button type="primary" @click="makeFile">立即运行</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" @click="() => (componentList.length = 0)">撤销重做</el-button>
      </el-col>
    </el-row>
  </el-header>
  <el-dialog v-model="showDialog" width="35%" title="运行项目">
    <p>项目token为：{{ token }}</p>
    <el-button @click="copy" type="primary">复制</el-button>
  </el-dialog>
</template>
<style scoped>
.el-header {
  position: absolute;
  height: 50px;
  background: #fff;
  width: 100%;
  padding: 0;
}

.el-row {
  height: 50px;
}

.el-col {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
}

.el-col:first-child {
  cursor: pointer;
}

.el-col:nth-child(2) {
  justify-content: start;
  font-size: 14px;
}

.el-col:nth-child(6) {
  justify-content: end;
}

a {
  text-decoration: none;
  color: black;
  font-size: 14px;
}

a:hover {
  color: #409eff;
}

.el-icon:hover {
  color: #409eff;
}
</style>
