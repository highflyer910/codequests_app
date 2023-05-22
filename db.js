import { initializeApp } from "firebase/app"


const firebaseConfig = {
  apiKey: "AIzaSyAxy0zaq7gx15ZjJCUepkLGoT7EYaWNcnM",
  authDomain: "codequests-afa81.firebaseapp.com",
  databaseURL: "https://codequests-afa81-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "codequests-afa81",
  storageBucket: "codequests-afa81.appspot.com",
  messagingSenderId: "372704665758",
  appId: "1:372704665758:web:e7f3ce1db63124b0891b8f"
};


const firebaseApp = initializeApp(firebaseConfig)

export default firebaseApp;