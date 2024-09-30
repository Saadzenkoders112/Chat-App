import 'reflect-metadata';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user';
import { Room } from './room';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  message!: string;

  @ManyToOne(() => User, user => user.chats)
  user!: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  sentAt!: Date;

  @ManyToOne(() => Room, room => room.chats)
  room!: Room;
}
