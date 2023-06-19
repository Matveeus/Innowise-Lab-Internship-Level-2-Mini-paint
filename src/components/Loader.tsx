import React from 'react';
import { Container, Grid } from '@mui/material';
import '../assets/styles/Loader.css';

export default function Loader() {
  return (
    <Container>
      <Grid
        container
        sx={{ height: window.innerHeight - 45, position: 'fixed', right: '0', background: 'white' }}
        alignItems="center"
      >
        <Grid container alignItems="center" justifyContent="center">
          <div className="lds-roller">
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}
