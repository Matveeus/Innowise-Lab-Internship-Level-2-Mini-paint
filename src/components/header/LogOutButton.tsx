import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {auth} from "../../services/firebase";
import {signOut} from "firebase/auth";
import {removeUser} from "../../redux/slices/userSlice";
import {Button} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

function LogOutButton() {
    const dispatch = useDispatch();
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
        signOut(auth).then(() => dispatch(removeUser()));
    };
    return (
        <Button sx={{ border: '1px solid #FFFFFF', color: '#FFFFFF', height: '100%'}} onClick={handleSignOut}>
            <LogoutIcon/>
        </Button>
    );
}

export default LogOutButton;
