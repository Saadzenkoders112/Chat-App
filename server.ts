import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import { initializeDatabase } from '../Frontend/src/app/api/lib/db';
import { Room } from './src/app/api/entities/room';
import { AppDataSource } from './src/app/api/lib/typeOrm.config';
import { User } from './src/app/api/entities/user';
import { getTokenData } from './src/utils/helpers.util';
import { Chat } from './src/app/api/entities/chat';
import { Friend } from './src/app/api/entities/friend';
import { NextResponse } from 'next/server';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.use(cors());

io.on('connection', async (socket: Socket) => {
  console.log('Main socket is connected');
  socket.on(
    'create_room',
    async (req: { roomName: string; userId: number; friendId: number }) => {
      try {
        const headers = socket.handshake?.headers?.authorization?.split(' ')[1];
        const token = await getTokenData(headers || '');

        if (token) {
          const room = new Room();
          const newFriend = new Friend();

          room.name = req.roomName;
          room.createdBy = req.userId;
          room.participant = req.friendId;
          newFriend.friendId = req.friendId;
          newFriend.userId = token?.id as number;

          const roomRepository = AppDataSource.getRepository(Room);
          const userRepository = AppDataSource.getRepository(User);
          const friendRepository = AppDataSource.getRepository(Friend);

          await friendRepository.save(newFriend);

          const user =
            token && (await userRepository.findOneBy({ id: token.id }));
          const friend = await userRepository.findOneBy({ id: req.friendId });
          if (user && friend) {
            await roomRepository.save(room);
            socket.emit('room_created', { room: room, msg: 'Friend added' });
          } else {
            socket.emit('room_created', 'User does not exist');
          }
        }
      } catch (error) {
        socket.emit('Error adding friend');
      }
    },
  );

  socket.on('join_room', async (req: { roomId: number; userId: number }) => {
    const room = await AppDataSource.getRepository(Room).findOneBy({
      id: req.roomId,
    });
    if (room) {
      socket.join(room.id.toString());
      socket.emit('room_joined', `${req.userId} joined ${req.roomId}`);
    } else {
      socket.emit('room_joined', 'Error joining chat');
    }
  });

  socket.on(
    'sendMessage',
    async (req: { roomId: number; userId: number; message: string }) => {
      const { roomId, userId, message } = req;
      const chat = new Chat();
      chat.message = message;
      chat.senderId = userId;
      chat.roomId = roomId;
      chat.sentAt = new Date();
      await AppDataSource.getRepository(Chat).save(chat);

      io.to(req.roomId.toString()).emit('new_message', chat, 'New message');
    },
  );
  
});

const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await initializeDatabase();
    console.log('Database connected successfully');

    server.listen(PORT, () => {
      console.log(`Server Listening on PORT ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);
  }
};

startServer();
