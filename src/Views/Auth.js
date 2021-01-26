import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Redirect } from "react-router";
import firebase from 'firebase/app';
import app from '../Components/LoginManager'
const Auth = (props) => {
  const requestCode = props.code.match.params.code;
  const [mounted, setMount] = useState(false);
  const [successful, setSucess] = useState(false)


  // useEffect(() => {
  //   const fetchTheTokens = async () => {
  //     if(!mounted) {
  //       setMount(true)
  //       let fetchedTokens = await axios(`http://localhost:5000/get-auth/?code=${requestCode}`)
  //       .then((res) => {
  //         console.log(res.data)
  //         return res.data
  //       })
  //       .catch((err) => err);
  //       props.setTokens(fetchedTokens)
  //       setSucess(true)
  //     }
  //   }
  //     fetchTheTokens();
  // }, [props,props.setTokens, mounted, requestCode])



  
  return (
    <div>
      <h1>weee</h1>
    </div>
  )
  
}

export default Auth;