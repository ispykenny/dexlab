import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Readings from '../Components/Readings';
import moment from 'moment';
import SignoutBtn from '../Components/SignOutBtn'
import app from '../Components/LoginManager'
import AddedInfo from '../Components/AddedInfo';
import DateRange from '../Components/DateRange';

const Dashboard = ({props , code , tokens, userId , user, setUser}) => {
  const [readings, setReadings] = useState();
  const [mounted, setMounted] = useState(false);
  const [entryDate, setEntryDate] = useState(1);
  const [fetchedTokens, setTokes] = useState();
  const [hasDexcomTokens , setHasDexcomTokens] = useState(false);
  const [dataHasLoaded, setDataHasLoaded] = useState(false);
  const [ additionalInfo , setAdditionalInfo] = useState();
  
  useEffect(() => {
    if(!mounted) {
      if(userId) {
        app.database().ref('/user/' + userId.uid).once('value').then((snapshot) => {
          const notUser =  {hasDexcomTokens: false}
          var username = (snapshot.val() && snapshot.val()) || notUser;
          const usere = username;
          setHasDexcomTokens(usere.hasDexcomTokens)
          setTokes(usere);
        });
        setMounted(true)
      }
    }
    return () => {
      setMounted(false);
      setTokes('')
    }
  }, [ user, userId])

  const dataFetcher = (url) => {
    return axios(url)
      .then(res => res)
      .catch(error => error)
  }

  const getSomeData = async (newDate = 1) => {
    setDataHasLoaded(false)
    setEntryDate(newDate)
    
    const date = await moment().add(1 , 'days').format('YYYY-MM-DDTHH:MM:ss');
    const startDate = await moment().subtract(newDate, 'days').format('YYYY-MM-DDTHH:MM:ss');
    const currentInfoDate = moment().add(1, 'days').format('YYYY-MM-DD');
    const startInfoDate = moment().subtract(newDate, 'days').format('YYYY-MM-DD')
    const theReadings = await dataFetcher(`http://localhost:5000/get-data?access_token=${fetchedTokens.accessToken}&refresh_token=${fetchedTokens.refreshToken}&start_date=${startDate}&now_date=${date}`)

    const newTokens = {
      hasDexcomTokens: true,
      accessToken: theReadings.data.settings.access_token,
      refreshToken: theReadings.data.settings.refresh_token
    }
    console.log(newTokens)
    // setTokes(newTokens)
    
    app.database().ref('user/' + userId.uid).set({
      hasDexcomTokens: true,
      accessToken: theReadings.data.settings.access_token,
      refreshToken: theReadings.data.settings.refresh_token
    })

    setReadings(theReadings);
    const userInfo = await dataFetcher(`http://localhost:5000/data?access_token=${theReadings.data.settings.access_token}&refresh_token=${theReadings.data.settings.refresh_token}&start_date=${startInfoDate}&now_date=${currentInfoDate}`)
    setHasDexcomTokens(true)
    setAdditionalInfo(userInfo)
    setDataHasLoaded(true)
    
  }

  useEffect(() => {
    if(fetchedTokens && hasDexcomTokens) {
      getSomeData();
      setHasDexcomTokens(true)
    }
  },[hasDexcomTokens, fetchedTokens, setHasDexcomTokens])
  

  return (
    <div>
      {mounted ? userId.displayName : '' }
      <SignoutBtn setUser={setUser} user={user} setMounted={setMounted}/>
      <br/>
      {hasDexcomTokens ? (
        <div>
          <DateRange getSomeData={getSomeData} entryDate={entryDate}/>
          <AddedInfo additionalInfo={additionalInfo} dataHasLoaded={dataHasLoaded}/>
        </div>
      ) : (
        <div><p>Connect your Dexcom Account</p><a href="https://api.dexcom.com/v2/oauth2/login?client_id=J0IbzpVpCwyHz7WjUC7eLxHFgPU0PDqV&redirect_uri=http://localhost:3000&response_type=code&scope=offline_access">Login</a></div>
      ) }

      {hasDexcomTokens ? (
        <Readings dataHasLoaded={dataHasLoaded} readings={readings} days={entryDate}/>
      ) : ''}
    </div>
  )
}

export default Dashboard;