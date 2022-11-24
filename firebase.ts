// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDKU21XZCpuACIf9cbt4OCR9N2gLoba8hw",
    authDomain: "next-app-148ad.firebaseapp.com",
    projectId: "next-app-148ad",
    storageBucket: "next-app-148ad.appspot.com",
    messagingSenderId: "176837564250",
    appId: "1:176837564250:web:e5016b2f0e69987f668563"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };