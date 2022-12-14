// ----------------------------------------------------------------------
// Firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAq3wnGL3ZdSIXrHpNTZU9OfsWv-6vjZQ",
  authDomain: "petsmart-a5d24.firebaseapp.com",
  databaseURL: "https://petsmart-a5d24-default-rtdb.firebaseio.com",
  projectId: "petsmart-a5d24",
  storageBucket: "petsmart-a5d24.appspot.com",
  messagingSenderId: "69289066756",
  appId: "1:69289066756:web:91fcf634f751df19a4d051",
  measurementId: "G-E12S3R9H6E"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);

export const auth = getAuth(firebase);
export default firebase;

// ----------------------------------------------------------------------