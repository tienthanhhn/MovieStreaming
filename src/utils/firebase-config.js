import { initializeApp } from "firebase/app";
import  {getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBPJSkASUe6FfSwD-Y2WGGvHFYHxbXfT00",
  authDomain: "myproject-b0be0.firebaseapp.com",
  projectId: "myproject-b0be0",
  storageBucket: "myproject-b0be0.appspot.com",
  messagingSenderId: "1020612271008",
  appId: "1:1020612271008:web:288e1f940e9122fd2b62c5",
  measurementId: "G-8TVDLEGQT4"
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
