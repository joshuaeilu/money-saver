import { Button, Text } from 'react-native'
import { View } from 'react-native'
import { AuthContext } from '@/utils/authContext';
import { useContext } from 'react';

export default function Login(){
    const authContext = useContext(AuthContext);

    return (
        <View>
            <Text>Login</Text>
            <Button title="Login" onPress={authContext.login} />
        </View>
    )
}