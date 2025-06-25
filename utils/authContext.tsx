import React, { createContext, PropsWithChildren, useState,  } from 'react';
import { useRouter } from 'expo-router';

type AuthState = {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
    addUserInfo: (info: UserInfo) => void;
    getUserInfo: () => UserInfo | null;
}

interface UserInfo { 
    username: string;
    email: string;
    phoneNumber: string;
    password: string;
}

export const AuthContext = createContext<AuthState>({
    isLoggedIn: false,
    login: () => {},
    logout: () => {},
    addUserInfo: (info: UserInfo) => {},
    getUserInfo: () => null,
});

export function AuthProvider({children}: PropsWithChildren){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);


    const addUserInfo = (info: UserInfo) => {
        setUserInfo(info);
    }

    const getUserInfo = () => {
        return userInfo;
    }


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
        <AuthContext.Provider value={{ isLoggedIn, login, logout, addUserInfo, getUserInfo }}>
            {children}
        </AuthContext.Provider>
    )
}