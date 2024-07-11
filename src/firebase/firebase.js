// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWJXPrPNUzceq9nP4ZgBBkk_NkN7dTLBs",
  authDomain: "nomadnx-a2739.firebaseapp.com",
  projectId: "nomadnx-a2739",
  storageBucket: "nomadnx-a2739.appspot.com",
  messagingSenderId: "110932686672",
  appId: "1:110932686672:web:4c3f6877d33d1e13031e55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth }