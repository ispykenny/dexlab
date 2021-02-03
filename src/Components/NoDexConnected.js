import React from 'react';


const NoDexConnected = () => {
  return (
    <div className="login-wrapper">
      <div className="login inner center">
        <div className="login__card">
          <div className="login__card--padding">
            <h1>Connect Your Dexcom Account</h1>
            <p>It looks like you haven't connected. Click the link below to login into your Dexcom account to give this app permissions.</p>
            <a href="https://api.dexcom.com/v2/oauth2/login?client_id=J0IbzpVpCwyHz7WjUC7eLxHFgPU0PDqV&redirect_uri=http://localhost:3000&response_type=code&scope=offline_access">Login</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoDexConnected;