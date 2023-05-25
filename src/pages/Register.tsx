import React, { useEffect, useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase';
import AuthSwitch from '../components/auth/AuthSwitch';
import { RegisterForm } from '../components/auth/RegisterForm';
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {setUser} from "../redux/slices/userSlice";

interface State {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

function Register() {
    const [state, setState] = useState<State>({
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
    });

    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { name, email, password, passwordConfirm } = state;

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                navigate('/');
            }
        });
        return unsubscribe;
    }, [navigate]);

    const handleSubmit = (): void => {
        if (password !== passwordConfirm) {
            setError("Password and password confirmation do not match");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                console.log(name);
                updateProfile(user, {displayName: name}).then(() =>
                 dispatch(
                    setUser({
                        name: user.displayName,
                        email: user.email,
                        token: user.getIdToken(),
                        id: user.uid,
                    })
                ));
            })
            .catch((error: Error) => {
                setError(error.message);
            })
            .finally(() => {
                setState((prevState) => ({ ...prevState, name: "", email: "" }));
            });
    };

    const handleGoogleSignIn = (): void => {
        //google
    };

    const handleFacebookSignIn = (): void => {
        //facebook
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    };

    return (
        <>
            <RegisterForm
                handleFacebookSignIn={handleFacebookSignIn}
                handleGoogleSignIn={handleGoogleSignIn}
                password={password}
                email={email}
                name={name}
                passwordConfirm={passwordConfirm}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
            <AuthSwitch text="Already have an account? Sign in!" href="/login" />
        </>
    );
}

export default Register;
