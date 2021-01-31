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


  useEffect(() => {
    if(!mounted) {
      if(query.get('code')) {
        setCode(query.get('code'))
        setMount(true)
      } 
      setMount(true)
    }
  }, [setCode])

  return null;

}

export default Query;