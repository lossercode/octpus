import { Body, Controller, Post, Get, Query } from '@midwayjs/core';
import { Inject } from '@midwayjs/decorator';
import { TaskService } from '../service/taskService';
import { BaseResponse } from '../types/BaseResponse';

@Controller('/api/task')
export class Task {
  @Inject()
  taskService: TaskService;

  @Post('/newTask')
  async newTask(@Body('') task: any): Promise<BaseResponse<any>> {
    try {
      const taskId = await this.taskService.newTask(task);
      console.log(taskId);
      return {
        code: 200,
        message: 'success',
        data: taskId,
      };
    } catch (error) {
      return {
        code: 500,
        message: 'fail',
        data: '',
      };
    }
  }

  @Get('/getTask')
  async getTask(@Query('token') token: string): Promise<BaseResponse<any>> {
    const configs = await this.taskService.getTask(token);
    return {
      code: 200,
      message: 'success',
      data: configs,
    };
  }

  @Post('/addConfigs')
  async addConfigs(@Body('') configs: Array<any>): Promise<BaseResponse<any>> {
    const id = await this.taskService.addConfigs(configs);
    return {
      code: 200,
      message: 'success',
      data: id,
    };
  }
}
