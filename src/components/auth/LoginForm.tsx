import React, { useState } from 'react';
import AuthForm from './AuthForm';
import { auth } from '../../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);

  const [userCredentials, setUserCredentials] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const { email, password } = userCredentials;

  const handleSubmit = () => {
    signInWithEmailAndPassword(auth, email, password).catch(error => {
      setError(error.message);
    });
  };

  return (
    <AuthForm
      handleFormSubmit={handleSubmit}
      error={error}
      setError={setError}
      userCredentials={userCredentials}
      setUserCredentials={setUserCredentials}
      buttonTitle="login"
      title="Sign in"
    />
  );
}
