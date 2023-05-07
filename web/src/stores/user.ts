import { defineStore } from 'pinia'
import { ref } from 'vue'
//此处应该使用router而不能用useRoter，因为useRouter只能在setup中使用
import router from '@/router'
import { login } from '@/api/login'
export const useUserStore = defineStore('user', () => {
  //jwt验证相关
  const token = ref<string>('')
  //全局会使用到的用户信息
  const userName = ref<string>('')
  const userAvatar = ref<string>('')
  const role = ref<string>('')
  //登录时获取用户相关信息
  const getUserInfo = async (telephone: object) => {
    const userInfo = await login(telephone)
    token.value = userInfo.token
    userName.value = userInfo.userName
    userAvatar.value = userInfo.userAvatar
    role.value = userInfo.role
    localStorage.setItem('token', token.value)
  }
  const logout = () => {
    localStorage.setItem('token', '')
    token.value = ''
    userName.value = ''
    userAvatar.value = ''
    role.value = ''
    router.push('login')
  }
  return { token, userName, userAvatar, role, logout, getUserInfo }
})
