import React from 'react';
import { ReactElement } from 'react';
import ArtFormBase from './ArtBase';

interface SaveCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  setSaveStatus?: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const AddArt: React.FC<SaveCanvasProps> = ({ canvasRef, setSaveStatus }): ReactElement => {
  const initialValues = {
    title: '',
    canvasID: '',
  };

  return <ArtFormBase canvasRef={canvasRef} setSaveStatus={setSaveStatus} initialValues={initialValues} />;
};

export default AddArt;
