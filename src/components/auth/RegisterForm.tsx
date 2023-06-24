import React, { useState } from 'react';
import AuthForm from './AuthForm';
import { auth } from '../../services/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import Loader from '../Loader';

export default function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [userCredentials, setUserCredentials] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const { name, email, password } = userCredentials;

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: name });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <AuthForm
      handleFormSubmit={handleSubmit}
      error={error}
      setError={setError}
      userCredentials={userCredentials}
      setUserCredentials={setUserCredentials}
      buttonTitle="Registration"
      title="Registration"
    />
  );
}
