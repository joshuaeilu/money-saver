
import { Button, Text, TextInput, View } from 'react-native';

import { AuthContext, router } from '@/utils/authContext';
import { useLocalSearchParams } from 'expo-router';
import { useContext } from 'react';
export default function confirmVerify() {
    const authContext = useContext(AuthContext);
    const userInfo = authContext.getUserInfo();
    const {optionName}  = useLocalSearchParams();

    function handleDismissRoutesAndLogin() {
        authContext.addUserInfo({ username: '', email: '', phoneNumber: '', password: '' }); // Clear user info
        router.dismissTo('/login'); // Dismiss all routes
    }


    if (optionName === 'email') {
        return (
            <View>
                <Text>Confirm Email Verification</Text>
                <Text>We have sent a verification email to {userInfo.email}. Please check your inbox and click the verification link.</Text>
                <Button title="Go to Login" onPress={() => handleDismissRoutesAndLogin()} />
            </View>
        );
    } else if (optionName === 'sms') {
        return (
            <View>
                <Text>Confirm SMS Verification</Text>
                <Text>We have sent a verification code to {userInfo.phoneNumber}. Please check your messages and enter the code below.</Text>
                <TextInput placeholder="Enter Code" keyboardType="numeric" maxLength={6} style={{ borderWidth: 1, padding: 10, width: '80%', marginVertical: 10 }} />
                <Button title="Confirm" onPress={() => alert('Thank you for verifying your account. Enjoy!!')} />
            </View>
        );
    }
}