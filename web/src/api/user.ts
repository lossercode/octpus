import myRequest from '@/utils/request'
import type { UserInfo, User } from '.'

/**
 * 获取验证码
 * @param userAccount
 * @returns
 */
export const getVerifyCode = (userAccount: string) => {
  return myRequest.request<{ code: number }>({
    url: '/user/verify',
    method: 'post',
    data: {
      userAccount: userAccount
    }
  })
}

/**
 * 用户登录
 * @param user
 * @returns
 */
export const login = (user: User) => {
  return myRequest.request<UserInfo>({
    url: '/user/login',
    data: user,
    method: 'post'
  })
}
