import React, { useState } from 'react';
import AuthForm from './AuthForm';
import { auth } from '../../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Loader from '../Loader';

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [userCredentials, setUserCredentials] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const { email, password } = userCredentials;

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading === true) {
    return <Loader />;
  }

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
