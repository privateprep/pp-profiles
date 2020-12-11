import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Menu from "./Menu";
import Profile from "./Profile"
import Fallback from "./Fallback"

import "./fonts/fonts.css";
import './App.css';

const App = () => {
  return (
    <>
      <Menu />
      <Router>
        <Switch>
          <Route path="/:uuid" component={Profile} />
          <Route path="/" component={Fallback} />
        </Switch>
      </Router>
    </>
  )
}

export default App;
