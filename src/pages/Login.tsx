import React from 'react';
import {Container} from '@mui/material';
import AuthSwitch from "../components/auth/AuthSwitch";
import LoginForm from "../components/auth/LoginForm";

function Login() {
    return (
        <Container maxWidth="sm">
            <LoginForm/>
            <AuthSwitch text='Don&apos;t have an account? Register!' href='/register'/>
        </Container>
    );
}

export default Login;
