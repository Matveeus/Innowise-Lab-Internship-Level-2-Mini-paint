import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { auth, db } from '../../services/firebase';
import { ref, set } from 'firebase/database';
import { clearShapes } from '../../redux/store/canvasSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { useNavigate } from 'react-router-dom';
import { uid } from 'uid';

interface SaveCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  setSaveStatus: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const AddArt: React.FC<SaveCanvasProps> = ({ canvasRef, setSaveStatus }) => {
  const { shapes } = useSelector((state: RootState) => state.canvas);
  const [title, setTitle] = React.useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onSubmit' });

  const dispatch = useDispatch();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const navigate = useNavigate();

  const handleCanvasSave: SubmitHandler<FieldValues> = async () => {
    setSaveStatus(true);
    const canvasURL = canvasRef.current?.toDataURL();
    const createdOn = new Date().toISOString();
    const username = auth.currentUser?.displayName;
    const canvasID = uid();

    const canvasData = {
      title,
      createdOn,
      username,
      canvasURL,
      shapes,
      canvasID,
    };

    console.log(canvasData.createdOn);

    try {
      await set(ref(db, `${canvasData.canvasID}`), {
        canvas: canvasData,
      });

      dispatch(clearShapes());
      setTitle('');
      navigate('/');
    } catch (error) {
      console.error('Error saving canvas:', error);
    }
  };

  return (
    <Box>
      <form
        onSubmit={handleSubmit(handleCanvasSave)}
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
          SAVE
        </Button>
      </form>
    </Box>
  );
};

export default AddArt;
