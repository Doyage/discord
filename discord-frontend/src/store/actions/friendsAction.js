import * as api from '../../api';
import { openAlertMessage } from './alertActions';

export const friendsActions = {
  SET_FRIENDS: 'FRIENDS.SET_FRIENDS',
  SET_PENDING_FRIENDS_INVITATIONS: 'FRIENDS.SET_PENDING_FRIENDS_INVITATIONS',
  SET_ONLINE_USERS: 'FRIENDS.SET_ONLINE_USERS',
};

export const getActions = (dispatch) => {
  return {
    sendFriendInvitation: (data, closeDialogHandler) =>
      sendFriendInvitation(data, closeDialogHandler),
    acceptFriendInvitation: (data) => dispatch(acceptFriendInvitation(data)),
    rejectFriendInvitation: (data) => dispatch(rejectFriendInvitation(data)),
  };
};

export const sendFriendInvitation = (data, closeDialogHandler) => {
  return async (dispatch) => {
    const res = await api.sendFriendInvitation(data);

    if (res.error) {
      dispatch(openAlertMessage(res.exception?.response?.data));
    } else {
      dispatch(openAlertMessage('Invitation has been sent!'));
      closeDialogHandler();
    }
  };
};

export const setFriends = (friends) => {
  return {
    type: friendsActions.SET_FRIENDS,
    friends,
  };
};

export const setOnlineUsers = (onlineUsers) => {
  return {
    type: friendsActions.SET_ONLINE_USERS,
    onlineUsers,
  };
};

export const setPendingFriendsInvitations = (pendingFriendsInvitations) => {
  return {
    type: friendsActions.SET_PENDING_FRIENDS_INVITATIONS,
    pendingFriendsInvitations,
  };
};

export const acceptFriendInvitation = (data) => {
  return async (dispatch) => {
    const res = await api.acceptFriendInvitation(data);

    if (res.error) {
      dispatch(openAlertMessage(res.exception?.response?.data));
    } else {
      dispatch(openAlertMessage('Invitation accepted!'));
    }
  };
};

export const rejectFriendInvitation = (data) => {
  return async (dispatch) => {
    const res = await api.rejectFriendInvitation(data);

    if (res.error) {
      dispatch(openAlertMessage(res.exception?.response?.data));
    } else {
      dispatch(openAlertMessage('Invitation rejected!'));
    }
  };
};
