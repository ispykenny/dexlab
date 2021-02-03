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
    app.database().ref('user/' + userId.uid).set(null).then(() => {
    userId.delete().then(() => {
        app.auth().signOut()
        setUser(false)
        setMounted(false)
      }).then(() => window.location.replace("/"))
    })
  }


  return (
    <>
      <button onClick={deleteAccount}>Delete Account</button>
      <button onClick={doLogoutThings}>Logout</button>
      <button onClick={() => console.log(app.auth().currentUser)} >Check</button>
    </>
  )
}

export default SignoutBtn;