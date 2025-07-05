import FormInput from '@/components/ui/FormInput'; // Import FormInput component
import { AuthContext, router } from '@/utils/authContext';
import { getPasswordStrength, getStrengthColor } from '@/utils/passwordChecker';
import { supabase } from '@/utils/supabase';
import { useContext, useState } from 'react';
import { Image, Keyboard, KeyboardAvoidingView, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

export default function SignUp() {
    const authContext = useContext(AuthContext);
    const userInfo = authContext.getUserInfo();
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState<boolean | null>(null);
    const score = getPasswordStrength(userInfo.password);
    const strengthColor = getStrengthColor(score);
    const strengthText = ['Too Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'][Math.min(score, 4)];
    const [error, setError] = useState<Array<string>>([] );

    const checkPasswordMatch = () => {
        if (confirmPassword.length > 0) {
            setPasswordsMatch(userInfo.password === confirmPassword);
        } else {
            setPasswordsMatch(null);
        }
    };



    const validateForm = () => {
  const errors: string[] = [];

  if (!userInfo.username || !userInfo.email || !userInfo.password || !confirmPassword) {
    errors.push('Please fill in all fields.');
  }

  if (!agreedToTerms) {
    errors.push('You must agree to the terms and conditions to sign up.');
  }

  if (confirmPassword.length === 0) {
    errors.push('Please confirm your password.');
  }
  if (userInfo.password != null && score < 3) {
    errors.push('Password is too weak.');
  }

  setError(errors);
};


    async function createUser() {
        validateForm();
       
       if (error.length === 0 && passwordsMatch) {
            console.log('Creating user with info:', userInfo);
            let { data, error: signUpError } = await supabase.auth.signUp({
                email: userInfo.email,
                password: userInfo.password
            });

            if (signUpError) {
                console.error('Error signing up:', signUpError.message);
                setError([signUpError.message]);
                return;

            } else {
                console.log('Sign up successful:', data);
                router.push('/signup/confirm_verify');
            }
        }
    }

    return (
<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
            className="flex-1 bg-white"
            behavior={'padding'}
        >
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View className="flex-1  items-center justify-center px-6">
                    <Image
                        source={require('@/assets/images/primary_logo.png')}
                        className="w-1/6 h-1/6 my-4"
                    />

                    <View className="py-4" >
                        <Text className="text-4xl font-bold text-black text-center mb-2">
                            Create Account
                        </Text>
                        <Text className="text-lg font-medium text-gray-600 text-center mb-6">
                            Sign up to create an account and start saving.
                        </Text>
                    </View>

                    <FormInput
                        placeholder="Username"
                        value={userInfo.username}
                        onChangeText={(text) => authContext.addUserInfo({ ...userInfo, username: text })}
                        isPassword={false}
                    />
                    <FormInput
                        placeholder="Email"
                        value={userInfo.email}
                        onChangeText={(text) => authContext.addUserInfo({ ...userInfo, email: text })}
                        isPassword={false}
                    />


                    <FormInput
                        placeholder="Password"
                        value={userInfo.password}
                        onChangeText={(text) => authContext.addUserInfo({ ...userInfo, password: text })}
                        isPassword={true}
                    />
                    {userInfo.password.length > 0 && (
                        <View className=" w-full mb-3">
                            <Text className="text-sm text-gray-600">
                                Password Strength: {strengthText}
                            </Text>
                            <View className="h-1 w-full bg-gray-300 rounded-full overflow-hidden">
                                <View
                                    style={{
                                        width: `${(score / 5) * 100}%`,
                                        
                                    }}
                                    className={`h-2 ${strengthColor}`}
                                />
                                <Text>the score is {score}, and the color is {strengthColor}</Text>
                            </View>
                        </View>

                    )}
                    <FormInput
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChangeText={(text) => setConfirmPassword(text)}
                        onBlur={checkPasswordMatch}
                        isPassword={true}
                    />
                    
                    {/* Password match validation */}
                    {(passwordsMatch !== null && confirmPassword.length > 0) && (
                        <View className="w-full mb-3">
                            <Text className={`text-sm ${passwordsMatch ? 'text-green-600' : 'text-red-600'}`}>
                                {passwordsMatch ? '✓ Passwords match' : '✗ Passwords do not match'}
                            </Text>
                        </View>
                    )}

                    <View className="flex-row items-center justify-start w-full  my-2">
                        <TouchableOpacity
                            onPress={() => setAgreedToTerms(!agreedToTerms)}
                            className={`w-5 h-5 border-2 border-gray-400 rounded m-2 items-center justify-center ${agreedToTerms ? 'bg-[#89964E]' : 'bg-white'}`}
                        >
                            {agreedToTerms && <Text className="text-white text-xs">✓</Text>}
                        </TouchableOpacity>
                        <Text className="text-md text-gray-600">I agree to the terms and conditions</Text>
                    </View>
                    

                    {/* Error message for any other errors */}
                    {( error.length > 0 ) && (
                        <Text className="text-red-600 text-md font-bold ">
                            {error.map((err, index) => (
                                <Text key={index}>{err}{index < error.length - 1 ? '\n' : ''}</Text>
                            ))}
                        </Text>
                    )}

                    <TouchableOpacity
                        className={`py-3 m-4 rounded-xl mb-4 w-full ${'bg-[#89964E]' }`}
                        onPress={createUser}
                    >
                        <Text className="text-white font-semibold text-center">{(error.length === 0 && passwordsMatch) ? 'Signing Up ...' : 'Sign Up'}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    </TouchableWithoutFeedback>

    )
}