
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database"

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "dexlabs-22c5b.firebaseapp.com",
  projectId: "dexlabs-22c5b",
  storageBucket: "dexlabs-22c5b.appspot.com",
  messagingSenderId: "182665905421",
  appId: "1:182665905421:web:40f577fd86d395597cdc44"
})

export const auth = app.auth();
export const db = app.database();
export default app;