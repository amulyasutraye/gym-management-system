import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDmTrJE4L6DQ_wHhaOzWbkV8qd8cXIE2aM",
  authDomain: "gym-main-74954.firebaseapp.com",
  projectId: "gym-main-74954",
  storageBucket: "gym-main-74954.firebasestorage.app",
  messagingSenderId: "362043775293",
  appId: "1:362043775293:web:813fa95a7303a627c54d54",
  measurementId: "G-EZG7MXR3HP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

export default app;