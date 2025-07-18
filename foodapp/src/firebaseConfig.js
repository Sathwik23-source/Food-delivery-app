// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcxGHUeLTAxgk2n2-Y3r4wpkcRLVD4WE4",
  authDomain: "sathwik-57c90.firebaseapp.com",
  projectId: "sathwik-57c90",
  storageBucket: "sathwik-57c90.appspot.com",
  messagingSenderId: "689048918049",
  appId: "1:689048918049:web:7673c5af91e7a7f9ab6b60",
  measurementId: "G-63G50NVYS8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth=getAuth(app);
export {app, db};
export {auth};
