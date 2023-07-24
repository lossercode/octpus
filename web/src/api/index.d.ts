//响应类型，主要处理ts无法识别
//参考文档：https://github.com/buqiyuan/vue3-antd-admin/blob/main/src/utils/request.ts
// export type Response<T = any> = {
//   code: number
//   message: string
//   data: T
// }
// export type BaseResponse<T = any> = Promise<Response<T>>

// 登录所需要的用户信息
export type User = {
  userAccount: string
  verifyCode: string
}

// 登录后返回的信息
export type UserInfo = {
  userId: number
  token: string
  userName: string
  userAvatar: string
  userRole: number
}

/**
 * 用户中心 需要用到的每个项目的具体信息
 */
export type TaskInfo = {
  id: number
  updateTime: string
  name: string
  statu: string | number
}

export type UserTasks = {
  tasksList: TaskInfo[]
  total: number
}

/**
 * 新建项目需要用到的参数
 */
export type NewTaskProps = {
  name: string
  des: string
}
