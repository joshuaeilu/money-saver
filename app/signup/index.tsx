import { AuthContext, router } from '@/utils/authContext';
import { supabase } from '@/utils/supabase';
import { useContext } from 'react';
import { Button, Text, TextInput, View } from 'react-native';


export default function SignUp(){
    const authContext = useContext(AuthContext);
    const userInfo = authContext.getUserInfo() ;

  async function createUser(){
        
    let { data, error } = await supabase.auth.signUp({
        email: userInfo.email,
        password: userInfo.password
    })

    if (error) {
        console.error('Error signing up:', error.message);
    } else {
        console.log('Sign up successful:');
        router.push('/signup/confirm_verify');
    }
    }

    return (
        <View>
            <Text>Sign Up</Text>

            <TextInput  placeholder="Username" onChangeText={(e) => authContext.addUserInfo({...userInfo, username: e})} />
            <TextInput placeholder="Email" onChangeText={(e) => authContext.addUserInfo({...userInfo, email: e})} />
            <TextInput placeholder="Password" secureTextEntry onChangeText={(e) => authContext.addUserInfo({...userInfo, password: e})} />
            <TextInput placeholder="Phone Number" keyboardType="phone-pad" onChangeText={(e) => authContext.addUserInfo({...userInfo, phoneNumber: e})} />
            <Button title="Next" onPress={() => createUser()} />
        </View>
    )
}