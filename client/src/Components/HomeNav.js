import React, {useState, useEffect} from 'react';
import {Navbar, Nav, Dropdown} from 'react-bootstrap';
import axios from 'axios';


const HomeNav = (props) => {

    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");

    const onSignOut = (e)=>{
        localStorage.clear();
        props.history.push("/login");
    }


    useEffect(() => {
       
      var accessToken = localStorage.getItem("accessToken");
      console.log("aa")
      axios({
              method:"POST",
              url:"/userDetails",
              data:{
                  accessToken:accessToken
              }
          }).then((result)=>{
              if(result.data==="")
              {
                  console.log("bb")
              }
              else
              {

                  var userDetails = result.data;
                  setfirstname(userDetails.firstname);
                  setlastname(userDetails.lastname);
              }
          })
      
  },[]);




    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/home">Meals</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            
          </Nav>
          <Nav>
              <div className="mr-2 mt-2">
              Signed in as :
              </div>
          <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    {firstname + " " + lastname}
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item onClick={onSignOut}>Sign Out</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
    </Nav>
  </Navbar.Collapse>
</Navbar>
            
        </div>
    )
}

export default HomeNav;
