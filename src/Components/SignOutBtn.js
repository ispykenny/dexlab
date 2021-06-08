import React, { useEffect } from 'react';
import app from 'firebase/app';
import "firebase/auth";

const SignoutBtn = ({setUser, setMounted, userId}) => {

  useEffect(() => {
    console.log(app.auth().currentUser)
  }, [])
  const doLogoutThings = () => {
    app.auth().signOut()
    setUser(false)
    setMounted(false)
    
  }
  const deleteAccount = () => {
    app.database().ref('user/' + userId.uid).set(null)
  }


  return (
    <>
      <button onClick={doLogoutThings}>Logout</button>
    </>
  )
}

export default SignoutBtn;