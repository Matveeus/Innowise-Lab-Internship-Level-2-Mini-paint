import React, { useEffect, useState, ChangeEvent } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import AuthSwitch from "../components/auth/AuthSwitch";
import {auth, googleAuthProvider, facebookAuthProvider} from "../services/firebase";
import {
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import {setUser} from '../redux/slices/userSlice'
import { LoginForm } from "../components/auth/LoginForm";

interface State {
    email: string;
    password: string;
}

function Login() {
    const [state, setState] = useState<State>({
        email: '',
        password: '',
    });

    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { email, password } = state;

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                navigate('/');
            }
        });
        return unsubscribe;
    }, [navigate]);

    const handleSubmit = (): void => {
        if (!email || !password) {
            setError("Password and password confirmation do not match");
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(
                    setUser({
                        name: user.displayName,
                        email: user.email,
                        token: user.getIdToken(),
                        id: user.uid,
                    })
                );
            })
            .catch((error: Error) => {
                setError(error.message);
            })
            .finally(() => {
                setState((prevState) => ({ ...prevState, name: "", email: "" }));
            });
    };

    const handleGoogleSignIn = ():void => {
        signInWithPopup(auth, googleAuthProvider)
            .then(({ user }) => {
                dispatch(
                    setUser({
                        name: user.displayName,
                        email: user.email,
                        token: user.getIdToken(),
                        id: user.uid,
                    })
                );
            })
            .catch((error: Error) => {
                setError(error.message);
            });
    };

    const handleFacebookSignIn = ():void => {
        signInWithPopup(auth, facebookAuthProvider)
            .then(({ user }) => {
                dispatch(
                    setUser({
                        name: user.displayName,
                        email: user.email,
                        token: user.getIdToken(),
                        id: user.uid,
                    })
                );
            })
            .catch((error: Error) => {
                setError(error.message);
            });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    return (
        <>
            <LoginForm
                handleFacebookSignIn={handleFacebookSignIn}
                handleGoogleSignIn={handleGoogleSignIn}
                password={password}
                email={email}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
            <AuthSwitch text='Don&apos;t have an account? Register!' href='/register' />
        </>
    );
}

export default Login;
