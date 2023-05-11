import myRequest from '@/utils/request'
export const getShell = (data: any) => {
  return myRequest.request({
    url: '/task/addConfigs',
    method: 'POST',
    data: data
  })
}
