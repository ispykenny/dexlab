import React from 'react';

const DexcomConnect = ({...props}) => {
  return (
    <div>
      {props.dexcom_keys ? (
      null
    ): (
      <div>
        <a href="https://sandbox-api.dexcom.com/v2/oauth2/login?client_id=J0IbzpVpCwyHz7WjUC7eLxHFgPU0PDqV&redirect_uri=http://localhost:3000/logged-in&response_type=code&scope=offline_access">Connect Dexcom</a>
      </div>
    ) }
    </div>
  )
}

export default DexcomConnect;