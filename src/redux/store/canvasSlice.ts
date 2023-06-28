import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CanvasState {
  color: string;
  thickness: number;
  currentTool: string;
  shapes: Shape[];
  isDrawing: boolean;
  startX: number;
  startY: number;
  tempShape: Shape | null;
  id: string;
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
  isDrawing: false,
  startX: 0,
  startY: 0,
  tempShape: null,
  id: '',
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
    addShapes: (state, action: PayloadAction<Shape[]>) => {
      state.shapes.push(...action.payload);
    },
    clearShapes: state => {
      state.shapes = [];
    },
    setIsDrawing: (state, action: PayloadAction<boolean>) => {
      state.isDrawing = action.payload;
    },
    setStartX: (state, action: PayloadAction<number>) => {
      state.startX = action.payload;
    },
    setStartY: (state, action: PayloadAction<number>) => {
      state.startY = action.payload;
    },
    setTempShape: (state, action: PayloadAction<Shape | null>) => {
      state.tempShape = action.payload;
    },
    undo: state => {
      state.shapes.pop();
    },
  },
});

export const {
  setThickness,
  setColor,
  setCurrentTool,
  addShapes,
  clearShapes,
  setIsDrawing,
  setStartY,
  setStartX,
  setTempShape,
  undo,
} = canvasSlice.actions;

export default canvasSlice.reducer;
