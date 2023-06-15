import { useState, useEffect } from 'react';
import { auth } from '../services/firebase';

const WelcomeMessage = () => {
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUserName(user.displayName);
            }
        });

        return () => unsubscribe();
    }, []);
    return userName
};

export default WelcomeMessage;
