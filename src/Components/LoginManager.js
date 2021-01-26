
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database"

const app = firebase.initializeApp({
  apiKey: "AIzaSyA8D1PueW6BXY9B2SS0MFqZDJegj9Ew8zU",
    authDomain: "dexlab-2dbbc.firebaseapp.com",
    projectId: "dexlab-2dbbc",
    storageBucket: "dexlab-2dbbc.appspot.com",
    messagingSenderId: "191218089232",
    appId: "1:191218089232:web:097caf8ccf27b93f19f995",
    measurementId: "G-RD7HZMPEYR"
})

export const auth = app.auth();
export const db = app.database();
export default app;