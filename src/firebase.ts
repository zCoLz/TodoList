// Import the functions you need from the SDKs you need
import { getDatabase } from "@firebase/database";
import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLkruaoxfkBXqJWuAZmKNE1XNVWEhPJZ0",
  authDomain: "react-type-bb7ce.firebaseapp.com",
  projectId: "react-type-bb7ce",
  storageBucket: "react-type-bb7ce.appspot.com",
  messagingSenderId: "328001932743",
  appId: "1:328001932743:web:fee74e5549688f33bc5de2",
  measurementId: "G-FZPNZKQBG0"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
export const database = getDatabase(app);
