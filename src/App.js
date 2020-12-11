import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Profile from "./Profile"
import Fallback from "./Fallback"

import "./fonts/fonts.css";
import './App.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/:uuid" component={Profile} />
        <Route path="/" component={Fallback} />
      </Switch>
    </Router>
  )
}

export default App;
