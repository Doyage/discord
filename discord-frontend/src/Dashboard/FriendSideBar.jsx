import React from 'react';
import { styled } from '@mui/material';
import AddFriendButton from './AddFriendButton';
import FriendsTitle from './FriendsTitle';
import FreidsList from './FreidsList';
import PendingInvitationsList from './PendingInvitationsList';

const MainContainer = styled('div')({
  width: '224px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#2F3136',
});

const FriendSideBar = () => {
  return (
    <MainContainer>
      <AddFriendButton />
      <FriendsTitle title="private Messages" />
      <FreidsList />
      <FriendsTitle title="Invitations" />
      <PendingInvitationsList />
    </MainContainer>
  );
};

export default FriendSideBar;
