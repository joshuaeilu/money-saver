
import { Button, Text, TextInput, View } from 'react-native';
export default function confirmVerify() {

    return (

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Confirm Verification</Text>
            <Text>Please type in the 6-digit code sent to your email or SMS.</Text>
            <TextInput placeholder="Enter Code" keyboardType="numeric" maxLength={6} style={{ borderWidth: 1, padding: 10, width: '80%', marginVertical: 10 }} />
            <Button title="Confirm" onPress={() => alert('Thank you for verifying your account. Enjoy!!')} />
        </View>
    )
}