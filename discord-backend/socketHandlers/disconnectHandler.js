import { removeConnectedUser } from '../serverStore.js';

export const disconnectHandler = (socket) => {
  console.log('disconnect');
  removeConnectedUser(socket.id);
};
