import React from 'react';
import { Typography } from '@mui/material';
import useGetUserName from '../../hooks/useGetUserName';

const WelcomeMessage = () => {
  const userName = useGetUserName();
  return (
    <div>
      <Typography variant="h4" sx={{ textAlign: 'center' }}>
        Welcome to the Art Gallery, {userName}!
      </Typography>
    </div>
  );
};

export default WelcomeMessage;
