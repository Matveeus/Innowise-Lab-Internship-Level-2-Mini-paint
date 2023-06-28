import { configureStore } from '@reduxjs/toolkit';
import canvasReducer from '../store/canvasSlice';
import searchReducer from '../store/searchSlice';

const store = configureStore({
  reducer: {
    canvas: canvasReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
