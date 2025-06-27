import { Button, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '@/utils/authContext';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const authContext = useContext(AuthContext);

  return (
    <View style={{ flex: 1 }}>

      <Text> Hello World</Text>
      <Button title="Logout" onPress={() => {authContext.logout()}} />
      </View>
  );
}
