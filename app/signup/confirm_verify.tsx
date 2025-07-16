
import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { AuthContext } from '@/utils/authContext';
import { supabase } from '@/utils/supabase';
import { useContext, useRef, useState } from 'react';
import { router } from 'expo-router';
import { addToTotalAmount, addToTotalForUser } from '@/utils/dataFunctions';
import { Feather } from '@expo/vector-icons';
export default function confirmVerify() {
    const authContext = useContext(AuthContext);
    const userInfo = authContext.getUserInfo();
    const [code, setCode] = useState(Array(6).fill(''));
    const inputRefs = useRef<(TextInput | null)[]>([]); // ✅


    async function verifyEmailorSMS() {
        let { data, error } = await supabase.auth.verifyOtp({
            email: userInfo.email,
            token: code.join(''),
            type: 'email'
        })
        if (error) {
            Toast.show({
                type: 'error',
                text1: 'Verification failed',
                text2: error.message,
                position: 'bottom'
            })
        } else {
            await addToTotalForUser(0); // Reset total amount to 0

            Toast.show({
                type: 'success',
                text1: 'Email verification successful!',
                text2: 'You can now log in with your account.',
                position: 'bottom'
            });
            authContext.addUserInfo({ username: '', email: '', phoneNumber: '', password: '' }); // Clear user info
            router.dismissTo('/login'); // Dismiss all routes and navigate to login
        }



    }

    async function resendVerificationCode() {
        let { data, error } = await supabase.auth.resend({
            email: userInfo.email,
            type: 'signup'
        });
        if (error) {
            Toast.show({
                type: 'error',
                text1: 'Resend failed',
                text2: error.message,
                position: 'bottom'
            });
        } else {
            Toast.show({
                type: 'success',
                text1: 'Verification code resent successfully!',
                position: 'bottom'
            });
        }
    }


    function handleChange(value: string, index: number) {
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus(); // Move to next input if current is filled
        }

    }

    const handleBackspace = (key: string, index: number) => {
        if (key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };




 




    return (
   

        <KeyboardAvoidingView
            className="flex-1 bg-white"
            behavior={'padding'}
        >
            <View className="flex-1  items-center justify-center px-6 ">


                {/* Email Icon */}
                <View className="mb-6">
                    <Feather name="mail" size={90} color="#89964E" />
                </View>


                <View className="py-4" >
                    <Text className="text-4xl font-bold text-black text-center mb-2">
                        Verify Your Email
                    </Text>
                    <Text className="text-lg font-medium text-gray-600 text-center mb-3">
                        We have sent a 6-digit verification code to {userInfo.email}.
                    </Text>
                </View>
                {/* Code Inputs */}
                <View className="flex-row mb-6">
                    {code.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(el) => { inputRefs.current[index] = el }}
                            onKeyPress={({ nativeEvent }) => handleBackspace(nativeEvent.key, index)}
                            value={digit}
                            onChangeText={(value) => handleChange(value, index)}
                            keyboardType="number-pad"
                            maxLength={1}
                            className="w-12 h-12 border border-gray-300 m-2 rounded-md text-center text-xl bg-gray-100"
                        />
                    ))}
                </View>
                {/* Verify Button */}
                <TouchableOpacity className="bg-[#89964E] px-6 py-3 rounded-md mb-4" onPress={verifyEmailorSMS}>
                    <Text className="text-white text-base font-medium">Verify</Text>
                </TouchableOpacity>

                <Text className="text-sm text-gray-600 mt-4">
                    Didn’t get the code?{' '}
                    <Text className="text-sm text-[#89964E] text-center underline" onPress={resendVerificationCode}>Resend</Text>
                </Text>


            </View>
            <Toast />



        </KeyboardAvoidingView>
    );
}