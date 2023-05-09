import { Body, Controller, Post, Get, Query } from '@midwayjs/core';
import { Inject } from '@midwayjs/decorator';
import { NewTaskService } from '../service/newTaskService';
import { BaseResponse } from '../types/BaseResponse';

@Controller('/api/task')
export class NewTask {
  @Inject()
  newTaskService: NewTaskService;

  @Post('/addTask')
  async addNewTask(@Body('') configs: Array<any>): Promise<BaseResponse<any>> {
    try {
      const taskId = await this.newTaskService.addTask(configs);
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
    const configs = await this.newTaskService.getTask(token);
    return {
      code: 200,
      message: 'success',
      data: configs,
    };
  }
}
