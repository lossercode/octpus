import myRequest from '@/utils/request'

export const newTask = (data: any) => {
  return myRequest.request<string>({
    url: '/user/newTask',
    method: 'post',
    data: data
  })
}
