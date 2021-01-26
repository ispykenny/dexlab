import React, {useState, useEffect} from 'react';
import { useLocation
} from "react-router-dom";
import { Redirect } from "react-router";
import axios from 'axios'
import firebase from 'firebase/app';
import app from './LoginManager'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const Query = ({setCode}) => {
  const [mounted, setMount] = useState(false);
  const [uid, setuid] = useState();
  const [currentCode , setCurrentCode] = useState();
  const [auth, setAuth] = useState();
  let query = useQuery();

  // const runSetData = () => {
  //   console.log(uid, 'we made it man...')
  //   console.log(userId, '->' , currentCode)
  // }

  // const getAuth = async (url) => {
  //   await axios(url)
  //   .then((res) => {
  //     console.log(res.data)
  //     setAuth(res.data)
  //       // app.database().ref('user/' + uid.uid).set({
  //       //   hasDexcomTokens: true,
  //       //   accessToken: res.data.access_token,
  //       //   refreshToken: res.data.refresh_token
  //       // })
  //     runSetData();
  //   })
  // }

  useEffect(() => {
    if(!mounted) {

      if(query.get('code')) {

        setCode(query.get('code'))
        // console.log('why amd I not here?')
        // let auth = getAuth(`http://localhost:5000/get-auth/?code=${currentCode}`) 
        setMount(true)
      } 
      setMount(true)
    }
  }, [setCode])

  // useEffect(() => {
  //   console.log(userId, 'kenny');
  //   setuid(userId)
  //   if(!mounted) {
  //     if(query.get('code')) {
  //       setCurrentCode(query.get('code'));
  //       let auth = getAuth(`http://localhost:5000/get-auth/?code=${currentCode}`) 
  //       setMount(true)
  //     } 
  //   }
    
  // }, [userId, setuid]);

  
  return <div></div>

}

export default Query;