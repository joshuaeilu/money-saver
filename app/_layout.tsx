
import { Redirect, Stack } from 'expo-router';
import { AuthProvider, AuthContext } from '@/utils/authContext';
import { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';

export default function RootLayout() {

  const authContext = useContext(AuthContext);

  if (!authContext.isLoggedIn){
    <Redirect href="/login" />
  }

  return (
    <ThemeProvider value={DarkTheme}> 
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
    <AuthProvider>
   <Stack screenOptions={{ headerShown: false, animation: 'none' }} />
       </AuthProvider>
      </SafeAreaView>
          </ThemeProvider>

  );
}
