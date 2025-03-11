// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMXQoySsyO00jHr9Jh5ltgV0WhW4_nb6A",
  authDomain: "bingbox-5029b.firebaseapp.com",
  projectId: "bingbox-5029b",
  storageBucket: "bingbox-5029b.firebasestorage.app",
  messagingSenderId: "351011425783",
  appId: "1:351011425783:web:0636c6dec0b639ff5eb2f2",
  measurementId: "G-6HMBXBGK7D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };