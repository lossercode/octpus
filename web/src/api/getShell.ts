import myRequest from '@/utils/request'
export const getShell = (data: any) => {
  return myRequest.request({
    url: '/task/addTask',
    method: 'POST',
    data: data
  })
}
