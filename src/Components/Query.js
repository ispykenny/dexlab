import React from 'react';
import { useLocation
} from "react-router-dom";
import { Redirect } from "react-router";

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const Query = () => {
  let query = useQuery();

  if(query.get('code')) {
    return ( 
      <Redirect to={`/get-auth/${query.get('code')}`}></Redirect>
    )
  } else { return (
    <div>
      
    </div>
  )}

}

export default Query;