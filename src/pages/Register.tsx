import React from 'react';
import { Container } from '@mui/material';
import AuthSwitch from '../components/auth/AuthSwitch';
import RegisterForm from '../components/auth/RegisterForm';

function Register() {
  return (
    <Container maxWidth="sm">
      <RegisterForm />
      <AuthSwitch text="Already have an account? Sign in!" href="/login" />
    </Container>
  );
}

export default Register;
