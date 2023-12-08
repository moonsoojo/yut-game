// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBclRCUdUHFLtcoVu32W3ojaA0wgXzTB0s",
  authDomain: "yoot-game.firebaseapp.com",
  projectId: "yoot-game",
  storageBucket: "yoot-game.appspot.com",
  messagingSenderId: "585683601715",
  appId: "1:585683601715:web:f26345dd06a31107f81646"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app)
// export default firebaseApp