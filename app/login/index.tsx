import { AuthContext } from '@/utils/authContext';
import { useRouter } from 'expo-router'; // Import useRouter for navigation
import { useContext, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import FormInput from '@/components/ui/FormInput'; // Import FormInput component
import { loginUser } from '@/utils/authFunctions';
import Toast from 'react-native-toast-message'; // Import Toast for notifications

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Use router for navigation

  const authContext = useContext(AuthContext); // Access AuthContext

  async function handleLogin() {
    const user = await loginUser(email, password);
    if (user) {
      authContext.login(); // Update the context to reflect the user is logged in
    } else {
      // Show an error message
      Toast.show({
        type: 'error',
        text1: 'Login failed',
        text2: 'Please check your credentials and try again.',
        position: 'bottom'
      });
    }
  }
 
 

  return (
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
              Welcome Back
            </Text>
            <Text className="text-lg font-medium text-gray-600 text-center mb-6">
              Log in to continue managing your savings.
            </Text>
          </View>

          <FormInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            isPassword={false}


          />
          <Toast />

          <FormInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            isPassword={true}
          />
          

          <TouchableOpacity className="bg-[#89964E] py-3  m-4 rounded-xl mb-4 w-full" onPress={handleLogin}>
            <Text className="text-white font-semibold text-center">Sign In</Text>
          </TouchableOpacity>

          <Text className="text-right w-full p-3 text-md text-gray-600 mb-2">Forgot password?</Text>

          <View className="flex-row justify-center items-center space-x-1 mt-10">
            <Text className="text-gray-600 text-md">Don’t have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/signup')}>
              <Text className="text-[#89964E] font-semibold text-md"> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
