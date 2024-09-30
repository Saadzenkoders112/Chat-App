import 'reflect-metadata';
import { Chat } from '@/app/api/entities/chat';
import { Room } from '@/app/api/entities/room';
import { User } from '@/app/api/entities/user';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  database: 'chat_app',
  password: 'Zenkoderssaad123',
  entities: [User, Chat, Room],
  synchronize: true,
});
