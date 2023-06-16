import React, { ChangeEvent, FormEvent } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import Logo from '../Logo';
import { signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider, FacebookAuthProvider, Auth } from 'firebase/auth';
import ErrorBar from '../ErrorBar';
import useAuthState from '../../hooks/useAuthState';
import SocialLoginButtons from './SocialLoginButtons';

interface AuthFormProps {
  error: string | null;
  setError: (error: string | null) => void;
  buttonTitle: string;
  title: string;
  userCredentials: { name: string; email: string; password: string; passwordConfirm: string };
  setUserCredentials: (userCredentials: {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
  }) => void;
  handleSubmit: (event: FormEvent<HTMLButtonElement>) => void;
}

export default function AuthForm({
  handleSubmit,
  error,
  setError,
  userCredentials,
  setUserCredentials,
  buttonTitle,
  title,
}: AuthFormProps) {
  const { name, email, password, passwordConfirm } = userCredentials;

  useAuthState();

  const handleSocialSignIn = (auth: Auth, authProvider: GoogleAuthProvider | FacebookAuthProvider): void => {
    signInWithPopup(auth, authProvider).catch((error: Error) => {
      setError(error.message);
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };
  return (
    <>
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
          {title === 'Registration' && (
            <TextField
              value={name}
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoFocus
              onChange={handleChange}
            />
          )}
          <TextField
            value={email}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            onChange={handleChange}
          />
          <TextField
            value={password}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={handleChange}
          />
          {title === 'Registration' && (
            <TextField
              value={passwordConfirm}
              margin="normal"
              required
              fullWidth
              name="passwordConfirm"
              label="Repeat password"
              type="password"
              id="passwordConfirm"
              onChange={handleChange}
            />
          )}
          <Button onClick={handleSubmit} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {buttonTitle}
          </Button>
        </Box>
      </Container>
      <ErrorBar error={error} setError={setError} />
    </>
  );
}
