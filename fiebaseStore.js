// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZvSjPe0JKWb7rdIoUQ3YGKqgb66_Yug4",
  authDomain: "lavana-2a2d1.firebaseapp.com",
  projectId: "lavana-2a2d1",
  storageBucket: "lavana-2a2d1.appspot.com",
  messagingSenderId: "300382920315",
  appId: "1:300382920315:web:b8013821a4600235174cde",
  measurementId: "G-GV0E30FSYK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);