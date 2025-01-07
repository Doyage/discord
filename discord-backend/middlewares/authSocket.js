import jwt from 'jsonwebtoken';

const config = process.env;

export const verifyTokenSocket = (socket, next) => {
  const token = socket.handshake.auth?.token;

  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    socket.user = decoded;
  } catch (error) {
    const socketError = new Error('NOT AUTHORIZED');
    console.error('socket auth error', error);
    return next(socketError);
  }

  next();
};
