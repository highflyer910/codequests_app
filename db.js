import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDYHcEGxCAptlFFHFegMlMXoDHKmgoZtpk",
  authDomain: "codequests-app.firebaseapp.com",
  databaseURL: "https://codequests-app-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "codequests-app",
  storageBucket: "codequests-app.appspot.com",
  messagingSenderId: "612091936543",
  appId: "1:612091936543:web:f70dd1bec235e3b70fba2a",
  measurementId: "G-DWX3L50B6Q"
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig)

export default firebaseApp;