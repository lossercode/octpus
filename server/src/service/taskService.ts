import { Inject, Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Task } from '../entity/task';
import { Context } from '@midwayjs/koa';
import { Repository } from 'typeorm';

@Provide()
export class TaskService {
  @Inject()
  ctx: Context;

  @InjectEntityModel(Task)
  taskModel: Repository<Task>;

  async newTask(name: string, des: string) {
    const isDuplicate = await this.taskModel.findOne({
      where: { name: name },
    });
    if (isDuplicate) {
      throw new Error(`Task ${name} already exists`);
    }
    const task = new Task();
    task.name = name;
    task.des = des;
    task.content = '';
    task.userAccount = this.ctx.getAttr('userAccount');
    const newTaskResult = await this.taskModel.save(task);
    return newTaskResult.id;
  }

  async getTask(id: number) {
    const task = await this.taskModel.findOne({
      where: { id: id },
    });
    if (!task) {
      throw new Error('项目不存在');
    }
    return task;
  }

  async setTaskContent(id: number, content: string) {
    const task = await this.taskModel.findOne({
      where: { id: id },
    });
    task.content = content;
    await this.taskModel.save(task);
  }

  async getUserAllTasksService(userAccount: string, offset: number) {
    const [allTasks, count] = await this.taskModel.findAndCount({
      select: ['id', 'name', 'statu', 'updateTime'],
      where: { userAccount: userAccount },
    });
    const someTasks = allTasks.slice(
      (offset - 1) * 10,
      offset * 10 > count ? count + 1 : (offset + 1) * 10
    );
    console.log(someTasks, count);
    return [someTasks, count];
  }
}
