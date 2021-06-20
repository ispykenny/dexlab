import React, {useState} from 'react';
import {Login_with_google, Login_with_email, Create_account} from '../../Utils/firebase-services';

const Login = ({setUserId}) => {
  const [login_message, set_message ] = useState();
  return (
    <div className="login">
      <div className="login__inner">
        <h1>Login</h1>
        {/* { login_message ? <p>{login_message}</p>: null} */}
        {/* <form action="" onSubmit={(event) => Login_with_email(event, setUserId, set_message)}>
          <div className="form_el">
            <input type="email" id="email" autoCorrect="false"/>
            <label htmlFor="email">Email</label>
          </div>
          <div className="form_el">
            <input type="password" id="password"/>
            <label htmlFor="password">Password</label>
          </div>
          <button className="cta">Sign in</button>
        </form>
        <hr/>
        <h2>Create Account</h2>
        <form action="" onSubmit={(event) => Create_account(event, setUserId)}>
          <div className="form_el">
            <input type="email" id="email_new" autoCorrect="false"/>
            <label htmlFor="email_new">Email</label>
          </div>
          <div className="form_el">
            <input type="password" id="password_new"/>
            <label htmlFor="password_new">Password</label>
          </div>
          <button className="cta">Create Account</button>
        </form>
        <hr /> */}
        <h2>Other login options</h2>
        <button className="login-cta" onClick={() => Login_with_google(setUserId)}>
          Login with Google
        </button>
        <button className="login-cta">
          Login with Twitter
        </button>
        <button className="login-cta">
          Login with Facebook
        </button>
      </div>
    </div>
  )
}

export default Login;