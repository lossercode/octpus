import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Task } from '../entity/task';

@Provide()
export class NewTaskService {
  @InjectEntityModel(Task)
  taskModel: ReturnModelType<typeof Task>;

  async addTask(configs: Array<any>[]) {
    const { _id: id } = await this.taskModel.create({
      userId: 123,
      configs: configs,
      createTime: '2023/4/15',
    } as Task);
    const task = await this.taskModel.findById(id).exec();
    return task._id;
  }

  async getTask(id: string) {
    try {
      const task = await this.taskModel.findById(id).exec();
      return task.configs;
    } catch (error) {
      return 'id is invaild';
    }
  }
}
