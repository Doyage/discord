import React, { useEffect } from 'react';
import { styled } from '@mui/material';
import SideBar from './SideBar';
import FriendSideBar from './FriendSideBar';
import Messenger from './Messenger';
import AppBar from './AppBar';
import { logout } from '../shared/utils/auth';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/actions/authAction';
import { connectWithSocketServer } from '../realtimeCommunication/socketConnection';

const Wrapper = styled('div')({
  width: '100vw',
  height: '100vh',
  display: 'flex',
});

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userDetails = localStorage.getItem('user');

    if (!userDetails) {
      logout();
    } else {
      dispatch(setUserDetails(JSON.parse(userDetails)));
      connectWithSocketServer(JSON.parse(userDetails));
    }
  }, []);

  return (
    <Wrapper>
      <SideBar />
      <FriendSideBar />
      <Messenger />
      <AppBar />
    </Wrapper>
  );
};

export default Dashboard;
