import React, { ChangeEvent, FormEvent } from 'react';
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import Logo from '../Logo'

interface RegisterFormProps {
    handleGoogleSignIn: () => void;
    handleFacebookSignIn: () => void;
    email: string;
    password: string;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: FormEvent<HTMLButtonElement>) => void;
    name: string;
    passwordConfirm: string;
}

export function RegisterForm({
                                 handleGoogleSignIn,
                                 handleFacebookSignIn,
                                 email,
                                 password,
                                 handleChange,
                                 handleSubmit,
                                 name,
                                 passwordConfirm
                             }: RegisterFormProps) {
    return (
        <Container component="main" maxWidth="sm" sx={{
            marginTop: 12,
        }}>
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
                    Register
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
                    value={name}
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    onChange={handleChange}
                />
                <TextField
                    value={email}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
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
                <TextField
                    value={passwordConfirm}
                    margin="normal"
                    required
                    fullWidth
                    name="passwordConfirm"
                    label="Repeat password"
                    type="password"
                    id="passwordConfirm"
                    autoComplete="current-password"
                    onChange={handleChange}
                />
                <Button
                    onClick={handleSubmit}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Register
                </Button>
            </Box>
        </Container>
    );
}
