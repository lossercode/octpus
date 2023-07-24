import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  userAccount: string;

  @Column()
  gender: number;

  @Column()
  userRole: string;

  @Column()
  userAvatar: string;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updateTime: Date;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createTime: Date;

  @Column()
  isDelete: number;
}
