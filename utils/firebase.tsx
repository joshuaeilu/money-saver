import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";


 const firebaseConfig = {
  apiKey: "AIzaSyCdKRJF2eYNLR5kg0VkExCO7EomLujmLiY",
  authDomain: "money-saver-28e79.firebaseapp.com",
  projectId: "money-saver-28e79",
  storageBucket: "money-saver-28e79.firebasestorage.app",
  messagingSenderId: "514010078309",
  appId: "1:514010078309:web:fb995458a3b48929affa8c",
  measurementId: "G-JCM8KY04XF"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export function createUserAccountAndSendVerificationEmail(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password)
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
            });
}
