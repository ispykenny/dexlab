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
  const [ogValues, setOgValues] = useState(false);
  const [currentTokens, setCurrentTokens] = useState();


  

  useEffect(() => {
    if(tokens && !mounted) {
      if(dexcomTokens) {
        console.log('here in use effect', tokens)
        console.log('about to fire func')
        getSomeData();
        console.log('fired func', tokens)
        setMounted(true)
      }
      console.log(tokens, ' tooo')
    }
  },[dexcomTokens, user, tokens])

  useEffect(() => {
    let username;
    if(!mounted) {
      if(userId) {
        console.log(tokens, 'weeeehere')
        app.database().ref('/user/' + userId.uid).once('value').then((snapshot) => {
          const notUser =  {hasDexcomTokens: false}
          username = (snapshot.val() && snapshot.val()) || notUser;
          setHasDexcomTokens(username.hasDexcomTokens)
          setTokens(username);
        });
        setMounted(true)
      }
    }
  }, [ user, user, setTokens])


  useEffect(() => {
    if(tokens && !ogValues) {
      if(tokens) {
        if(dexcomTokens) {
          getSomeData();
          setOgValues(true)
        }
      }
    }
    if(dexcomTokens) {
      setCurrentTokens(tokens)
      // getSomeData();
    }
    {console.log({dexcomTokens})}
  }, [tokens, dexcomTokens])
  

  const dataFetcher = (url) => {
    return axios(url)
      .then(res => res)
      .catch(error => error)
  }

  const getSomeData = async (newDate = 1) => {
    setDataHasLoaded(false)
    setEntryDate(newDate)
    console.log('getSomeData')

    
    const date = await moment().add(1 , 'days').format('YYYY-MM-DDTHH:MM:ss');
    const startDate = await moment().subtract(newDate, 'days').format('YYYY-MM-DDTHH:MM:ss');
    const currentInfoDate = moment().add(1, 'days').format('YYYY-MM-DD');
    const startInfoDate = moment().subtract(newDate, 'days').format('YYYY-MM-DD')
    console.log(tokens.access_token , 'inside get some data')
    const theReadings = await dataFetcher(`http://localhost:5000/get-data?access_token=${tokens.access_token}&refresh_token=${tokens.refresh_token}&start_date=${startDate}&now_date=${date}`)

    const newTokens = {
      hasDexcomTokens: true,
      access_token: theReadings.data.settings.access_token,
      refresh_token: theReadings.data.settings.refresh_token
    }
    console.log(newTokens)
    // setTokes(newTokens)
    
    app.database().ref('user/' + userId.uid).set({
      hasDexcomTokens: true,
      access_token: theReadings.data.settings.access_token,
      refresh_token: theReadings.data.settings.refresh_token
    })

    setReadings(theReadings);
    const userInfo = await dataFetcher(`http://localhost:5000/data?access_token=${theReadings.data.settings.access_token}&refresh_token=${theReadings.data.settings.refresh_token}&start_date=${startInfoDate}&now_date=${currentInfoDate}`)
    setHasDexcomTokens(true)
    setAdditionalInfo(userInfo)
    setDataHasLoaded(true)
    
  }


  const removeAccount = () => {
    app.database().ref('user/' + userId.uid).set(null)
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
          <Readings dataHasLoaded={dataHasLoaded} readings={readings} days={entryDate}/>
        </div>
      ) : (
        <NoDexConnected/>
      ) }

    </div>
  )
}

export default Dashboard;