import myRequest from '@/utils/request'
import type { NewTaskProps, UserTasks } from '.'

// 获取用户所有的任务
export const userAllTasks = (userId: number, offset: number) => {
  return myRequest.request<UserTasks>({
    url: `/tasks/userAllTasks?userId=${userId}&offset=${offset}`,
    method: 'get'
  })
}

export const deleteUserTask = (userId: number) => {
  return myRequest.request<null>({
    url: `/tasks/deleteUserTask?userId=${userId}`,
    method: 'put'
  })
}

export const newTask = (task: NewTaskProps) => {
  return myRequest.request<number>({
    url: '/tasks/addNewTask',
    method: 'post',
    data: task
  })
}
