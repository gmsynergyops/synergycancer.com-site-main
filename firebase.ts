// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// configure firebase
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "otp-testing-c7528.firebaseapp.com",
  projectId: "otp-testing-c7528",
  storageBucket: "otp-testing-c7528.firebasestorage.app",
  messagingSenderId: "473329878142",
  appId: "1:473329878142:web:c7c21c31289425de66442f",
  measurementId: "G-GTB8HPDCFR"
};

// initialize firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp(); // saves the app to be reinitiallized
const auth = getAuth(app);

auth.useDeviceLanguage();
export { auth }
