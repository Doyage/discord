import { Server } from 'socket.io';
import { verifyTokenSocket } from './middlewares/authSocket.js';
import { newConnectionHandler } from './socketHandlers/newConnectionHandler.js';
import { disconnectHandler } from './socketHandlers/disconnectHandler.js';
import { getOnlineUsers, setSocketServerInstance } from './serverStore.js';

export const registerSocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.use((socket, next) => {
    verifyTokenSocket(socket, next);
  });

  setSocketServerInstance(io);

  const emitOnlineUsers = () => {
    const onlineUsers = getOnlineUsers();
    io.emit('online-users', { onlineUsers });
  };

  io.on('connection', (socket) => {
    console.log('user connected');

    newConnectionHandler(socket, io);
    emitOnlineUsers();

    socket.on('disconnect', () => {
      disconnectHandler(socket);
    });
  });

  setInterval(() => {
    emitOnlineUsers();
  }, 3000);
};
