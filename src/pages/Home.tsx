import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {Button} from '@mui/material';
import {auth} from '../services/firebase';
import {signOut} from "firebase/auth";
import {removeUser} from '../redux/slices/userSlice'

function Home() {
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
        <>
            <h1>home</h1>
            <Button onClick={handleSignOut}>Log out</Button>
        </>
    );
}

export default Home;
