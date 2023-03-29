import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
import { getDatabase } from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCArFD0_OICLtvNlAwumqKko7YcetHxcdM",
  authDomain: "tuzunge.firebaseapp.com",
  databaseURL: "https://tuzunge-default-rtdb.firebaseio.com",
  projectId: "tuzunge",
  storageBucket: "tuzunge.appspot.com",
  messagingSenderId: "482582620903",
  appId: "1:482582620903:web:be72e01679963d67dd5042",
  measurementId: "G-WYES19DTXM",
};

export const app = initializeApp(firebaseConfig);
