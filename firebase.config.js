// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhcF3bATzHq1mdghygi9eWDmRx9f9vDDE",
  authDomain: "otp-lavana-store.firebaseapp.com",
  projectId: "otp-lavana-store",
  storageBucket: "otp-lavana-store.appspot.com",
  messagingSenderId: "184196234061",
  appId: "1:184196234061:web:0e6a723553e3ef8dec9504",
  measurementId: "G-DJ7YFK3F2D"
};

 // Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth(app) 

export default auth;