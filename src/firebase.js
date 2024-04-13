// Import the functions you need from the SDKs you need


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore"; 
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwpgqiX7h_-Pcfvze8d2bUP4xubqNaeuA",
  authDomain: "personal-finance-8e45f.firebaseapp.com",
  projectId: "personal-finance-8e45f",
  storageBucket: "personal-finance-8e45f.appspot.com",
  messagingSenderId: "851890293941",
  appId: "1:851890293941:web:b8dcbb2b4058ba9aeb82fc",
  measurementId: "G-XE8JMC7HJC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };