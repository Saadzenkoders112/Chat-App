// entities/User.ts
import 'reflect-metadata';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Room } from './room';
import { Chat } from './chat';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  first_name!: string;

  @Column()
  last_name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => Chat, chat => chat.user)
  chats!: Chat[];

  @ManyToMany(() => Room, room => room.users)
  rooms!: Room[];

  @Column({ nullable: true }) // Token field
  resetToken!: string;

  @Column({ type: 'timestamp', nullable: true }) // Expiration date field
  resetTokenExpiration!: Date;
}
