import React, { useEffect, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { auth, db } from '../../services/firebase';
import { get, ref, update } from 'firebase/database';
import { addShapes, clearShapes } from '../../redux/store/canvasSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../redux/store/store';

interface SaveCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  setEditStatus: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const EditArt: React.FC<SaveCanvasProps> = ({ canvasRef, setEditStatus }) => {
  const [title, setTitle] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onSubmit' });

  const dispatch = useDispatch();
  const shapes = useSelector((state: RootState) => state.canvas.shapes);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const navigate = useNavigate();
  const { canvasID } = useParams();

  const handleCanvasEdit: SubmitHandler<FieldValues> = async () => {
    setEditStatus(true);
    const canvasURL = canvasRef.current?.toDataURL();
    const currentDate = new Date();
    const username = auth.currentUser?.displayName;

    const canvasData = {
      title,
      createdOn: currentDate,
      username,
      canvasURL,
      shapes,
      canvasID,
    };

    try {
      await update(ref(db, `${canvasID}`), {
        canvas: canvasData,
      });

      dispatch(clearShapes());
      setTitle('');
      navigate('/');
    } catch (error) {
      console.error('Error saving canvas:', error);
    }
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

  return (
    <Box>
      <form
        onSubmit={handleSubmit(handleCanvasEdit)}
        style={{ margin: '20px 0 0 0', display: 'flex', justifyContent: 'center' }}
      >
        <TextField
          {...register('title', {
            required: 'Title is required',
            pattern: {
              value: /^[^.#$[\]]*$/,
              message: 'Title should not contain ".", "#", "$", "[", or "]"',
            },
          })}
          error={errors?.title && true}
          helperText={errors?.title && (errors?.title.message as string)}
          name="title"
          margin="normal"
          id="name"
          label="Image title"
          autoFocus
          onChange={handleTitleChange}
          value={title}
          sx={{ m: '0 20px 0 0', width: '30%' }}
        />
        <Button variant="contained" color="success" type="submit" sx={{ height: '56px' }}>
          EDIT
        </Button>
      </form>
    </Box>
  );
};

export default EditArt;
