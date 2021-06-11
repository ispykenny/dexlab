import React, {useEffect, useState} from 'react'
import {Sign_out, Disconnect_dexcom} from '../Utils/firebase-services'
import app from '../Utils/firebase-settings';
import moment from 'moment';
import axios from 'axios';
import Readings from '../Components/Readings';
import dexcom_tokens from '../Utils/set-intial-tokens';

const Loggedin = ({user_id, setUserId, set_api_code, api_code}) => {
  const [dexcom_keys, set_dexcom_keys] = useState(false);
  const [mounted, set_mounted] = useState(false);
  const [glucose_readings, set_glucose_readings] = useState(false);

  const delete_user = () => {
    const user = app.auth().currentUser;
    user
    .delete()
    .then(() => {
      Disconnect_dexcom(user_id.uid, set_dexcom_keys)
    })
    .catch((err) => console.log(err))
  }


  useEffect(() => {
    if(user_id) {
      app
      .database()
      .ref('/user/' + user_id.uid)
      .once('value')
      .then((snapshot) => {
        const username = snapshot.val() || 'No data';
        set_dexcom_keys(username)
      });
      if(api_code) {
        dexcom_tokens(user_id, api_code, set_dexcom_keys)
      }
    }

  }, [user_id, set_api_code, api_code]);

  const Data = ({tokens}, newDate = 1) => {
    useEffect(() => {
      if(tokens.hasDexcomTokens && !mounted) {
        set_mounted(true)
        axios
        .get(`http://localhost:5000/get-data?access_token=${tokens.access_token}&refresh_token=${tokens.refresh_token}&start_date=${moment().subtract(7, 'days').format('YYYY-MM-DDTHH:MM:ss')}&now_date=${moment().add(0, 'days').format('YYYY-MM-DDTHH:MM:ss')}`)
        .then((res) => {
          let at = res.data.settings.access_token;
          let rt = res.data.settings.refresh_token;
          set_dexcom_keys(res.data.settings);
          set_glucose_readings(res.data.dexcom)
          app
          .database()
          .ref('user/' + user_id.uid)
          .set({
            hasDexcomTokens: true,
            access_token: at,
            refresh_token: rt
          })
        .then(() => {
          app
          .database()
          .ref('/user/' + user_id.uid)
          .once('value')
        })
      })
      .catch((error) => console.log(error))
      return <div>yes</div>
      } else {
        return <div>no</div>
      }
    }, []);
    return null
  }



  return (
    <div>
      {dexcom_keys ? null : (
        <div>
          <a href="https://api.dexcom.com/v2/oauth2/login?client_id=J0IbzpVpCwyHz7WjUC7eLxHFgPU0PDqV&redirect_uri=http://localhost:3000/logged-in&response_type=code&scope=offline_access">Login</a>
        </div>
      )}
      {dexcom_keys.hasDexcomTokens ? (
        <div>
          <Data tokens={dexcom_keys}/>
        </div>
      ) : null}
      <button onClick={(() => Disconnect_dexcom(user_id.uid, set_dexcom_keys))}>Disconnect Your Dexcom</button>
      <button onClick={() => Sign_out(setUserId)}>Sign out</button>
      <button onClick={() => delete_user()}>Delete_account</button>
      <Readings readings={glucose_readings}/>
    </div>
  )
}

export default Loggedin;