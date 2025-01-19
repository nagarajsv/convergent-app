// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMn0ryjWaoVGSj7u6wIl2QEUEeJlO7Tc4",
  authDomain: "convergentapp-52679.firebaseapp.com",
  projectId: "convergentapp-52679",
  storageBucket: "convergentapp-52679.firebasestorage.app",
  messagingSenderId: "741019081742",
  appId: "1:741019081742:web:bc79c74936e9f0930eb05f",
  measurementId: "G-K73QT8SM3S"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);