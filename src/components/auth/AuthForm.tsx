import React, { ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Box, Button, Container, TextField, Typography } from '@mui/material';
import Logo from '../Logo';
import { signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider, FacebookAuthProvider, Auth } from 'firebase/auth';
import useAuthState from '../../hooks/useAuthState';
import firebaseErrors from '../../services/firebaseErrors';
import SocialLoginButtons from './SocialLoginButtons';

interface AuthFormProps {
  error: string | null;
  setError: (error: string | null) => void;
  buttonTitle: string;
  title: string;
  userCredentials: {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
  };
  setUserCredentials: (userCredentials: {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
  }) => void;
  handleFormSubmit: () => void;
}

export default function AuthForm({
  handleFormSubmit,
  error,
  setError,
  userCredentials,
  setUserCredentials,
  buttonTitle,
  title,
}: AuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const { name, email, password, passwordConfirm } = userCredentials;

  useAuthState();

  const handleSocialSignIn = async (
    auth: Auth,
    authProvider: GoogleAuthProvider | FacebookAuthProvider,
  ): Promise<void> => {
    try {
      await signInWithPopup(auth, authProvider);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const onSubmit = handleSubmit(handleFormSubmit);

  const renderPasswordField = () => (
    <TextField
      {...register('password', {
        required: 'Wrong password',
        minLength: { value: 6, message: 'Enter 6+ symbols' },
      })}
      name="password"
      error={errors?.password && true}
      helperText={errors?.password && ((errors?.password.message as string) || 'Wrong password')}
      margin="normal"
      fullWidth
      label="Password"
      type="password"
      id="password"
      onChange={handleChange}
      value={password}
    />
  );

  const renderNameField = () => (
    <TextField
      {...register('name', { required: 'Name is required' })}
      name="name"
      error={errors?.name && true}
      helperText={errors?.name && ((errors?.name.message as string) || 'Name is required')}
      margin="normal"
      fullWidth
      id="name"
      label="Name"
      autoFocus
      onChange={handleChange}
      value={name}
    />
  );

  const renderPasswordConfirmField = () => (
    <TextField
      {...register('passwordConfirm', {
        required: 'Password and password confirmation do not match',
        validate: value => value === password,
      })}
      name="passwordConfirm"
      error={errors?.passwordConfirm && true}
      helperText={
        errors?.passwordConfirm &&
        ((errors?.passwordConfirm.message as string) || 'Password and password confirmation do not match')
      }
      margin="normal"
      fullWidth
      label="Repeat password"
      type="password"
      id="passwordConfirm"
      onChange={handleChange}
      value={passwordConfirm}
    />
  );

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        marginTop: 12,
      }}
    >
      <Logo />
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: '2px solid',
          borderColor: 'primary.main',
          borderRadius: '10px',
          padding: '20px',
        }}
      >
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        <SocialLoginButtons handleSocialSignIn={handleSocialSignIn} />
        <Typography>OR</Typography>
        {title === 'Registration' && renderNameField()}
        <TextField
          {...register('email', { required: 'Email is required', pattern: /^\S+@\S+$/i })}
          name="email"
          error={errors?.email && true}
          helperText={errors?.email && ((errors?.email.message as string) || 'Enter a valid email')}
          margin="normal"
          fullWidth
          id="email"
          label="Email Address"
          onChange={handleChange}
          value={email}
        />
        {renderPasswordField()}
        {title === 'Registration' && renderPasswordConfirmField()}
        {error && (
          <Alert severity="error" onClose={() => setError('')} sx={{ width: '100%' }}>
            {firebaseErrors[error]}
          </Alert>
        )}
        <Button onClick={onSubmit} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          {buttonTitle}
        </Button>
      </Box>
    </Container>
  );
}
