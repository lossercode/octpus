<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'
import { newTask } from '@/api/newTask'
import router from '@/router'
const showDialog = ref(false)
const task = reactive({
  name: '',
  des: '',
  guide: ''
})
const addNewTask = async () => {
  const taskId = await newTask(task)
  router.push({
    name: 'create',
    params: {
      id: taskId
    }
  })
}
const lookTask = async (index: number) => {
  router.push({
    name: 'taskStatus',
    params: {
      id: tableData[index].id
    }
  })
}
const editTask = async (index: number) => {
  router.push({
    name: 'edit',
    params: {
      id: tableData[index].id
    }
  })
}
const tableData = [
  {
    id: 0,
    date: '2016-05-03',
    name: 'Tom',
    statu: '正在运行',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    id: 1,
    date: '2016-05-02',
    name: 'John',
    statu: '已停止',
    address: 'No. 189, Grove St, Los Angeles'
  }
]
</script>
<template>
  <div class="title">我的应用</div>
  <div class="search">
    <el-row>
      <el-col :span="8">
        <el-input placeholder="搜索应用" :suffix-icon="Search" />
      </el-col>
      <el-col :span="4" class="flush">
        <el-button>刷新</el-button>
      </el-col>
      <el-col :span="4" :offset="8" class="operation">
        <el-button type="primary" @click="showDialog = true">新建应用</el-button>
      </el-col>
    </el-row>
  </div>
  <div class="table">
    <el-table stripe :data="tableData">
      <el-table-column label="名称" prop="name" />
      <el-table-column label="更新时间" prop="date" />
      <el-table-column label="状态" prop="statu" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="editTask(scope.$index)">编辑</el-button>
          <el-button size="small" type="danger">删除</el-button>
          <el-button size="small" @click="lookTask(scope.$index)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog v-model="showDialog" title="应用详情" width="35%">
    <el-form v-model="task">
      <el-form-item label="应用名称">
        <el-input v-model="task.name" />
      </el-form-item>
      <el-form-item label="应用简介">
        <el-input type="textarea" maxlength="30" v-model="task.des" />
      </el-form-item>
      <el-form-item label="使用说明">
        <el-input type="textarea" :rows="6" maxlength="1000" v-model="task.guide" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="primary" @click="addNewTask">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style scoped>
.title {
  height: 40px;
  font-size: 18px;
  line-height: 40px;
}
.flush {
  display: flex;
  justify-content: center;
}
.operation {
  display: flex;
  justify-content: flex-end;
}
.table {
  margin-top: 20px;
}
</style>
