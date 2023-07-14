import React, { useEffect, useState, ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ArtBase from './ArtBase';
import { get, ref } from 'firebase/database';
import { db } from '../../services/firebase';
import { addShapes } from '../../redux/store/canvasSlice';

interface SaveCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  setEditStatus?: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const EditArt: React.FC<SaveCanvasProps> = ({ canvasRef, setEditStatus }): ReactElement => {
  const { canvasID } = useParams();
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const initialValues = {
    title: title,
    canvasID: canvasID,
  };

  useEffect(() => {
    const fetchCanvasData = async () => {
      try {
        const canvasSnapshot = await get(ref(db, `${canvasID}/canvas`));
        if (canvasSnapshot.exists()) {
          const canvasData = canvasSnapshot.val();
          setTitle(canvasData.title);
          if (canvasData.shapes.length > 0) {
            dispatch(addShapes(canvasData.shapes));
          }
        }
      } catch (error) {
        console.error('Error fetching canvas data:', error);
      }
    };

    fetchCanvasData();
  }, []);

  return <ArtBase canvasRef={canvasRef} setEditStatus={setEditStatus} initialValues={initialValues} />;
};

export default EditArt;
