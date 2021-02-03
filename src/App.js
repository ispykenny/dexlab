import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Query from './Components/Query';

import Dashboard from './Views/Dashboard';
import {useState, useEffect} from 'react'
import Gate from './Views/Gate';
import axios from 'axios'
import app from './Components/LoginManager'

function App(props) {
  const [tokens, setTokens] = useState();
  const [user, setUser] = useState(false);
  const [code, setCode] = useState();
  const [userId, setUserId] = useState();
  const [dexcomTokens , setHasDexcomTokens] = useState(false);

  const getAuth = async (url) => {
    setHasDexcomTokens(false)
    await axios(url)
    .then((res) => {
      console.log(res.data)
        app.database().ref('user/' + userId.uid).set({
          hasDexcomTokens: true,
          accessToken: res.data.access_token,
          refreshToken: res.data.refresh_token
        }).then(() => { 
          setTokens(res.data)
          setHasDexcomTokens(true)
      })
    })
    
  }

  useEffect(() => {
    if(code && userId) {
      let auth = getAuth(`http://localhost:5000/get-auth/?code=${code}`) 
      console.log(userId, 'why?')
    }
  }, [userId,code]);

  return (
    <div className="App">
      <Router>
        <Query setCode={setCode} userId={userId}/>
        { user ? <Redirect to="/dashboard" wee={'hi'} /> : <Redirect to="/" />}
        <Switch>
          <Route exact path="/" render={(props) => 
          <Gate 
              user={user}
              setUser={setUser}
              userId={userId}
              setUserId={setUserId} />} />
          <Route exact path="/dashboard"  render={(props) => <Dashboard tokens={tokens} setTokens={setTokens} userId={userId} user={user} setUser={setUser} code={code} dexcomTokens={dexcomTokens} setHasDexcomTokens={setHasDexcomTokens}/> }/>
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
