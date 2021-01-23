import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Readings from '../Components/Readings';
import moment from 'moment';

const Dashboard = ({tokens}) => {
  const [readings, setReadings] = useState();
  const [mounted, setMounted] = useState(false);
  const [entryDate, setEntryDate] = useState(31);

  const dataFetcher = (url) => {
    return axios(url)
      .then(res => res)
      .catch(error => error)
  }

  const getSomeData = async (entryDate) => {
    setEntryDate(entryDate)
    setMounted(false)
    const date = moment().format('YYYY-MM-DDTHH:MM:ss');
    const startDate = moment().subtract(entryDate, 'days').format('YYYY-MM-DDTHH:MM:ss');
    let theReadings = await dataFetcher(`http://localhost:5000/get-data?access_token=${tokens.access_token}&refresh_token=${tokens.refresh_token}&start_date=${startDate}&now_date=${date}`)
    setReadings(theReadings);
    setMounted(true)
  }

  useEffect(() => {
    if(!mounted) {
      console.log(entryDate)
      getSomeData();
    }
  },[])

  return (
    <div>
      {entryDate}
      <button onClick={() => getSomeData(31)}>31 days</button>
      <button onClick={() => getSomeData(60)}>60 days</button>
      <button onClick={() => getSomeData(90)}>90 days</button>
      <button onClick={() => getSomeData(entryDate)}>Refresh</button>
      Dashboard , { mounted ? <Readings readings={readings} days={entryDate}/> : <div>Loading readings...</div>}
    </div>
  )
}

export default Dashboard;