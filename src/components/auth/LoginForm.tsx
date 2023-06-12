import React, {useState} from 'react';
import AuthForm from './AuthForm';
import {useDispatch} from 'react-redux';
import {auth} from '../../services/firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {setUser} from '../../redux/slices/userSlice';

export default function LoginForm() {
    const [userCredentials, setUserCredentials] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
    });
    const {email, password} = userCredentials;

    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();


    const handleSubmit = (): void => {
        if (!email || !password) {
            setError('Password and password confirmation do not match');
            return;
        }
        signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
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
                setUserCredentials((prevState) => ({
                    ...prevState,
                    name: "",
                    email: "",
                    password: "",
                    passwordConfirm: ""
                }));
            });
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
