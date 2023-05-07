//响应类型，主要处理ts无法识别
//参考文档：https://github.com/buqiyuan/vue3-antd-admin/blob/main/src/utils/request.ts
// export type Response<T = any> = {
//   code: number
//   message: string
//   data: T
// }
// export type BaseResponse<T = any> = Promise<Response<T>>

export type LoginProps = {
  token: string
  userName: string
  userAvatar: string
  role: string
}
