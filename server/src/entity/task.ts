import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('task')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userAccount: string;

  @Column()
  name: string;

  @Column()
  des: string;

  @Column()
  statu: number;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updateTime: Date;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createTime: Date;

  @Column()
  delete: number;

  // 使用 Json 会存在长度限制，直接用longText
  @Column()
  content: string;
}
