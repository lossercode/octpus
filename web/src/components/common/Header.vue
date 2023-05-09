<script setup lang="ts">
/**
 * @description: 公用头部组件
 * @return {*}
 * @Date: 2023-05-07 10:39:54
 */
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
const router = useRouter()
const userStore = useUserStore()
const token = localStorage.getItem('token')
</script>
<template>
  <el-header>
    <el-row>
      <el-col :span="4" class="cursor flex" @click="router.push('/')">
        <el-image src="/logo.svg" />
      </el-col>
      <el-col :span="16">
        <!-- 定义插槽，方便在头部中间扩展其他内容例如搜索框等 -->
        <slot name="item" />
      </el-col>
      <el-col :span="4" class="flex">
        <div class="flex user" v-if="token">
          <el-avatar :src="userStore.userAvatar" />
          <span class="user-name">{{ userStore.userName }}</span>
          <el-dropdown trigger="click">
            <span>
              <el-icon>
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="userStore.logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="login" v-else>
          <el-button type="primary" @click="router.push('/login')">登录/注册</el-button>
        </div>
      </el-col>
    </el-row>
  </el-header>
</template>
<style scoped>
.el-header {
  height: 50px;
  line-height: 50px;
  box-shadow: 0 3px 6px 0px rgba(0, 0, 0, 0.09);
  display: flex;
  align-items: center;
}
.el-row,
.el-col {
  height: 50px;
}
.cursor {
  cursor: pointer;
}
/* 方便起见直接使用缩放 */
.el-image {
  width: 60%;
  display: flex;
  align-items: center;
}
.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
.user {
  cursor: pointer;
  width: 60%;
  justify-content: space-between;
}
/* 设置用户名称字符太长换行 */
.user-name {
  max-width: 80px;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  white-space: nowrap;
  font-size: 14px;
}
</style>
