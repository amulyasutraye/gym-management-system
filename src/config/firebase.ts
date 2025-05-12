import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "YOUR-API-KEY",
  authDomain: "YOUR-AUTHDOMAN",
  projectId: "gym-main-74954",
  storageBucket: "gym-main-74954.firebasestorage.app",
  messagingSenderId: "YOUR-MESSAGINGSENDERID",
  appId: "YOURAPPID",
  measurementId: "G-EZG7MXR3HP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

export default app;
