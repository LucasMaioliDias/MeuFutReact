import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDwG9IGTiLdAg2cIm1ZoJE21ut_xi3b1SY",
    authDomain: "meufutreact.firebaseapp.com",
    projectId: "meufutreact",
    storageBucket: "meufutreact.appspot.com",
    messagingSenderId: "44007916827",
    appId: "1:44007916827:web:0c34cd87084553233affbe",
    measurementId: "G-M9C2Z3R6PL"
  };

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
