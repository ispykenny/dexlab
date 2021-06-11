import app from './firebase-settings';
import axios from 'axios';

const dexcom_tokens = async (user_id, code, set_dexcom_keys) => {
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
        const username = snapshot.val() || 'No data';
        set_dexcom_keys(username)
      });
    })
  }
  
}

export default dexcom_tokens;