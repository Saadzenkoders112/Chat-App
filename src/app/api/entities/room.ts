import 'reflect-metadata';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user';
import { Chat } from './chat';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => Chat, chat => chat.room)
  chats!: Chat[];

  @ManyToMany(() => User, user => user.rooms)
  users!: User[];
}
