import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import './assets/styles/App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Paint from './pages/Paint';
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
        <Route path="/paint" element={<Paint />} />
      </Routes>
      <SwitchTheme toggleTheme={toggleTheme} />
    </ThemeProvider>
  );
}

export default App;
