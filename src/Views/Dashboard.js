import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Readings from '../Components/Readings';
import moment from 'moment';
import SignoutBtn from '../Components/SignOutBtn'
import app from '../Components/LoginManager'
import AddedInfo from '../Components/AddedInfo';
import DateRange from '../Components/DateRange';
import NoDexConnected from '../Components/NoDexConnected';

const Dashboard = ({props , code , tokens, setTokens, userId , user, setUser, dexcomTokens , setHasDexcomTokens}) => {
  const [readings, setReadings] = useState();
  const [mounted, setMounted] = useState(false);
  const [entryDate, setEntryDate] = useState(1);
  const [dataHasLoaded, setDataHasLoaded] = useState(false);
  const [ additionalInfo , setAdditionalInfo] = useState();


  
  useEffect(() => {
    let username;
    if(!mounted) {
      if(userId) {
        console.log(tokens, 'weeeehere')
        app.database().ref('/user/' + userId.uid).once('value').then((snapshot) => {
          const notUser =  {hasDexcomTokens: false}
          username = (snapshot.val() && snapshot.val()) || notUser;
          console.log(username.hasDexcomTokens, 'response')
          setHasDexcomTokens(username.hasDexcomTokens)
          setTokens(username);
          console.log(username)
          console.log(tokens, 'state')
        });
        setMounted(true)
      }
    }
    return () => {
      setMounted(true);
      setTokens(null)
      setUser(false)
      setHasDexcomTokens(false);
      setAdditionalInfo(false);
      console.log('i happened')
    }
  }, [ user, user, setTokens])

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
    const theReadings = await dataFetcher(`http://localhost:5000/get-data?access_token=${tokens.accessToken}&refresh_token=${tokens.refreshToken}&start_date=${startDate}&now_date=${date}`)

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
    console.log(dexcomTokens, 'here')
    if(tokens && dexcomTokens) {
      getSomeData();
      setHasDexcomTokens(true)
    }
  },[tokens, setHasDexcomTokens])
  

  const removeAccount = () => {
    app.database().ref('user/' + userId.uid).set(null).then(() => {
      setHasDexcomTokens(false);
      setUser(false)
      setTokens(false)
      console.log('here')
      setMounted(false)
    })
  }

  return (
    <div className="inner">
      {mounted ? userId.displayName : '' }
      <SignoutBtn userId={userId} setUser={setUser} user={user} setMounted={setMounted}/>
      <br/>
      {dexcomTokens ? (
        <div>
          <DateRange getSomeData={getSomeData} entryDate={entryDate}/>
          <AddedInfo additionalInfo={additionalInfo} dataHasLoaded={dataHasLoaded}/>
        </div>
      ) : (
        <NoDexConnected/>
      ) }

      {dexcomTokens ? (
        <Readings dataHasLoaded={dataHasLoaded} readings={readings} days={entryDate}/>
      ) : ''}
    </div>
  )
}

export default Dashboard;