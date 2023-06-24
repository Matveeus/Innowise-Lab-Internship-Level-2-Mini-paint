import React, { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import AddArt from './AddArt';
import EditArt from './EditArt';
import Loader from '../Loader';

interface PaintAppProps {
  action: string;
}

const PaintApp: React.FC<PaintAppProps> = ({ action }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [canvasStatus, setCanvasStatus] = useState<boolean | null>(false);

  return (
    <>
      {canvasStatus === false ? (
        <Box
          sx={{
            width: '80%',
            height: '80%',
            border: '1px solid',
            borderColor: 'primary.main',
            m: '0 auto',
            mb: '50px',
            padding: '15px',
            alignItems: 'center',
            borderRadius: '10px',
          }}
        >
          <Sidebar />
          <Canvas canvasRef={canvasRef} />
          {action === 'add' ? (
            <AddArt canvasRef={canvasRef} setSaveStatus={setCanvasStatus} />
          ) : (
            <EditArt canvasRef={canvasRef} setEditStatus={setCanvasStatus} />
          )}
        </Box>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default PaintApp;
