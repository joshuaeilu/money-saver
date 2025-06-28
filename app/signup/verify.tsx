import { AuthContext, router } from '@/utils/authContext';
import { useContext } from 'react';
import { Button, Text, View } from 'react-native';
import { supabase } from '@/utils/supabase';


async function handleEmailVerification(email: string, password: string) {

    let { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
    })

    if (error) {
        console.error('Error signing up:', error.message);
    } else {
        console.log('Sign up successful:');
        router.push('/signup/confirm_verify?optionName=email');
    }

}

async function handleSMSVerification(userPhone: string, password: string) {
const { data, error } = await supabase.auth.signUp({
  phone: userPhone,
  password: password,
  options: {
    channel: 'sms'
  }
})
    if ( error ){
        alert('Error signing up via SMS: ' + error.message);
    }else{
        alert('SMS verification code sent successfully!');
        console.log('SMS verification code sent successfully:', data);
    }
}   


export default function Verify() {
    const authContext = useContext(AuthContext);
    const userInfo = authContext.getUserInfo();

    return (
        <View>
            <Text>Verify by:</Text>
            <Button title="1. Email" onPress={() => handleEmailVerification(userInfo.email, userInfo.password)} />
            <Button title="2. SMS" onPress={() => handleSMSVerification(userInfo.phoneNumber, userInfo.password)} />
        </View>
    )
}
