// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIRE_BASE_API_KEY,
  authDomain: "mern-auth-d5cbc.firebaseapp.com",
  projectId: "mern-auth-d5cbc",
  storageBucket: "mern-auth-d5cbc.appspot.com",
  messagingSenderId: "449398627670",
  appId: "1:449398627670:web:938ffcd2f439d1cc8fcaf7",
  measurementId: "G-8Z5FPRZE1G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
