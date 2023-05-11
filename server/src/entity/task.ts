import { prop, Severity } from '@typegoose/typegoose';

export class Task {
  @prop()
  public userId: number;

  @prop()
  public createTime: string;

  @prop({ allowMixed: Severity.ALLOW, type: () => [Object] })
  public configs: [object];

  @prop()
  public name: string;

  @prop()
  public des: string;

  @prop()
  public guide: string;
}
