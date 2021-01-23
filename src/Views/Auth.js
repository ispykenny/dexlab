import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Redirect } from "react-router";
import Dashboard from './Dashboard';

const Auth = (props) => {
  const requestCode = props.code.match.params.code;
  const [mounted, setMount] = useState(false);
  const [successful, setSucess] = useState(false)

  useEffect(() => {
    if(!mounted) {
      setMount(true)
      const fetchTheTokens = async () => {
        let fetchedTokens = await axios(`http://localhost:5000/get-auth/?code=${requestCode}`)
          .then((res) => {
            return res.data
          })
          .catch((err) => err);
          props.setTokens(fetchedTokens)
          setSucess(true)
      }
      fetchTheTokens();
    }

  }, [requestCode, mounted, successful])



  
  return (
    <div>
      { successful ? <Redirect to="/dashboard"></Redirect> : (
        <div>Uh oh</div>
      )}
    </div>
  )
  
}

export default Auth;