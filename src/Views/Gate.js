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
    })
    .catch(error => console.log('damn',error))
  }

  const loginWithFacebook = () => {
    let provider = new firebase.auth.FacebookAuthProvider();
    app.auth().signInWithPopup(provider)
    .then((result) => {
      setUserId(result)
    })
    .catch(error => console.log('damn',error))
  }

  return (
    <div className="login-wrapper">
      <div className="login inner center">
        <div className="login__card">
          <div className="login__card--padding">
            <h1>Welcome to Dexlab</h1>
            <p>View your past 7 days of glucose data. View your averages, trends, and more. Sign in below to get started.</p>
            
            <div className="btns">
              <h2>Login</h2>
              <button onClick={loginWithGoogle}>Sign in with Google</button>
              <button onClick={loginWithFacebook}>Sign in with Facebook</button>
            </div>

            <div style={{marginTop: 30}}>
              Made by <a href="">@ispykenny</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Gate;