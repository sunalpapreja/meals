import React from 'react';
import {NavLink} from 'react-router-dom';

const Navbar = (props) => {

    return (
        <div>
            <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark round" style={{height:"45px", opacity:"0.8"}}>
  <NavLink className="navbar-brand" to="/">Meals</NavLink>
  <div className="collapse navbar-collapse" id="navbarText">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <NavLink className="nav-link" to="/login">Sign In</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link"  to="/signup">Sign up</NavLink>
      </li>
    </ul>
    <span className="navbar-text">
      Health is wealth!
    </span>
  </div>
</nav>
        </div>
    )
}

export default Navbar;
