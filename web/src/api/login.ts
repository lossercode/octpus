import myRequest from '@/utils/request'
import type { LoginProps } from './api'
export const getVerifyCode = () => {
  return myRequest.request<number>({
    url: '/login',
    method: 'get'
  })
}

export const login = (user: any) => {
  return myRequest.request<LoginProps>({
    url: '/login',
    data: user,
    method: 'post'
  })
}
