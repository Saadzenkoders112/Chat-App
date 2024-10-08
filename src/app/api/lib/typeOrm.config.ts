import 'reflect-metadata';
import { Chat } from '../entities/chat';
import { Room } from '../entities/room';
import { User } from '../entities/user';
import { DataSource } from 'typeorm';
import { Friend } from '../entities/friend';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  database: 'chat_app',
  password: 'Zenkoderssaad123',
  entities: [User, Chat, Room, Friend],
  synchronize: true,
});
