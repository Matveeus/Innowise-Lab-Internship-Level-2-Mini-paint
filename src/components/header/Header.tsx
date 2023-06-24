import React from 'react';
import { Box, Drawer, IconButton, useMediaQuery } from '@mui/material';
import Search from './Search';
import LogOutButton from './LogOutButton';
import Logo from '../Logo';
import AddArtwork from './AddArtwork';
import MenuIcon from '@mui/icons-material/Menu';
import '../../assets/styles/Header.css';

export default function Header() {
  const isScreenWidthLessThan800px = useMediaQuery('(max-width: 800px)');
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <Box
      sx={{
        backgroundColor: 'primary.main',
      }}
      className="header"
    >
      <Logo
        sx={{
          height: '100%',
          width: isScreenWidthLessThan800px ? '170px' : '220px',
          borderRadius: '10px',
          background: '#ffffff',
          boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25), -2px 2px 2px rgba(0, 0, 0, 0.25)',
        }}
      />
      {isScreenWidthLessThan800px ? (
        <IconButton onClick={toggleDrawer} aria-label="open drawer" sx={{ color: '#ffffff' }}>
          <MenuIcon />
        </IconButton>
      ) : (
        <>
          <Search />
          <Box sx={{ display: 'flex', gap: '10px' }}>
            <AddArtwork />
            <LogOutButton />
          </Box>
        </>
      )}
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
        <Box sx={{ backgroundColor: 'primary.main' }} className="drawer">
          <Search />
          <Box className="drawer-buttons">
            <AddArtwork />
            <LogOutButton />
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
