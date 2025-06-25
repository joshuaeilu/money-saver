import { View, Button, Text } from 'react-native';
import { useRouter } from 'expo-router';
export default function Verify() {
    const router = useRouter();
    return (
        <View>
            <Text>Verify by:</Text>
            <Button title="1. Email" onPress={() => router.push('/signup/confirm_verify')} />
            <Button title="2. SMS" onPress={() => router.push('/signup/confirm_verify')} />
        </View>
    )
}