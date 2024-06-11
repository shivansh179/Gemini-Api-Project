// src/firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth"; // Add signOut here

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAO9ogKCXH8xXllbTU30FiS1hHnTBKX5V8",
  authDomain: "next-login-c10d9.firebaseapp.com",
  projectId: "next-login-c10d9",
  storageBucket: "next-login-c10d9.appspot.com",
  messagingSenderId: "446037161342",
  appId: "1:446037161342:web:04e8d359d5c0ba97806f2f",
  measurementId: "G-C9Y3XQ6QNC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Logout function
export const logout = () => {
  return signOut(auth);
};

export { auth }; // Export auth to use in other components
export default app;
