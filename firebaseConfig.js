// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvRDaV8o0HZjmAaUWN_BtjCgvw-Yjjybk",
  authDomain: "cinekino-react.firebaseapp.com",
  projectId: "cinekino-react",
  storageBucket: "cinekino-react.appspot.com",
  messagingSenderId: "891301226404",
  appId: "1:891301226404:web:b67a5545e5de5875654331",
  measurementId: "G-FC9T6E83RL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export { auth, provider, signInWithPopup, signOut };
