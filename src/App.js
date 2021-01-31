import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Query from './Components/Query';
import Auth from './Views/Auth';
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
  const [hasDexcomTokens , setHasDexcomTokens] = useState(false);

  const getAuth = async (url) => {
    await axios(url)
    .then((res) => {
      console.log(res.data)
        app.database().ref('user/' + userId.uid).set({
          hasDexcomTokens: true,
          accessToken: res.data.access_token,
          refreshToken: res.data.refresh_token
        })
        setHasDexcomTokens(true)
    })
  }

  useEffect(() => {
    if(code && userId) {
      console.log(userId, code, 'fuck yes')
      let auth = getAuth(`http://localhost:5000/get-auth/?code=${code}`) 
    }
  }, [userId,code]);

  return (
    <div className="App">
      <Router>
        <Query setCode={setCode} userId={userId}/>
        { user ? <Redirect to="/dashboard" /> : <Redirect to="/" />}
        <Switch>
          <Route exact path="/" render={(props) => 
          <Gate 
              user={user}
              setUser={setUser}
              userId={userId}
              setHasDexcomTokens={setHasDexcomTokens}
              setUserId={setUserId} />} />
          <Route path="/get-auth/:code" render={(props) => <Auth code={props} setTokens={setTokens}/>}>
          </Route>
          <Route exact path="/dashboard"  render={(props) => <Dashboard tokens={tokens} userId={userId} user={user} setUser={setUser}/>} code={code} setHasDexcomTokens={setHasDexcomTokens} hasDexcomTokens={hasDexcomTokens}/>
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
