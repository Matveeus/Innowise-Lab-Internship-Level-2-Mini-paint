import React, {useState} from 'react';
import AuthForm from './AuthForm';
import {auth} from '../../services/firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';

export default function LoginForm() {
    const [userCredentials, setUserCredentials] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
    });
    const {email, password} = userCredentials;

    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (): void => {
        if (!email || !password) {
            setError('Please, enter email and password');
            return;
        }
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                setUserCredentials((prevState) => ({
                    ...prevState,
                    name: "",
                    email: "",
                    password: "",
                    passwordConfirm: ""
                }));
            })
            .catch((error: Error) => {
                setError(error.message);
            })
    };

    return (
        <AuthForm
            handleSubmit={handleSubmit}
            error={error}
            setError={setError}
            userCredentials={userCredentials}
            setUserCredentials={setUserCredentials}
            buttonTitle="login"
            title="Sign in"
        />
    );
}
