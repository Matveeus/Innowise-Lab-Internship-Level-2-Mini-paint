import React from 'react';
import PaintApp from '../components/canvas/PaintApp';
import Header from '../components/header/Header';

function CanvasAdd() {
  return (
    <>
      <Header />
      <PaintApp action="add" />
    </>
  );
}

export default CanvasAdd;
