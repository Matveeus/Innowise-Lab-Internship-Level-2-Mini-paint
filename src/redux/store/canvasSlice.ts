import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CanvasState {
  color: string;
  thickness: number;
  currentTool: string;
  shapes: Shape[];
}

export interface Shape {
  type: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: string;
  thickness: number;
}

const initialState: CanvasState = {
  color: '#000000',
  thickness: 1,
  currentTool: 'brush',
  shapes: [],
};

const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    setThickness: (state, action: PayloadAction<number>) => {
      state.thickness = action.payload;
    },
    setColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
    setCurrentTool: (state, action: PayloadAction<string>) => {
      state.currentTool = action.payload;
    },
    addShape: (state, action: PayloadAction<Shape[]>) => {
      state.shapes = [...state.shapes, ...action.payload];
    },
    clearShapes: state => {
      state.shapes = [];
    },
  },
});

export const { setThickness, setColor, setCurrentTool, clearShapes, addShape } = canvasSlice.actions;

export default canvasSlice.reducer;
