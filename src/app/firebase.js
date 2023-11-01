// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCS3VN_9JsotUq4ujorOwN4TsEkxLn0Vpc",
  authDomain: "eecs4413-9d0ba.firebaseapp.com",
  projectId: "eecs4413-9d0ba",
  storageBucket: "eecs4413-9d0ba.appspot.com",
  messagingSenderId: "549710299828",
  appId: "1:549710299828:web:72182da8efbc4eeb578de1",
  measurementId: "G-TJRZ6STNS9"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth }
