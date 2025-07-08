import { Redirect, Stack } from 'expo-router';
import { AuthContext } from '@/utils/authContext';
import { useContext } from 'react';


export default function ProtectedLayout(){

    const authContext = useContext(AuthContext);

    // if (!authContext.isLoggedIn) {
    //     return <Redirect href="/login" />;
    // }

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    )
}