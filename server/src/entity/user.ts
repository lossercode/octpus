import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_phone: string;

  @Column()
  registry_time: string;

  @Column()
  role: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  update_time: Date;

  @Column()
  user_avatar: string;

  @Column()
  user_name: string;
}
