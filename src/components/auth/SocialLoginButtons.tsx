import React from 'react';
import { Box, Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { auth, facebookAuthProvider, googleAuthProvider } from '../../services/firebase';
import { Auth, FacebookAuthProvider, GoogleAuthProvider } from 'firebase/auth';

interface SocialLoginButtonsProps {
  handleSocialSignIn: (auth: Auth, authProvider: GoogleAuthProvider | FacebookAuthProvider) => void;
}

export default function SocialLoginButtons({ handleSocialSignIn }: SocialLoginButtonsProps) {
  return (
    <Box sx={{ m: '10px 0' }}>
      <Button color="error" onClick={() => handleSocialSignIn(auth, googleAuthProvider)}>
        <GoogleIcon sx={{ mr: '5px' }} />
        with Google
      </Button>
      <Button onClick={() => handleSocialSignIn(auth, facebookAuthProvider)}>
        <FacebookIcon sx={{ mr: '5px' }} />
        with Facebook
      </Button>
    </Box>
  );
}
