import { AuthContext } from '@/utils/authContext';
import { useRouter } from 'expo-router';
import { useContext } from 'react';
import { Button, Text, TextInput, View } from 'react-native';


export default function SignUp(){
    const authContext = useContext(AuthContext);
    const userInfo = authContext.getUserInfo() ;

    const router = useRouter();

    return (
        <View>
            <Text>Sign Up</Text>

            <TextInput placeholder="Username" onChangeText={(e) => authContext.addUserInfo({...userInfo, username: e})} />
            <TextInput placeholder="Email" onChangeText={(e) => authContext.addUserInfo({...userInfo, email: e})} />
            <TextInput placeholder="Password" secureTextEntry onChangeText={(e) => authContext.addUserInfo({...userInfo, password: e})} />
            <TextInput placeholder="Phone Number" keyboardType="phone-pad" onChangeText={(e) => authContext.addUserInfo({...userInfo, phoneNumber: e})} />
            <Button title = "Next" onPress={() => router.push('/signup/verify')} />
        </View>
    )
}