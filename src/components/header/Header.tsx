import React from 'react';
import { Box, useMediaQuery, IconButton, Drawer } from '@mui/material';
import Search from './Search';
import LogOutButton from './LogOutButton';
import Logo from '../Logo';
import AddArtwork from './AddArtwork';
import MenuIcon from '@mui/icons-material/Menu';

export default function Header() {
  const isScreenWidthLessThan800px = useMediaQuery('(max-width: 800px)');
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        position: 'fixed',
        alignItems: 'center',
        backgroundColor: 'primary.main',
        padding: '10px 30px',
        top: 0,
        width: '100%',
        zIndex: 5,
      }}
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
        <Box sx={{ width: 250, height: '100%', padding: '10px', backgroundColor: 'primary.main' }}>
          <Search />
          <Box
            sx={{
              width: '92%',
              display: 'flex',
              justifyContent: 'space-between',
              position: 'absolute',
              bottom: '10px',
            }}
          >
            <AddArtwork />
            <LogOutButton />
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
