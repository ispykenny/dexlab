import './App.scss';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import {
  useState, 
  useEffect
} from 'react'
import {
  check_if_logged_in
} from './Utils/firebase-services'
import Query from './Components/Query';
import Home from './Views/Home'
import Dashboard from './Views/Dashboard';
import Director from './Components/Director';

function App(props) {
  const [user_id, setUserId] = useState(false);
  const [api_code, set_api_code] = useState();

  useEffect(() => {
    check_if_logged_in(setUserId);
  }, [user_id]);

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
          path="/dashboard" 
          render={() => 
            <Dashboard 
              user_id={user_id} 
              setUserId={setUserId}
              set_api_code={set_api_code}
              api_code={api_code}
            />
          }
          />
        <Director 
          user_id={user_id} 
          api_code={api_code} 
        />
      </Router>
    </div>
  );
}

export default App;
