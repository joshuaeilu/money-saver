import Intro from '@/app/Intro';
import "@/global.css"; // Import global styles
import { AuthProvider } from '@/utils/authContext';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function RootLayout() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2000); // Show intro for 2 seconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  if (showIntro) {
    return <Intro />; // Show the Intro page
  }
  
  return (
      <SafeAreaView style={{ flex: 1 }} >
    <AuthProvider>
        <Stack screenOptions={{ headerShown: false, animation: 'none' }}>
          <Stack.Screen name="(protected)/(tabs)" />
        </Stack>
    </AuthProvider>
      </SafeAreaView>
  );
}
