import myRequest from '@/utils/request'
import type { NewTaskProps, Task, UserTasks } from '.'

// 获取用户所有的任务
export const userAllTasks = (offset: number) => {
  return myRequest.request<UserTasks>({
    url: `/task/getUserAllTasks?offset=${offset}`,
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
    url: '/task/newTask',
    method: 'post',
    data: task
  })
}

/**
 * @description: 获取项目具体配置
 * @param {number} taskId
 * @return {*}
 */
export const getTaskContent = (taskId: number) => {
  return myRequest.request<Task>({
    url: `/task/getTaskContent?taskId=${taskId}`,
    method: 'get'
  })
}

/**
 * @description: 更新项目具体配置
 * @param {number} taskId,
 * @param {Component} props 使用JSON处理后的数据转化为字符串
 * @return {*}
 */
export const updateTaskContent = (taskId: number, props: string) => {
  return myRequest.request<number>({
    url: '/task/setTaskContent',
    method: 'post',
    data: {
      id: taskId,
      content: props
    }
  })
}
