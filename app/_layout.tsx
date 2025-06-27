import React from 'react';
import { Redirect, Stack } from 'expo-router';
import { AuthProvider, AuthContext } from '@/utils/authContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
export default function RootLayout() {

  return (
    <AuthProvider>
    <ThemeProvider value={DarkTheme}> 
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
   <Stack screenOptions={{ headerShown: false, animation: 'none' }} >
    <Stack.Screen name="(protected)/(tabs)" />
    </Stack>
      </SafeAreaView>
          </ThemeProvider>
       </AuthProvider>

  );
}
