// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpByEA7LWLiBw7tcE4Q6JrVK5RTaUylWk",
  authDomain: "wavingsocial.firebaseapp.com",
  projectId: "wavingsocial",
  storageBucket: "wavingsocial.appspot.com",
  messagingSenderId: "344973826679",
  appId: "1:344973826679:web:e44a3cace8b21775100472"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

export const storage = getStorage(app);