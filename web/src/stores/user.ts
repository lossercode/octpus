import { defineStore } from 'pinia'
import { ref } from 'vue'
//此处应该使用router而不能用useRoter，因为useRouter只能在setup中使用
import router from '@/router'
import { login } from '@/api/user'
import type { User } from '@/api'
import { ElMessage } from 'element-plus'
export const useUserStore = defineStore('user', () => {
  //使用pinia当页面刷新时会出现数据丢失情况，此处还未考虑pinia持久化

  const token = ref<string>('')
  const userName = ref<string>('')
  const userAvatar = ref<string>('')
  const userRole = ref<number>(0)
  const userId = ref<number>(-1)

  const getUserInfo = async (user: User) => {
    const userInfo = await login(user)
    token.value = userInfo.token
    userName.value = userInfo.userName
    userAvatar.value = userInfo.userAvatar
    userRole.value = userInfo.userRole
    userId.value = userInfo.userId
    localStorage.setItem('token', token.value)
  }

  const logout = () => {
    localStorage.removeItem('token')
    token.value = ''
    userName.value = ''
    userAvatar.value = ''
    userRole.value = 0
    userId.value = -1
    router.push('/login')
  }
  return { token, userId, userName, userAvatar, userRole, logout, getUserInfo }
})
