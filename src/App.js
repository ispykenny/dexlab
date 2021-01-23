import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Views/Home';
import Query from './Components/Query';
import Auth from './Views/Auth';
import Dashboard from './Views/Dashboard';
import {useState} from 'react'


function App(props) {
  const [tokens, setTokens] = useState();

  return (
    <div className="App">
      <Router>
      <Query/>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/get-auth/:code" render={(props) => <Auth code={props} setTokens={setTokens}/>}>
          </Route>
          <Route exact path="/dashboard" render={(props) => <Dashboard tokens={tokens}/>} />
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
