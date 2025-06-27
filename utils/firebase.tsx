import { initializeApp, getApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

export const firebaseConfig = {
  apiKey: "AIzaSyCdKRJF2eYNLR5kg0VkExCO7EomLujmLiY",
  authDomain: "money-saver-28e79.firebaseapp.com",
  projectId: "money-saver-28e79",
  storageBucket: "money-saver-28e79.firebasestorage.app",
  messagingSenderId: "514010078309",
  appId: "1:514010078309:web:fb995458a3b48929affa8c",
  measurementId: "G-JCM8KY04XF"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { app, auth };

