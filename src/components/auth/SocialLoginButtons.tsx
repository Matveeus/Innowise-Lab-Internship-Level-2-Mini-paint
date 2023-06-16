import React from 'react';
import { Button, Box } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { auth, googleAuthProvider, facebookAuthProvider } from '../../services/firebase';
import { GoogleAuthProvider, FacebookAuthProvider, Auth } from 'firebase/auth';

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
