import React, {useEffect, useState} from 'react'
import {Sign_out, Disconnect_dexcom, delete_user} from '../Utils/firebase-services'
import app from '../Utils/firebase-settings';
import moment from 'moment';
import axios from 'axios';
import Readings from '../Components/Readings';
import dexcom_tokens from '../Utils/set-intial-tokens';
import Select from '../Components/Select';
import DexcomConnect from '../Components/DexcomConnect';
import GetChart from '../Components/GetChart';
import Nav from '../Components/Nav';

const Loggedin = ({user_id, setUserId, set_api_code, api_code}) => {
  const [dexcom_keys, set_dexcom_keys] = useState(false);
  const [mounted, set_mounted] = useState(false);
  const [reset, set_reset] = useState(false);
  const [glucose_readings, set_glucose_readings] = useState(false);
  const [days_of_readings, set_days_of_readings] = useState(1);
  const [device_settings, set_device_settings] = useState();
  const [day_results , set_day_results] = useState();
  


  useEffect(() => {
    if(user_id) {
      app
      .database()
      .ref('/user/' + user_id.uid)
      .once('value')
      .then((snapshot) => {
        const username = snapshot.val() || '';
        set_dexcom_keys(username)
      });
      if(api_code) {
        dexcom_tokens(user_id, api_code, set_dexcom_keys)
      }
    }

  }, [user_id, set_api_code, api_code]);

  const Getpayload = ({tokens}) => {
    useEffect(() => {
      if(tokens.hasDexcomTokens && !mounted) {
        set_mounted(true)
        axios
        .get(`http://localhost:5000/get-data?access_token=${tokens.access_token}&refresh_token=${tokens.refresh_token}&start_date=${moment().subtract(days_of_readings, 'days').format('YYYY-MM-DDTHH:MM:ss')}&now_date=${moment().add(8, 'hours').format('YYYY-MM-DDTHH:MM:ss')}`)
        .then((res) => {
          let at = res.data.settings.access_token;
          let rt = res.data.settings.refresh_token;
          set_dexcom_keys(res.data.settings);
          set_glucose_readings(res.data.dexcom)
          set_day_results(res.data.dexcom)
          app
          .database()
          .ref('user/' + user_id.uid)
          .set({
            hasDexcomTokens: true,
            access_token: at,
            refresh_token: rt
          })
          app
          .database()
          .ref('/user/' + user_id.uid)
          .once('value')
          set_reset(x => true);
          axios.get(`http://localhost:5000/data?access_token=${tokens.access_token}&refresh_token=${tokens.refresh_token}&start_date=${moment().subtract(days_of_readings, 'days').format('YYYY-MM-DDTHH:MM:ss')}&now_date=${moment().add(8, 'hours').format('YYYY-MM-DDTHH:MM:ss')}`)
          .then(response => set_device_settings(response.data))
          .catch((error) => console.log(error))
      })
      .catch((error) => console.log(error))
      return <div>yes</div>
      } else {
        return <div>no</div>
      }
    }, [tokens.hasDexcomTokens, tokens.access_token, tokens.refresh_token]);
    return null
  }

  const reading_handeling = event => {
    set_reset(x => false);
    axios
    .get(`http://localhost:5000/get-data?access_token=${dexcom_keys.access_token}&refresh_token=${dexcom_keys.refresh_token}&start_date=${moment().subtract(event.target.value, 'days').format('YYYY-MM-DDTHH:MM:ss')}&now_date=${moment().add(8, 'hours').format('YYYY-MM-DDTHH:MM:ss')}`)
    .then((res) => {
      let at = res.data.settings.access_token;
      let rt = res.data.settings.refresh_token;
      set_glucose_readings(res.data.dexcom)
      set_dexcom_keys(res.data.settings);
      set_days_of_readings(event.target.value)
      app
      .database()
      .ref('user/' + user_id.uid)
      .set({
        hasDexcomTokens: true,
        access_token: at,
        refresh_token: rt
      })
      app
      .database()
      .ref('/user/' + user_id.uid)
      .once('value')
      axios.get(`http://localhost:5000/data?access_token=${dexcom_keys.access_token}&refresh_token=${dexcom_keys.refresh_token}&start_date=${moment().subtract(event.target.value, 'days').format('YYYY-MM-DDTHH:MM:ss')}&now_date=${moment().add(8, 'hours').format('YYYY-MM-DDTHH:MM:ss')}`)
          .then(response => {
            set_device_settings(response.data) 
            set_reset(x => true)
          })
          .catch((error) => console.log(error))
      
    })
  .catch((error) => console.log(error))
  }


  return (
    <div className="dashboard">
      <Nav/>
      <div className="inner">
        <DexcomConnect dexcom_keys={dexcom_keys}/>
        {dexcom_keys.hasDexcomTokens ? <Getpayload tokens={dexcom_keys}/> : null}
        <button onClick={(() => Disconnect_dexcom(user_id.uid, set_dexcom_keys))}>Disconnect Your Dexcom</button>
        <button onClick={() => Sign_out(setUserId)}>Sign out</button>
        <button onClick={() => delete_user()}>Delete account</button>
        {dexcom_keys ? (
          <div>
            <Select 
              onChange={(event) => reading_handeling(event)}
              set_days_of_readings={set_days_of_readings}
              days_of_readings={days_of_readings}
            />
            <div className="tiles">
              <Readings 
                days_of_readings={days_of_readings} 
                readings={glucose_readings} 
                reset={reset} 
                device_settings={device_settings} 
                user_id={user_id}
              />
            </div>
            <div>
              <h3>Chart based on the past 24 hours</h3>
              <GetChart 
                readings={day_results} 
                reset={reset} 
                device_settings={device_settings}
              />
            </div>
          </div>
        ) : null }
      </div>
    </div>
  )
}

export default Loggedin;
