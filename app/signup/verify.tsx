import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '@/utils/firebase'; // Adjust the import path as necessary
import { Button, Text, View } from 'react-native';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';


export default function Verify() {
    const router = useRouter();

    function handleEmailVerification() {
        
        createUserWithEmailAndPassword(auth, 'eilujoshua200@gmail.com', 'password123')
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                sendEmailVerification(user)
                    .then(() => {
                        // Email verification sent
                        alert('Email verification sent!');
                    })
                    .catch((error) => {
                        console.error('Error sending email verification:', error);
                    });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Error signing up:', errorCode, errorMessage);
                alert('Error signing up: ' + errorMessage);
            });
    }

    return (
        <View>
            <Text>Verify by:</Text>
            <Button title="1. Email" onPress={() => handleEmailVerification()} />
            <Button title="2. SMS" onPress={() => router.push('/signup/confirm_verify')} />
        </View>
    )
}
