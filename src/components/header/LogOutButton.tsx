import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {auth} from "../../services/firebase";
import {signOut} from "firebase/auth";
import {Button} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

function LogOutButton() {
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (!currentUser) {
                navigate('/login');
            }
        });
        return unsubscribe;
    }, [navigate]);

    const handleSignOut = (): void => {
        signOut(auth).then();
    };
    return (
        <Button sx={{ border: '1px solid #FFFFFF', color: '#FFFFFF','&:hover': {
                background: 'rgba(255, 255, 255, 0.5);',
            }, height: '100%'}} onClick={handleSignOut}>
            <LogoutIcon/>
        </Button>
    );
}

export default LogOutButton;
