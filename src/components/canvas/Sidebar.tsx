import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { clearShapes, setColor, setCurrentTool, setThickness, undo } from '../../redux/store/canvasSlice';
import { Box, Button, ButtonGroup } from '@mui/material';
import {
  BrushOutlined,
  CircleOutlined,
  CleaningServicesOutlined,
  CropSquareOutlined,
  EastOutlined,
  StarBorderOutlined,
  Undo,
} from '@mui/icons-material';

const Sidebar: React.FC = () => {
  const thickness = useSelector((state: RootState) => state.canvas.thickness);
  const color = useSelector((state: RootState) => state.canvas.color);
  const currentTool = useSelector((state: RootState) => state.canvas.currentTool);
  const dispatch = useDispatch();
  const [activeButton, setActiveButton] = useState('brush');

  const handleThicknessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newThickness = parseInt(event.target.value, 10);
    dispatch(setThickness(newThickness));
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    dispatch(setColor(newColor));
  };

  const handleToolChange = (tool: string) => {
    dispatch(setCurrentTool(tool));
    setActiveButton(tool);
  };

  const handleClearCanvas = () => {
    dispatch(clearShapes());
  };

  const handleUndo = () => {
    dispatch(undo());
  };

  const buttons = [
    { tool: 'brush', icon: <BrushOutlined /> },
    { tool: 'square', icon: <CropSquareOutlined /> },
    { tool: 'circle', icon: <CircleOutlined /> },
    { tool: 'line', icon: <EastOutlined /> },
    { tool: 'star', icon: <StarBorderOutlined /> },
  ];

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', height: '50px' }}>
      <ButtonGroup variant="outlined" aria-label="outlined button group" sx={{ width: '30%', height: '100%' }}>
        {buttons.map(button => (
          <Button
            key={button.tool}
            onClick={() => handleToolChange(button.tool)}
            className={currentTool === button.tool ? 'active' : ''}
            sx={{
              backgroundColor: activeButton === button.tool ? 'active' : '',
              width: '100%',
            }}
          >
            {button.icon}
          </Button>
        ))}
        <Button
          color="success"
          onClick={handleUndo}
          sx={{
            width: '100%',
          }}
        >
          <Undo />
        </Button>
        <Button
          color="error"
          onClick={handleClearCanvas}
          sx={{
            width: '100%',
          }}
        >
          <CleaningServicesOutlined />
        </Button>
      </ButtonGroup>
      <Box
        className="settings"
        sx={{
          display: 'flex',
          padding: '0 10px',
          border: '1px solid',
          borderColor: 'primary.main',
          borderRadius: '4px',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mr: '15px' }}>
          <label style={{ marginRight: '5px', fontWeight: '600' }} htmlFor="thickness">
            Thickness:
          </label>
          <input type="range" id="thickness" value={thickness} onChange={handleThicknessChange} min="1" max="10" />
        </Box>
        <Box>
          <label style={{ marginRight: '5px', fontWeight: '600' }} htmlFor="color">
            Color:
          </label>
          <input type="color" id="color" value={color} onChange={handleColorChange} />
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
