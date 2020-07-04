import React from 'react';
import './App.css';
import Login from './Components/Login';
import Singup from './Components/Signup';
import Welcome from './Components/Welcome';
import Home from './Components/Home';
import { BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  return (
    <div>
      <div className="Background App-header">
      <Router>
        <Route path = "/login" component = {Login}/>
        <Route path = "/signup" component = {Singup} />
        <Route path = "/home" component = {Home} />
        <Route exact path = "/" component = {Welcome}/>
      </Router>
      </div>
    </div>
  );
}

export default App;
