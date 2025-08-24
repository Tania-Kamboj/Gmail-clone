import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyASsG0VtHCXuGZiMpqG5NqfDfindzRE4ko",
  authDomain: "clone-13e14.firebaseapp.com",
  projectId: "clone-13e14",
  storageBucket: "clone-13e14.firebasestorage.app",
  messagingSenderId: "608773716850",
  appId: "1:608773716850:web:4b80064d90b5b52a657beb",
  measurementId: "G-MDLZWK9TEX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();