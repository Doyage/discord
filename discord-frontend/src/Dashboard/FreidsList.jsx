import React from 'react';
import { styled } from '@mui/material';
import FriendsListItem from './FriendsListItem';
import { useSelector } from 'react-redux';

const MainContainer = styled('div')({
  flexGrow: 1,
  width: '100%',
});

const FreidsList = () => {
  const friends = useSelector((state) => state.friends.friends);
  const onlineUsers = useSelector((state) => state.friends.onlineUsers);

  const checkOnlineUsers = (friends = [], onlineUsers = []) => {
    friends.forEach((f) => {
      const isUserOnline = onlineUsers.find((user) => user.userId === f.id);
      f.isOnline = isUserOnline ? true : false;
    });

    return friends;
  };

  return (
    <MainContainer>
      {checkOnlineUsers(friends, onlineUsers).map((f) => (
        <FriendsListItem
          key={f.id}
          id={f.id}
          username={f.username}
          isOnline={f.isOnline}
        />
      ))}
    </MainContainer>
  );
};

export default FreidsList;
