import React from 'react';
import { styled } from '@mui/material';
import PendingInvitationsListItem from './PendingInvitationsListItem';
import { useSelector } from 'react-redux';

const MainContainer = styled('div')({
  width: '100%',
  height: '22%',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
});

const PendingInvitationsList = () => {
  const pendingFriendsInvitations = useSelector(
    (state) => state.friends.pendingFriendsInvitations,
  );

  return (
    <MainContainer>
      {pendingFriendsInvitations.map((i) => (
        <PendingInvitationsListItem
          key={i._id}
          id={i._id}
          username={i.senderId.username}
          mail={i.senderId.mail}
        />
      ))}
    </MainContainer>
  );
};

export default PendingInvitationsList;
