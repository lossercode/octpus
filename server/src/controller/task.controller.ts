import { Body, Controller, Post, Get, Query } from '@midwayjs/core';
import { Inject } from '@midwayjs/decorator';
import { TaskService } from '../service/taskService';
import { Context } from '@midwayjs/koa';
import { UnauthorizedErrorFilter } from '../filter/unauthorized';

@Controller('/api/task')
export class Task {
  @Inject()
  ctx: Context;
  @Inject()
  taskService: TaskService;

  /**
   * @description: 新建项目
   * @return {*}
   * @Date: 2023-07-23 16:01:08
   */
  @Post('/newTask')
  async newTask(@Body('name') name: string, @Body('des') des: string) {
    const taskId = await this.taskService.newTask(name, des);
    console.log(taskId);
    return {
      code: 200,
      message: 'success',
      data: taskId,
    };
  }
  /**
   * @description: 获取某个项目的具体信息
   * @return {*}
   * @Date: 2023-07-23 16:04:27
   */
  @Get('/getTask')
  async getTask(@Query('id') id: number) {
    const task = await this.taskService.getTask(id);
    return {
      code: 200,
      message: 'success',
      data: task,
    };
  }

  /**
   * @description: 进入用户中心时获取用户所有的项目, 参数只需要一个offset，也就是页码数
   * @return {*}
   * @Date: 2023-07-23 16:06:46
   */

  @Get('/getUserAllTasks')
  async getUserAllTasks(@Query('offset') offset: number) {
    const userAccount = this.ctx.getAttr('userAccount') as string;
    if (!userAccount) {
      throw new UnauthorizedErrorFilter();
    }
    const [tasks, count] = await this.taskService.getUserAllTasksService(
      userAccount,
      offset
    );
    return {
      code: 200,
      message: 'success',
      data: {
        tasksList: tasks,
        total: count,
      },
    };
  }

  /**
   * @description: 更新项目具体配置信息
   * @return {*}
   * @Date: 2023-07-23 16:00:12
   */
  @Post('/setTaskContent')
  async addConfigs(@Body('id') id: number, @Body('content') content: string) {
    await this.taskService.setTaskContent(id, content);
    return {
      code: 200,
      message: 'success',
      data: id,
    };
  }
}
