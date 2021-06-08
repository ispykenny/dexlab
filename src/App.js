import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Query from './Components/Query';
import {useState, useEffect} from 'react'
import Home from './Views/Home'
import {check_if_logged_in} from './Components/loginservice'
import Loggedin from './Views/Loggedin';

function App(props) {
  const [user_id, setUserId] = useState(false);
  const [api_code, set_api_code] = useState();

  useEffect(() => {
    check_if_logged_in(setUserId);
  }, [user_id]);

  const Director = () => {
    if(user_id || api_code ) {
      return (
        <Redirect to="/logged-in" user_id={user_id}/>
      )
    } else {
      return (
        <Redirect exact to="/"/>
      )
    }
  }

  return (
    <div className="App">
      <Router>
        <Query 
          set_api_code={set_api_code}
        />
        <Route 
          exact 
          path="/" 
          render={() => 
            <Home setUserId={setUserId}/>
          } 
          />
        <Route 
          path="/logged-in" 
          render={() => 
            <Loggedin 
              user_id={user_id} 
              setUserId={setUserId}
              set_api_code={set_api_code}
              api_code={api_code}
            />
          }
          />
        <Director/>
      </Router>
    </div>
  );
}

export default App;
