import io from 'socket.io-client';
import {
  setFriends,
  setOnlineUsers,
  setPendingFriendsInvitations,
} from '../store/actions/friendsAction';
import store from '../store/store';

let socket = null;

export const connectWithSocketServer = (userDetails) => {
  const jwtToken = userDetails.token;

  socket = io('http://localhost:8081', {
    auth: {
      token: jwtToken,
    },
  });

  socket.on('connect', () => {
    console.log('success');
    console.log(socket.id);
  });

  socket.on('friends-invitaions', (data) => {
    const { pendingInvitations } = data;

    store.dispatch(setPendingFriendsInvitations(pendingInvitations));
  });

  socket.on('friends-list', (data) => {
    const { friends } = data;

    store.dispatch(setFriends(friends));
  });

  socket.on('online-users', (data) => {
    const { onlineUsers } = data;

    store.dispatch(setOnlineUsers(onlineUsers));
  });
};
