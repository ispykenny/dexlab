import React from 'react';
import {Redirect} from 'react-router-dom';

const Director = ({user_id, api_code}) => {
  if(user_id || api_code ) {
    return (
      <Redirect to="/dashboard" user_id={user_id}/>
    )
  } else {
    return (
      <Redirect exact to="/"/>
    )
  }
}

export default Director;