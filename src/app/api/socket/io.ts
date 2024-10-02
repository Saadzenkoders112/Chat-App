// import type { Server as HTTPServer } from 'http';
import type { NextApiRequest } from 'next';
// import type { Socket as NetSocket } from 'net';
import { Server as ServerIo } from 'socket.io';
import {Server as NetServer} from 'http'

import { NextApiResponseServerIo } from '../../../../type';

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => { 
 if(!res.socket.server.io) {
  const path = "/api/socket/io"
  const httpServer: NetServer =res.socket.server as any
  const io = new ServerIo(httpServer, {
    path: path,
    addTrailingSlash: false
  })
  res.socket.server.io = io
 }
 res.end()
}

export default ioHandler

// interface SocketServer extends HTTPServer {
//   io?: IOServer | undefined;
// }

// interface SocketWithIO extends NetSocket {
//   server: SocketServer;
// }

// interface NextApiResponseWithSocket extends NextApiResponse {
//   socket: SocketWithIO;
// }

// let io: IOServer;

// const socketHandler = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
//   if (!res.socket?.server.io) {
//     console.log('Initializing Server...');
//     const httpServer = res.socket?.server;
//     io = new IOServer(httpServer);

//     io.on('connection', socket => {
//       console.log('socket connected', socket.id);
//     });
//     res.socket.server.io = io;
//   } else {
//     console.log("Socket already initialized!")
//   }
//   res.end()
// };

// export default socketHandler
