import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite"
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA0hdXOtHePzQ1ik5t3-jeKJ34smLjturI",
  authDomain: "sillamaesk-taskmanager.firebaseapp.com",
  projectId: "sillamaesk-taskmanager",
  storageBucket: "sillamaesk-taskmanager.appspot.com",
  messagingSenderId: "744680706665",
  appId: "1:744680706665:web:0a9f623796599c5f3708f8",
  measurementId: "G-3VCNCTS3V8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)


//const analytics = getAnalytics(app);
