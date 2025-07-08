import Intro from '@/app/Intro';
import "@/global.css"; // Import global styles
import { AuthProvider } from '@/utils/authContext';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold, Manrope_700Bold, Manrope_800ExtraBold } from '@expo-google-fonts/manrope';


 
export default function RootLayout() {
  const [showIntro, setShowIntro] = useState(true);

   const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });
  // if (!fontsLoaded) {
  //   return null; // or a loading spinner
  // }
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2000); // Show intro for 2 seconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  // if (showIntro) {
  //   return <Intro />; // Show the Intro page
  // }
  
  return (
      <SafeAreaView style={{ flex: 1 }} >
    <AuthProvider>
        <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        </Stack>
    </AuthProvider>
      </SafeAreaView>
  );
}
