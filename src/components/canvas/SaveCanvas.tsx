import React from 'react';
import { Box, TextField, Button } from '@mui/material';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { db, auth } from '../../services/firebase';
import { set, ref } from 'firebase/database';
import { clearShapes } from '../../redux/store/canvasSlice';
import { useDispatch } from 'react-redux';

interface SaveCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}
const SaveCanvas: React.FC<SaveCanvasProps> = ({ canvasRef }) => {
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

  const handleCanvasSave: SubmitHandler<FieldValues> = data => {
    const canvasURL = canvasRef.current?.toDataURL();
    const currentDate = new Date();
    const username = auth.currentUser?.displayName;

    const canvasData = {
      title,
      createdOn: currentDate,
      username,
      canvasURL,
    };
    set(ref(db, `${data.title}`), {
      canvas: canvasData,
    });

    dispatch(clearShapes());
    setTitle('');
  };

  return (
    <Box>
      <form
        onSubmit={handleSubmit(handleCanvasSave)}
        style={{ margin: '30px 0', display: 'flex', justifyContent: 'center' }}
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

export default SaveCanvas;
