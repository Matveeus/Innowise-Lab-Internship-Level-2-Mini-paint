import React, {ChangeEvent} from 'react';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import Logo from '../Logo';

interface LoginFormProps {
    handleGoogleSignIn: () => void;
    handleFacebookSignIn: () => void;
    email: string;
    password: string;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: () => void;
}

export function LoginForm({
                              handleGoogleSignIn, handleFacebookSignIn, email, password, handleChange, handleSubmit
                          }: LoginFormProps) {
    return (
        <Container
            component="main"
            maxWidth="sm"
            sx={{
                marginTop: 12
            }}
        >
            <Logo/>
            <Box
                sx={{
                    marginTop: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    border: '2px solid',
                    borderColor: 'primary.main',
                    borderRadius: '10px',
                    padding: '20px'
                }}
            >
                <Typography component="h1" variant="h5">
                    Log in
                </Typography>
                <Box sx={{m: '10px 0'}}>
                    <Button color="error" onClick={handleGoogleSignIn}>
                        <GoogleIcon sx={{mr: '5px'}}/>with Google
                    </Button>
                    <Button onClick={handleFacebookSignIn}>
                        <FacebookIcon sx={{mr: '5px'}}/>with Facebook
                    </Button>
                </Box>
                <Typography>OR</Typography>
                <TextField
                    value={email}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
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
                    autoComplete="current-password"
                    onChange={handleChange}
                />
                <Button
                    onClick={handleSubmit}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    Sign in
                </Button>
            </Box>
        </Container>
    );
}
