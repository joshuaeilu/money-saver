import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCdKRJF2eYNLR5kg0VkExCO7EomLujmLiY",
  authDomain: "money-saver-28e79.firebaseapp.com",
  projectId: "money-saver-28e79",
  storageBucket: "money-saver-28e79.firebasestorage.app",
  messagingSenderId: "514010078309",
  appId: "1:514010078309:web:fb995458a3b48929affa8c",
  measurementId: "G-JCM8KY04XF"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export { app };