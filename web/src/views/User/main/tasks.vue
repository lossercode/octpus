<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { ref, reactive, onMounted } from 'vue'
import { newTask } from '@/api/tasks'
import router from '@/router'
import { deleteUserTask, userAllTasks } from '@/api/tasks'
import { useUserStore } from '@/stores/user'
import type { UserTasks } from '@/api'

// 两个提示框
const showNewDialog = ref(false)
const showDeleteDialog = ref(false)
// 获取当前要删除的项目的索引
const delete_id = ref(-1)

// 用户所有的项目数据
const userTasks = reactive<UserTasks>({ tasksList: [], total: 0 })
const { userId } = useUserStore()

/**
 * 请求用户项目,每次请求最多返回10个
 * @param current 当前选中的页数
 */
const getUserTasks = async (current: number) => {
  const allTasks = await userAllTasks(userId, current)
  userTasks.tasksList = allTasks.tasksList
  userTasks.total = allTasks.total
}
onMounted(async () => {
  // 初始时获取用户所有任务信息
  getUserTasks(1)
})

/**
 * 项目操作控制
 * @param index
 */
const operationControl = (index: number) => {
  return userTasks.tasksList[index].statu === '运行中' ? true : false
}

/**
 * 展示删除确认框
 * @param index 当前要删除的项目索引
 */
const showDeleteModal = async (index: number) => {
  showDeleteDialog.value = true
  delete_id.value = index
}

/**
 * 删除选中的任务
 */
const deleteTask = async () => {
  const id = userTasks.tasksList[delete_id.value].id
  await deleteUserTask(id)
  // 刷新列表
  await getUserTasks(1)
  showDeleteDialog.value = false
}

const task = reactive({
  name: '',
  des: ''
})
/**
 * 新建项目：需要项目的名称以及描述
 */
const addNewTask = async () => {
  const taskId = await newTask(task)
  router.push({
    name: 'create',
    params: {
      id: taskId
    }
  })
}
/**
 * 查看项目
 * @param index 选中的项目的位置索引
 */
const lookTask = async (index: number) => {
  router.push({
    name: 'taskStatus',
    params: {
      id: userTasks.tasksList[index].id
    }
  })
}
/**
 * 编辑项目
 * @param index 选中的项目的位置索引
 */
const editTask = async (index: number) => {
  router.push({
    name: 'create',
    params: {
      id: userTasks.tasksList[index].id
    }
  })
}
</script>
<template>
  <div class="title">我的项目</div>
  <div class="search">
    <el-row>
      <el-col :span="8">
        <el-input placeholder="搜索项目" :suffix-icon="Search" />
      </el-col>
      <el-col :span="4" class="flush">
        <el-button>刷新</el-button>
      </el-col>
      <el-col :span="4" :offset="8" class="operation">
        <el-button type="primary" @click="showNewDialog = true">新建项目</el-button>
      </el-col>
    </el-row>
  </div>
  <div class="table">
    <el-table stripe :data="userTasks.tasksList">
      <el-table-column label="名称" prop="name" />
      <el-table-column label="更新时间" prop="updateTime" />
      <el-table-column label="状态" prop="statu" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            size="small"
            @click="editTask(scope.$index)"
            :disabled="operationControl(scope.$index)"
            >编辑</el-button
          >
          <el-button size="small" @click="lookTask(scope.$index)">查看</el-button>
          <el-button
            size="small"
            type="danger"
            :disabled="operationControl(scope.$index)"
            @click="showDeleteModal(scope.$index)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      style="margin-top: 20px"
      :total="userTasks.total"
      :size="10"
      :hide-on-single-page="true"
      @current-change="getUserTasks"
    />
  </div>

  <el-dialog v-model="showNewDialog" title="项目详情" width="35%">
    <el-form v-model="task">
      <el-form-item label="项目名称" required>
        <el-input v-model="task.name" placeholder="最多16字符" />
      </el-form-item>
      <el-form-item label="项目简介" required>
        <el-input
          type="textarea"
          :rows="6"
          maxlength="100"
          v-model="task.des"
          placeholder="最多100字符"
        />
      </el-form-item>
      <!-- <el-form-item label="使用说明">
        <el-input type="textarea" :rows="6" maxlength="1000" v-model="task.guide" />
      </el-form-item> -->
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showNewDialog = false">取消</el-button>
        <el-button type="primary" @click="addNewTask">确认</el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="showDeleteDialog" title="提示" width="35%">
    <p>确定要删除此任务吗？</p>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showDeleteDialog = false">取消</el-button>
        <el-button type="primary" @click="deleteTask">确认</el-button>
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
