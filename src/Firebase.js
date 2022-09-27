
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAKC-iO75gkQLcn5sGLSxcyz-zdh1Sozy4",
  authDomain: "messenger-33c1a.firebaseapp.com",
  projectId: "messenger-33c1a",
  storageBucket: "messenger-33c1a.appspot.com",
  messagingSenderId: "567461075132",
  appId: "1:567461075132:web:23774aebf86f85531cd8b9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);;
export const auth = getAuth();
export const storage = getStorage(app);
export const db = getFirestore()