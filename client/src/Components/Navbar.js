import React, {useState} from 'react';
import {Navbar, Nav} from 'react-bootstrap';

const NavBar = (props) => {



    return (
        <div style={{width:"100%",top:"0",position:"absolute"}}>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">Meals</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            {props.act==="login"?<Nav.Link active href="login" id="login">Sign in</Nav.Link>:<Nav.Link href="login" id="login" >Sign in</Nav.Link>}
            {props.act==="signup"?<Nav.Link active id="signup" href="signup">Sign up</Nav.Link>:<Nav.Link href="signup" id="signup">Sign up</Nav.Link>}
          </Nav>
          <Nav>
              <span className="navbar-text">
              Health is wealth!
              </span>
          </Nav>
          </Navbar.Collapse>
</Navbar>
        </div>
    )
}

export default NavBar;
