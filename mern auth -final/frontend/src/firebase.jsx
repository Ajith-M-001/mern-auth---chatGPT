// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "chatgpt-mern-auth.firebaseapp.com",
  projectId: "chatgpt-mern-auth",
  storageBucket: "chatgpt-mern-auth.appspot.com",
  messagingSenderId: "867692860055",
  appId: "1:867692860055:web:a0dc6c618407ba6c728fd2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export default app