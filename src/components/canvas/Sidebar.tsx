import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { setThickness, setColor, setCurrentTool, clearShapes } from '../../redux/store/canvasSlice';
import { Box, Button, ButtonGroup } from '@mui/material';
import {
  BrushOutlined,
  CropSquareOutlined,
  CircleOutlined,
  EastOutlined,
  StarBorderOutlined,
  CleaningServicesOutlined,
} from '@mui/icons-material';

const Sidebar: React.FC = () => {
  const thickness = useSelector((state: RootState) => state.canvas.thickness);
  const color = useSelector((state: RootState) => state.canvas.color);
  const currentTool = useSelector((state: RootState) => state.canvas.currentTool);
  const dispatch = useDispatch();
  const [activeButton, setActiveButton] = useState('');

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

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', height: '50px' }}>
      <ButtonGroup variant="outlined" aria-label="outlined button group" sx={{ width: '40%', height: '100%' }}>
        <Button
          onClick={() => handleToolChange('brush')}
          className={currentTool === 'brush' ? 'active' : ''}
          sx={{
            backgroundColor: activeButton === 'brush' ? 'active' : '',
            width: '100%',
          }}
        >
          <BrushOutlined />
        </Button>
        <Button
          onClick={() => handleToolChange('square')}
          sx={{
            backgroundColor: activeButton === 'square' ? 'active' : '',
            width: '100%',
          }}
        >
          <CropSquareOutlined />
        </Button>
        <Button
          onClick={() => handleToolChange('circle')}
          sx={{
            backgroundColor: activeButton === 'circle' ? 'active' : '',
            width: '100%',
          }}
        >
          <CircleOutlined />
        </Button>
        <Button
          onClick={() => handleToolChange('line')}
          sx={{
            backgroundColor: activeButton === 'line' ? 'active' : '',
            width: '100%',
          }}
        >
          <EastOutlined />
        </Button>
        <Button
          onClick={() => handleToolChange('star')}
          sx={{
            backgroundColor: activeButton === 'star' ? 'active' : '',
            width: '100%',
          }}
        >
          <StarBorderOutlined />
        </Button>
        <Button variant="outlined" color="error" onClick={handleClearCanvas}>
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
