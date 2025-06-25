import React, { createContext, PropsWithChildren, useEffect, useState,  } from 'react';
import { useRouter } from 'expo-router';

type AuthState = {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthState>({
    isLoggedIn: false,
    login: () => {},
    logout: () => {}
});

export function AuthProvider({children}: PropsWithChildren){
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const login = () => {
        setIsLoggedIn(true);
        router.replace('/');
    }
    const logout = () => {
        setIsLoggedIn(false);
        router.replace('/login');
    }




    const router = useRouter();

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}