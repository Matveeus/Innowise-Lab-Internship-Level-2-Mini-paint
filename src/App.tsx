import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme, lightTheme } from './theme';
import './assets/styles/App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import CanvasAdd from './pages/CanvasAdd';
import CanvasEdit from './pages/CanvasEdit';
import SwitchTheme from './components/SwitchTheme';

function App() {
  const [theme, setTheme] = useState(lightTheme);

  function toggleTheme(): void {
    setTheme(prevTheme => (prevTheme === lightTheme ? darkTheme : lightTheme));
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-art" element={<CanvasAdd />} />
        <Route path="/:canvasID/edit" element={<CanvasEdit />} />
      </Routes>
      <SwitchTheme toggleTheme={toggleTheme} />
    </ThemeProvider>
  );
}

export default App;
