import React from 'react';
import app from 'firebase/app';
import "firebase/auth";

const SignoutBtn = ({setUser, setMounted}) => {
  const doLogoutThings = () => {
    app.auth().signOut()
    setUser(false)
    setMounted(false)
  }
  return (
    <>      
      <button onClick={doLogoutThings}>Logout</button>
    </>
  )
}

export default SignoutBtn;