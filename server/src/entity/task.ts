import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @Column('json')
  content: JSON;
}
