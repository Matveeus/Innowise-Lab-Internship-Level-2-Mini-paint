import React from 'react';
import PaintApp from '../components/canvas/PaintApp';
import Header from '../components/header/Header';

function CanvasEdit() {
  return (
    <>
      <Header />
      <PaintApp action="edit" />
    </>
  );
}

export default CanvasEdit;
