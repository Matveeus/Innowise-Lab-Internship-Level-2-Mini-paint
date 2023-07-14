import React, { useEffect } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { auth, db } from '../../services/firebase';
import { ref, set, update } from 'firebase/database';
import { clearShapes } from '../../redux/store/canvasSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { useNavigate } from 'react-router-dom';
import { uid } from 'uid';

interface ArtFormBaseProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  setSaveStatus?: React.Dispatch<React.SetStateAction<boolean | null>>;
  setEditStatus?: React.Dispatch<React.SetStateAction<boolean | null>>;
  initialValues: FieldValues;
}

const ArtFormBase: React.FC<ArtFormBaseProps> = ({ canvasRef, setSaveStatus, setEditStatus, initialValues }) => {
  const { shapes } = useSelector((state: RootState) => state.canvas);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FieldValues>({ mode: 'onSubmit', defaultValues: initialValues });

  const dispatch = useDispatch();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue('title', event.target.value);
  };

  useEffect(() => {
    if (initialValues.title) {
      setValue('title', initialValues.title);
    } else {
      dispatch(clearShapes());
      setValue('title', '');
    }
  }, [initialValues.title, setValue]);

  const navigate = useNavigate();

  const handleCanvasSave: SubmitHandler<FieldValues> = async data => {
    if (setSaveStatus) {
      setSaveStatus(true);
    }

    const canvasURL = canvasRef.current?.toDataURL();
    const createdOn = new Date().toISOString();
    const username = auth.currentUser?.displayName;
    const canvasID = uid();

    const canvasData = {
      title: data.title,
      createdOn,
      username,
      canvasURL,
      shapes,
      canvasID,
    };

    try {
      await set(ref(db, `${canvasData.canvasID}`), {
        canvas: canvasData,
      });

      dispatch(clearShapes());
      setValue('title', '');
      navigate('/');
    } catch (error) {
      console.error('Error saving canvas:', error);
    }
  };

  const handleCanvasEdit: SubmitHandler<FieldValues> = async data => {
    if (setEditStatus) {
      setEditStatus(true);
    }

    const canvasURL = canvasRef.current?.toDataURL();
    const currentDate = new Date();
    const username = auth.currentUser?.displayName;

    const canvasData = {
      title: data.title,
      createdOn: currentDate,
      username,
      canvasURL,
      shapes,
      canvasID: initialValues.canvasID,
    };

    try {
      await update(ref(db, `${initialValues.canvasID}`), {
        canvas: canvasData,
      });

      dispatch(clearShapes());
      setValue('title', '');
      navigate('/');
    } catch (error) {
      console.error('Error saving canvas:', error);
    }
  };

  const handleCanvasSubmit: SubmitHandler<FieldValues> = initialValues.canvasID ? handleCanvasEdit : handleCanvasSave;

  return (
    <Box>
      <form
        onSubmit={handleSubmit(handleCanvasSubmit)}
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
          sx={{ m: '0 20px 0 0', width: '30%' }}
        />
        <Button variant="contained" color="success" type="submit" sx={{ height: '56px' }}>
          {initialValues.canvasID ? 'EDIT' : 'SAVE'}
        </Button>
      </form>
    </Box>
  );
};

export default ArtFormBase;
