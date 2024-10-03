import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import { initializeDatabase } from '../Frontend/src/app/api/lib/db';
import { Room } from './src/app/api/entities/room';
import { AppDataSource } from './src/app/api/lib/typeOrm.config';
import { User } from './src/app/api/entities/user';
import { getTokenData } from './src/utils/helpers.util';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.use(cors());

io.on('connection', (socket: Socket) => {
  console.log('Main socket is connected');

  socket.on(
    'create_room',
    async (req: { roomName: string; userId: number; friendId: number }) => {
      try {
        const room = new Room();
        room.name = req.roomName;
        room.createdBy = req.userId;
        room.participant = req.friendId;
        const headers = socket.handshake?.headers?.authorization?.split(' ')[1];
        const token = await getTokenData(headers || '');

        const roomRepository = AppDataSource.getRepository(Room);
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ id: token.id });
        const friend = await userRepository.findOneBy({ id: req.friendId });
        if (user && friend) {
          await roomRepository.save(room);
          console.log('Room created');
          socket.emit('room_created', room);
        }
      } catch (error) {
        socket.emit('Error creating room');
      }
    },
  );

  socket.on('join_room', async (req: { roomId: number; userId: number }) => {
    const room = await AppDataSource.getRepository(Room).findOneBy({
      id: req.roomId,
    });
    if (room) {
      socket.join(req.roomId.toString());
      socket.emit("room_created",`${req.userId} joined ${req.roomId}`);
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
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
