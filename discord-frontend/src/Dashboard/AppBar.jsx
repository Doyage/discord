import React from 'react';
import { styled } from '@mui/material';
import DropdownMenu from './DropdownMenu';

const MainContainer = styled('div')({
  position: 'absolute',
  right: '0',
  top: '0',
  height: '48px',
  borderBottom: '1px solid black',
  backgroundColor: '#36393f',
  width: 'calc(100% - 326px)',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 15px',
});

const AppBar = () => {
  return (
    <MainContainer>
      <DropdownMenu />
    </MainContainer>
  );
};

export default AppBar;
