import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Visualizations from './components/Visualizations';
import Home from './components/Home';
import {Nav, Button} from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import { Details } from './components/Details';

function App() {
  return (
    <div className="App">
      <Router>
        <NavLink className="navLink" to="/home">Home</NavLink>
        <NavLink className="navLink"
          to="/visualization"
        >
        Visualization
        </NavLink>
        <Switch>
          <Route path="/visualization">
            <Visualizations />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/details">
            <Details />
          </Route>
        </Switch>
    </Router>
    </div>
  );
}

export default App;
