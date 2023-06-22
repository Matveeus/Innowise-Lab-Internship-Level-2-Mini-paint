import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import SaveCanvas from './SaveCanvas';

const PaintApp: React.FC = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  return (
    <>
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
        <Canvas canvasRef={canvasRef} />
      </Box>
      <SaveCanvas canvasRef={canvasRef} />
    </>
  );
};

export default PaintApp;
