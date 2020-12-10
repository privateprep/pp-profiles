import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Profile from "./Profile"

import './App.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/:uuid" component={Profile}>
          <Profile />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
