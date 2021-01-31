import React, {useState, useEffect} from 'react';
import Login from '../Components/Login';
import app from '../Components/LoginManager';
import firebase from 'firebase/app';
import "firebase/auth";

const Gate = ({user, userId, setUser, setUserId}) => {

  useEffect(() => {
    app.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser) {
        setUserId(firebaseUser)
        setUser(true)
      } else {
        setUser(false)
      }
    })
    
  }, [setUser]);

  const loginWithGoogle = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    app.auth().signInWithPopup(provider)
    .then((result) => {
      setUserId(result)
      console.log(result)
    })
    .catch(error => console.log('damn',error))
  }

  const loginWithFacebook = () => {
    let provider = new firebase.auth.FacebookAuthProvider();
    app.auth().signInWithPopup(provider)
    .then((result) => {
      setUserId(result)
      console.log(result)
    })
    .catch(error => console.log('damn',error))
  }

  return (
    <div>
      <h1>Welcome to Dexlab</h1>
      <p>Get up to 90 days worth of data so you can see what your blood sugar actually means.</p>
      <div className="inner tall">
      <div className="login">
        <h2>Login</h2>
        <button onClick={loginWithGoogle}>Sign in with Google</button>
        <button onClick={loginWithFacebook}>Sign in with Facebook</button>
      </div>
    </div>
    </div>
  )
}

export default Gate;