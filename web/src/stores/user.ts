import { defineStore } from 'pinia'
import { ref } from 'vue'
//此处应该使用router而不能用useRoter，因为useRouter只能在setup中使用
import router from '@/router'
import { login } from '@/api/login'
export const useUserStore = defineStore('user', () => {
  //使用pinia当页面刷新时会出现数据丢失情况，此处还未考虑pinia持久化

  const token = ref<string>('')
  const userName = ref<string>('')
  const userAvatar = ref<string>('')
  const role = ref<string>('')

  const getUserInfo = async (telephone: object) => {
    const userInfo = await login(telephone)
    token.value = userInfo.token
    userName.value = userInfo.userName
    userAvatar.value = userInfo.userAvatar
    role.value = userInfo.role
    localStorage.setItem('token', token.value)
  }

  const logout = () => {
    localStorage.removeItem('token')
    token.value = ''
    userName.value = ''
    userAvatar.value = ''
    role.value = ''
    router.push('/login')
  }
  return { token, userName, userAvatar, role, logout, getUserInfo }
})
