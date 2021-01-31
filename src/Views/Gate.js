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
            <p>Get up to 90 days worth of data so you can see what your blood sugar actually means.</p>
            
            <div className="btns">
              <h2>Login</h2>
              <button onClick={loginWithGoogle}>Sign in with Google</button>
              <button onClick={loginWithFacebook}>Sign in with Facebook</button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg" style={{backgroundImage: `url("https://images.pexels.com/photos/552785/pexels-photo-552785.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=1080&w=1920")`}}></div>
    </div>
  )
}

export default Gate;