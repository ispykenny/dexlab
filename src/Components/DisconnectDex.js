import React from 'react';

const DisconnectDex = ({disconnect}) => {
  return (
    <div>
      <button onClick={disconnect}>Disconnect Dexcom</button>
    </div>
  )
}

export default DisconnectDex;