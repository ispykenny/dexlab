import React, {useEffect, useState} from 'react'
import {Sign_out} from '../Components/loginservice'
import app from '../Components/LoginManager';
import moment from 'moment';
import axios from 'axios';

const Loggedin = ({user_id, setUserId, set_api_code, api_code}) => {
  const [dexcom_keys, set_dexcom_keys] = useState(false);
  const [mounted, set_mounted] = useState(false);

  const delete_user = () => {
    const user = app.auth().currentUser;
    user
    .delete()
    .then(() => {
      deleteDb();
      console.log('user deleted')
    })
    .catch((err) => console.log(err))
  }

  const addToDb = () => {
    app
    .database()
    .ref('user/' + user_id.uid)
    .set({
      hasDexcomTokens: true,
      access_token: '',
      refresh_token: ''
    }).then(() => {
      app
      .database()
      .ref('/user/' + user_id.uid)
      .once('value')
      .then((snapshot) => {
        let username = snapshot.val() || 'No data';
        set_dexcom_keys(username)
      });
    })
  }

  const deleteDb = () => {
    app
    .database()
    .ref('user/' + user_id.uid)
    .set(null)
    set_dexcom_keys(false)
  }

  const dexcom_tokens = async (user_id, code) => {
    let the_data = await axios(`http://localhost:5000/get-auth/?code=${code}`)
    .then((res) => res.data)
    .catch((err) => console.log(err))
    
    if(the_data) {
      app
      .database()
      .ref('user/' + user_id.uid)
      .set({
        hasDexcomTokens: true,
        access_token: the_data.access_token,
        refresh_token: the_data.refresh_token
      }).then(() => {
        app
        .database()
        .ref('/user/' + user_id.uid)
        .once('value')
        .then((snapshot) => {
          let username = snapshot.val() || 'No data';
          set_dexcom_keys(username)
        });
      })
    }
    
  }

  useEffect(() => {
    if(user_id) {
      app
      .database()
      .ref('/user/' + user_id.uid)
      .once('value')
      .then((snapshot) => {
        let username = snapshot.val() || 'No data';
        set_dexcom_keys(username)
      });
      if(api_code) {
        dexcom_tokens(user_id, api_code)
      }
    }

  }, [user_id, set_api_code, api_code]);

  const Data = ({tokens}, newDate = 1) => {
    useEffect(() => {
      if(tokens.hasDexcomTokens && !mounted) {
        set_mounted(true)
        axios
        .get(`http://localhost:5000/get-data?access_token=${tokens.access_token}&refresh_token=${tokens.refresh_token}&start_date=${moment().subtract(30, 'days').format('YYYY-MM-DDTHH:MM:ss')}&now_date=${moment().add(1 , 'days').format('YYYY-MM-DDTHH:MM:ss')}`)
        .then((res) => {
          let at = res.data.settings.access_token;
          let rt = res.data.settings.refresh_token;
          set_dexcom_keys(res.data.settings);
          console.log(res.data)
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
    return <div>hi</div>
  }



  return (
    <div>
      {dexcom_keys.hasDexcomTokens ? null : (
        <div>
          <a href="https://api.dexcom.com/v2/oauth2/login?client_id=J0IbzpVpCwyHz7WjUC7eLxHFgPU0PDqV&redirect_uri=http://localhost:3000/logged-in&response_type=code&scope=offline_access">Login</a>
        </div>
      )}
      {dexcom_keys.hasDexcomTokens ? (
        <div>
          <Data tokens={dexcom_keys}/>
        </div>
      ) : null}
      {JSON.stringify(dexcom_keys)}
      <button onClick={(() => addToDb())}>add to database</button>
      <button onClick={(() => deleteDb())}>Delete database</button>
      <button onClick={() => Sign_out(setUserId)}>Sign out</button>
      <button onClick={() => delete_user()}>Delete_account</button>
    </div>
  )
}

export default Loggedin;