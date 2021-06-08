import React, {useState, useEffect} from 'react';
import { useLocation
} from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search)
}
const Query = ({set_api_code}) => {
  const [mounted, setMount] = useState(false);
  let query = useQuery();
  useEffect(() => {
    if(!mounted) {
      if(query.get('code')) {
        set_api_code(query.get('code'))
        setMount(true)
      } 
      setMount(true)
    }
  }, [set_api_code])

  return null;

}

export default Query;