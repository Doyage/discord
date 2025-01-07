const connectdUsers = new Map();

let io = null;

export const setSocketServerInstance = (ioInstance) => {
  io = ioInstance;
};

export const getSocketServerInstance = () => {
  return io;
};

export const addNewConnectedUser = ({ socketId, userId }) => {
  connectdUsers.set(socketId, { userId });
  console.log('new connected users');
  console.log(connectdUsers);
};

export const removeConnectedUser = (socketId) => {
  console.log('removeConnectedUser', socketId);
  if (connectdUsers.has(socketId)) {
    connectdUsers.delete(socketId);
    console.log('new connected users');
    console.log(connectdUsers);
  }
};

export const getActiveConnections = (userId) => {
  const activeConnections = [];

  connectdUsers.forEach((value, key) => {
    if (value.userId === userId) {
      activeConnections.push(key);
    }
  });

  return activeConnections;
};

export const getOnlineUsers = () => {
  const onlineUsers = [];

  connectdUsers.forEach((value, key) => {
    onlineUsers.push({ socketId: key, userId: value.userId });
  });

  return onlineUsers;
};
