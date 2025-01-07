import FriendInvitation from '../../models/friendInvitation.js';
import User from '../../models/user.js';
import {
  getActiveConnections,
  getSocketServerInstance,
} from '../../serverStore.js';

export const updateFriendsPendingInvitations = async (userId) => {
  try {
    const pendingInvitations = await FriendInvitation.find({
      receiverId: userId,
    }).populate('senderId', '_id username mail');

    const receiverList = getActiveConnections(userId);

    const io = getSocketServerInstance();

    receiverList.forEach((receiverSocketId) => {
      io.to(receiverSocketId).emit('friends-invitaions', {
        pendingInvitations: pendingInvitations ?? [],
      });
    });
  } catch (error) {
    console.error('updateFriendsPendingInvitations', error);
  }
};

export const updateFriends = async (userId) => {
  try {
    const receiverList = getActiveConnections(userId);

    if (receiverList.length > 0) {
      const user = await User.findById(userId, { _id: 1, friends: 1 }).populate(
        'friends',
        '_id username mail',
      );

      if (user) {
        const friendsList = user.friends.map((f) => {
          return {
            id: f._id,
            mail: f.mail,
            username: f.username,
          };
        });

        const io = getSocketServerInstance();

        receiverList.forEach((receiverSocketId) => {
          io.to(receiverSocketId).emit('friends-list', {
            friends: friendsList ?? [],
          });
        });
      }
    }
  } catch (error) {
    console.error('updateFriends', error);
  }
};
