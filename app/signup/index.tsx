import FormInput from '@/components/ui/FormInput';
import { AuthContext, router } from '@/utils/authContext';
import { getPasswordStrength, getStrengthColor } from '@/utils/passwordChecker';
import { supabase } from '@/utils/supabase';
import { useContext, useEffect, useState } from 'react';
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

export default function SignUp() {
    const authContext = useContext(AuthContext);
    const userInfo = authContext.getUserInfo();

    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const passwordScore = getPasswordStrength(userInfo.password);
    const strengthColor: string = getStrengthColor(passwordScore);
    const strengthText = ['Too Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'][Math.min(passwordScore, 4)];

    const passwordsMatch = userInfo.password === confirmPassword;
    const color = 'bg-red-500'; // Default color for mismatch

    useEffect(() => {
        // Clear error message related to password match in real-time
        if (confirmPassword.length > 0 && passwordsMatch) {
            setErrors(prev => prev.filter(err => err !== 'Passwords do not match.'));
        }
    }, [confirmPassword, userInfo.password]);

    const validateForm = () => {
        const validationErrors: string[] = [];

        if (!userInfo.username || !userInfo.email || !userInfo.password || !confirmPassword) {
            validationErrors.push('Please fill in all fields.');
        }

        if (!agreedToTerms) {
            validationErrors.push('You must agree to the terms and conditions.');
        }

        if (!passwordsMatch) {
            validationErrors.push('Passwords do not match.');
        }

        if (userInfo.password && passwordScore < 3) {
            validationErrors.push('Password is too weak.');
        }

        setErrors(validationErrors);
        return validationErrors.length === 0;
    };

    const handleSignUp = async () => {
        if (!validateForm()) return;

        setIsSubmitting(true);

        const { data, error } = await supabase.auth.signUp({
            email: userInfo.email,
            password: userInfo.password,
        });

        if (error) {
            setErrors([error.message]);
            setIsSubmitting(false);
        } else {
            router.push('/signup/confirm_verify');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView className="flex-1 bg-white" behavior="padding">
                <ScrollView
                    className="flex-1"
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className="flex-1 items-center justify-center px-6">
                        <Image source={require('@/assets/images/primary_logo.png')} className="w-1/6 h-1/6 my-4" />

                        <View className="py-4">
                            <Text className="text-4xl font-bold text-black text-center mb-2">Create Account</Text>
                            <Text className="text-lg font-medium text-gray-600 text-center mb-6">
                                Sign up to create an account and start saving.
                            </Text>
                        </View>

                        {/* Input Fields */}
                        <FormInput
                            placeholder="Username"
                            value={userInfo.username}
                            onChangeText={text => authContext.addUserInfo({ ...userInfo, username: text })}
                            isPassword={false}
                        />
                        <FormInput
                            placeholder="Email"
                            value={userInfo.email}
                            onChangeText={text => authContext.addUserInfo({ ...userInfo, email: text })}
                            isPassword={false}
                        />
                        <FormInput
                            placeholder="Password"
                            value={userInfo.password}
                            onChangeText={text => authContext.addUserInfo({ ...userInfo, password: text })}
                            isPassword={true}
                        />

                        {userInfo.password.length > 0 && (
                            <View className="w-full mb-3">
                                <Text className="text-sm text-gray-600">Password Strength: {strengthText}</Text>
                                <View className="h-1 w-full bg-gray-300 rounded-full overflow-hidden">
                                    <View
                                        style={{ width: `${(Math.min(passwordScore, 4) / 4) * 100}%`, backgroundColor: strengthColor }}
                                        className={`h-2 `}
                                    />
                                </View>
                            </View>
                        )}

                        <FormInput
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            isPassword={true}
                        />
                        {confirmPassword.length > 0 && (
                            <Text className={`text-sm w-full mb-2 ${passwordsMatch ? 'text-green-600' : 'text-red-600'}`}>
                                {passwordsMatch ? '✓ Passwords match' : '✗ Passwords do not match'}
                            </Text>
                        )}

                        {/* Agreement Checkbox */}
                        <View className="flex-row items-center w-full my-2">
                            <TouchableOpacity
                                onPress={() => setAgreedToTerms(!agreedToTerms)}
                                className={`w-5 h-5 border-2 border-gray-400 rounded m-2 items-center justify-center ${agreedToTerms ? 'bg-[#89964E]' : 'bg-white'
                                    }`}
                            >
                                {agreedToTerms && <Text className="text-white text-xs">✓</Text>}
                            </TouchableOpacity>
                            <Text className="text-md text-gray-600">I agree to the terms and conditions</Text>
                        </View>

                        {/* Display Errors */}
                        {errors.length > 0 && (
                            <Text className="text-red-600 text-sm font-medium text-left w-full mb-3">
                                {errors.map((err, index) => (
                                    <Text key={index}>{err}{'\n'}</Text>
                                ))}
                            </Text>
                        )}

                        {/* Sign Up Button */}
                        <TouchableOpacity
                            onPress={handleSignUp}
                            className={`py-3 m-4 rounded-xl w-full ${isSubmitting ? 'bg-gray-400' : 'bg-[#89964E]'
                                }`}
                            disabled={isSubmitting}
                        >
                            <Text className="text-white font-semibold text-center">
                                {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}
