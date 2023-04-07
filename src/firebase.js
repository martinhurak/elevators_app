
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyBZXd1cYeAWAJj7i-kfqP57BOkbCC5Z_-U",
  authDomain: "elevatorsdata-c5ab7.firebaseapp.com",
  databaseURL: "https://elevatorsdata-c5ab7-default-rtdb.firebaseio.com",
  projectId: "elevatorsdata-c5ab7",
  storageBucket: "elevatorsdata-c5ab7.appspot.com",
  messagingSenderId: "1046421132135",
  appId: "1:1046421132135:web:9a1eaf86fc8abe6ead55c2"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)