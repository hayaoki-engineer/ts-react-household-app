// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiMIqO3IWV1uBgYOWl7xDJxPCbDwmq5wA",
  authDomain: "house-hold-app-15083.firebaseapp.com",
  projectId: "house-hold-app-15083",
  storageBucket: "house-hold-app-15083.appspot.com",
  messagingSenderId: "496440125327",
  appId: "1:496440125327:web:84c7c8ef16229bb08acdfa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
