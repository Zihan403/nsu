// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAG5r3AIvY3SLKXWJRCxWXSqK6WpQF3zrQ",
  authDomain: "nsu-alumni-5685b.firebaseapp.com",
  projectId: "nsu-alumni-5685b",
  storageBucket: "nsu-alumni-5685b.firebasestorage.app",
  messagingSenderId: "253581823601",
  appId: "1:253581823601:web:449b9dd4fa5cf2a35715d0",
  measurementId: "G-1CQDGVLGXS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);