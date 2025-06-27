import { useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';
import { createUserAccountAndSendVerificationEmail } from '@/utils/firebase'; // Adjust the import path as necessary
import { AuthContext, router } from '@/utils/authContext';
import { useContext } from 'react';

export default function Verify() {
    const authContext = useContext(AuthContext);
    const userInfo = authContext.getUserInfo();
    function handleEmailVerification() {
        createUserAccountAndSendVerificationEmail(userInfo.email, userInfo.password);
        router.push('/signup/confirm_verify?optionName=email'); // Navigate to confirmation page after sending email verification

    }

    return (
        <View>
            <Text>Verify by:</Text>
            <Button title="1. Email" onPress={() => handleEmailVerification()} />
            <Button title="2. SMS" onPress={() => router.push('/signup/confirm_verify?optionName=sms')} />
        </View>
    )
}
