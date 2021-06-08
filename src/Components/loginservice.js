import firebase from 'firebase/app';
import app from "./LoginManager";

const check_if_logged_in = setUserId => {
  app
  .auth()
  .onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
      setUserId(firebaseUser)
    } else {
      setUserId(null)
    }
  })
}

const Sign_out = setUserId => {
  app
  .auth()
  .signOut();
  setUserId(null)
}

const Login_with_email = (event, setUserId, set_message) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  app
  .auth()
  .signInWithEmailAndPassword(email, password)
  .then((userCredential) => {

  })
  .catch((error) => {
    set_message(error.message)
  });
}

const Create_account = (event, setUserId) => {
  event.preventDefault();
  const email = document.getElementById('email_new').value;
  const password = document.getElementById('password_new').value;
  app
  .auth()
  .createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}

const Login_with_google = setUserId => {
  let provider = new firebase.auth.GoogleAuthProvider();
  return app.auth().signInWithPopup(provider)
  .then((result) => {
    setUserId(result);
  })
  .catch(error => console.log('damn',error))
}

export {
  Create_account,
  check_if_logged_in,
  Sign_out,
  Login_with_email,
  Login_with_google
};