import { Button, Text } from 'react-native'
import { View } from 'react-native'
import { AuthContext } from '@/utils/authContext';
import { useContext } from 'react';
import { useRouter } from 'expo-router';

export default function Login(){
    const authContext = useContext(AuthContext);
    const router = useRouter();

    return (
        <View>
            <Text>Login</Text>
            <Button title="Login" onPress={authContext.login} />
            <Button title="Sign Up" onPress={() => router.push('/signup')} />
        </View>
    )
}