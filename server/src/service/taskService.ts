import { Inject, Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Task } from '../entity/task';
import { Context } from '@midwayjs/koa';

@Provide()
export class TaskService {
  @Inject()
  ctx: Context;

  @InjectEntityModel(Task)
  taskModel: ReturnModelType<typeof Task>;

  async newTask(task: any) {
    const { _id: id } = await this.taskModel.create({
      userId: this.ctx.getAttr('userId'),
      ...task,
      createTime: new Date().getTime(),
      configs: [],
    } as Task);
    return id;
  }

  async getTask(id: string) {
    try {
      const task = await this.taskModel.findById(id).exec();
      return task;
    } catch (error) {
      return 'id is invaild';
    }
  }

  async addConfigs(configs: Array<any>) {
    try {
      await this.taskModel.updateOne(
        { userId: this.ctx.getAttr('userId') },
        { configs: configs }
      );
      const { _id: id } = await this.taskModel.findOne({
        userId: this.ctx.getAttr('userId'),
      });
      return id;
    } catch (error) {
      console.log(error);
      return 'error';
    }
  }
}
