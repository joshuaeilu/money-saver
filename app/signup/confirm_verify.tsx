
import { Button, Text, TextInput, View } from 'react-native';

import { AuthContext, router } from '@/utils/authContext';
import { useLocalSearchParams } from 'expo-router';
import { useContext, useState } from 'react';
import { supabase } from '@/utils/supabase';
export default function confirmVerify() {
    const authContext = useContext(AuthContext);
    const userInfo = authContext.getUserInfo();
    const [code, setCode] = useState('');
    const { optionName } = useLocalSearchParams();

    async function verifyEmailorSMS() {
        if (optionName === 'email') {
            let { data, error } = await supabase.auth.verifyOtp({
                email: userInfo.email,
                token: code,
                type: 'email'
            })
            if (error) {
                console.error('Error verifying email:', error.message);
                alert('Error verifying email: ' + error.message);
            } else {
                alert('Email verification successful!');
                console.log('Email verification successful:', data);
            }
        }

        // else if(optionName === 'sms'){
        else if (optionName === 'sms') {
            let { data, error } = await supabase.auth.verifyOtp({
                phone: userInfo.phoneNumber,
                token: code,
                type: 'sms'
            })
            if (error) {
                alert('Error verifying SMS: ' + error.message);
            } else {
                alert('SMS verification successful!');
            }
        }
    }

    async function resendVerificationCode() {
        if (optionName === 'email') {
            let { data, error } = await supabase.auth.resend({
                email: userInfo.email,
                type: 'signup'
            });
            if (error) {
                console.error('Error resending verification code:', error.message);
                alert('Error resending verification code: ' + error.message);
            } else {
                console.log('Verification code resent successfully:');
            }
        } else if (optionName === 'sms') {
            const { error } = await supabase.auth.resend({
                type: 'phone_change',
                phone: userInfo.phoneNumber,
            })
            if (error) {
                alert('Error verifying SMS: ' + error.message);
            } else {
                alert('SMS verification successful!');
            }
        }}



        //    async function handleDismissRoutesAndLogin() {


        //         authContext.addUserInfo({ username: '', email: '', phoneNumber: '', password: '' }); // Clear user info
        //         router.dismissTo('/login'); // Dismiss all routes
        //     }



        return (
            <View>
                <Text>Confirm Verify</Text>
                <TextInput placeholder="Enter 6 digit code" keyboardType="numeric" value={code} onChangeText={setCode} />
                <Button title="Confirm" onPress={() => verifyEmailorSMS()} />
                <Button title="Resend Code" onPress={() => resendVerificationCode()} />
            </View>
        );
    }