import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Readings from '../Components/Readings';
import moment from 'moment';
import SignoutBtn from '../Components/SignOutBtn'
import firebase from 'firebase/app';
import app from '../Components/LoginManager'

const Dashboard = ({props , code , tokens, userId , user, setUser}) => {
  const [readings, setReadings] = useState();
  const [mounted, setMounted] = useState(false);
  const [entryDate, setEntryDate] = useState(1);
  const [fetchedTokens, setTokes] = useState();
  const [value, setValue] = useState('')
  const [hasDexcomTokens , setHasDexcomTokens] = useState(false);
  const [dataHasLoaded, setDataHasLoaded] = useState(false);
  
  useEffect(() => {
    console.log('working?')
    setEntryDate(1);
    if(!mounted) {
      // console.log(userId)
      if(userId) {
        app.database().ref('/user/' + userId.uid).once('value').then((snapshot) => {
          const notUser =  {hasDexcomTokens: false}
          var username = (snapshot.val() && snapshot.val()) || notUser;
          const usere = username;

          setHasDexcomTokens(usere.hasDexcomTokens)
          
  
          setTokes(usere);
          
          console.log(fetchedTokens)
        });
        setMounted(true)
      }
    }
    return () => {
      setMounted(false);
      setTokes('')
    }
  }, [ user, userId, value])

  const dataFetcher = (url) => {
    return axios(url)
      .then(res => res)
      .catch(error => error)
  }

  const getSomeData = async (newDate = entryDate) => {
    setEntryDate(newDate)
    setDataHasLoaded(false)

    const date = await moment().format('YYYY-MM-DDTHH:MM:ss');
    const startDate = await moment().subtract(entryDate, 'days').format('YYYY-MM-DDTHH:MM:ss');

    let theReadings = await dataFetcher(`http://localhost:5000/get-data?access_token=${fetchedTokens.accessToken}&refresh_token=${fetchedTokens.refreshToken}&start_date=${startDate}&now_date=${date}`)
    
    app.database().ref('user/' + userId.uid).set({
      hasDexcomTokens: true,
      accessToken: theReadings.data.settings.access_token,
      refreshToken: theReadings.data.settings.refresh_token
    })

    let otherStuff = await dataFetcher(`http://localhost:5000/data?access_token=${theReadings.data.settings.access_token}&refresh_token=${theReadings.data.settings.refresh_token}&start_date=2020-10-25&now_date=2021-01-25`)
    console.log(otherStuff)
    setReadings(theReadings);
    setDataHasLoaded(true)
  }

  useEffect(() => {
    if(fetchedTokens) {
      getSomeData();
    }
  },[hasDexcomTokens, fetchedTokens])
  


  return (
    <div>
      {mounted ? userId.displayName : '' }
      {hasDexcomTokens ? '' : (
        <div><p>Connect your Dexcom Account</p><a href="https://api.dexcom.com/v2/oauth2/login?client_id=J0IbzpVpCwyHz7WjUC7eLxHFgPU0PDqV&redirect_uri=http://localhost:3000&response_type=code&scope=offline_access">Login</a></div>
      ) }

      <SignoutBtn setUser={setUser} user={user} setMounted={setMounted}/>

      
      <button onClick={() => getSomeData(31)}>31 days</button>
      <button onClick={() => getSomeData(60)}>60 days</button>
      <button onClick={() => getSomeData(90)}>90 days</button>
      <button onClick={() => getSomeData(entryDate)}>Refresh</button>
      Dashboard , { dataHasLoaded ? <Readings readings={readings} days={entryDate}/> : <div>Loading readings...</div>} 
      <h1></h1>
    </div>
  )
}

export default Dashboard;