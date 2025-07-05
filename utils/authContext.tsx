import { useRouter } from 'expo-router';
import  { createContext, PropsWithChildren, useState, } from 'react';

type AuthState = {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
    addUserInfo: (info: UserInfo) => void;
    getUserInfo: () => UserInfo;
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
    getUserInfo: () => { return { username: '', email: '', phoneNumber: '', password: '' }; },
});
export const router = useRouter();

export function AuthProvider({children}: PropsWithChildren){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState<UserInfo>({ username: '', email: '', phoneNumber: '', password: '' });



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




;

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, addUserInfo, getUserInfo }}>
            {children}
        </AuthContext.Provider>
    )
}