import React from 'react';
import Sidebar from './Sidebar';
import { Box } from '@mui/material';
import Canvas from './Canvas';

const PaintApp: React.FC = () => {
  return (
    <Box
      sx={{
        width: '80%',
        height: '80%',
        border: '1px solid',
        borderColor: 'primary.main',
        margin: '0 auto',
        padding: '15px',
        alignItems: 'center',
        borderRadius: '10px',
      }}
    >
      <Sidebar />
      <Canvas />
    </Box>
  );
};

export default PaintApp;
