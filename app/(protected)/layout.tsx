import { Redirect, Stack } from "expo-router";
import { AuthContext } from "@/utils/authContext";
import { useContext } from "react";

export default function ProtectedLayout() {
    const authContext = useContext(AuthContext);

  
  return (
    <>
        <View style={{ flex: 1 }} edges={['top', 'left', 'right']}>
        {authContext.isLoggedIn ? (
            <Stack screenOptions={{ headerShown: false, animation: "none" }} />
        ) : (
            <Redirect href="/login" />
        )}
        </View>
    
    </>
  );
}

