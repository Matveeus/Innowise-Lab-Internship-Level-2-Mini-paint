import React, {useState} from 'react';
import AuthForm from "./AuthForm";
import {auth} from "../../services/firebase";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";

export default function RegisterForm() {
    const [userCredentials, setUserCredentials] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
    });
    const {name, email, password} = userCredentials;

    const [error, setError] = useState<string | null>(null);

    const handleSubmit = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                updateProfile(user, { displayName: name })
                    .catch((error) => {
                        setError(error.message);
                    });
            })
            .catch((error) => {
                setError(error.message);
            })
    };

    return (
        <AuthForm handleSubmit={handleSubmit} error={error} setError={setError} userCredentials={userCredentials}
                  setUserCredentials={setUserCredentials} buttonTitle='register' title="Registration"/>
    );
}
