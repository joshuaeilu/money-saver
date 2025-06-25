import { View, Text, TextInput, Button } from 'react-native';


export default function ForgotPassword() {
    return (
        <View>
            <Text>Forgot Password</Text>
            <Text>How would you like to reset your password?</Text>
            <Button title="Email" onPress={() => alert('Reset link sent to your email!')} />
            <Button title="SMS" onPress={() => alert('Reset code sent to your phone!')} />
        </View>
    );
}