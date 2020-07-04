import React, {useState, useEffect} from 'react';
import axios from 'axios';
import validations from '../Validation/Validations';
import Navbar from './Navbar';

const Signup = (props) => {
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [errmsg, seterrmsg] = useState('');

  useEffect(() => {
    var accessToken = localStorage.getItem("accessToken");
    if(accessToken)
    {
        props.history.push("/home");
    }
},[]);


const handleChangeForm = (e)=>{
switch(e.target.name)
{
  case "firstName":
    setfirstname(e.target.value);
    break;
  case "lastName":
    setlastname(e.target.value);
    break;
  case "email":
    setemail(e.target.value);
    break;
  case "password":
    setpassword(e.target.value);
    break;
  case "confirmPassword":
    setconfirmPassword(e.target.value);
    break;
  default:
}
}

const onSignup = (e)=>{
    e.preventDefault();
    seterrmsg("");
    if(validations.validateEmail(email) && password===confirmPassword)
    {
      seterrmsg("")
      axios({
        method: "POST",
        url: '/signup',
        data:{
          firstname:firstname,
          lastname:lastname,
          email:email,
          password:password
        }
      }).then((result)=>{
        if(result.data==="")
      {
        seterrmsg("This email id is already in use.");   
      }
      else
      {
        seterrmsg("");
        var userData = result.data;
        localStorage.setItem("accessToken",userData.accessToken);
        props.history.push("/home");
      }
      });
    }
    else
    {
      if(validations.validateEmail(email))
      {
        seterrmsg("*Password does not match"); 
      }
      else
      {
        seterrmsg("*Email id is incorrect");
      }
    }
  }


    
  return (
        <div>
            <Navbar act="signup" {...props}/>
            <div style={{width:"65vh"}}>
    <form className="p-4">
    <div className="form-group row">
        <div className="col">
    <input type="text" className="form-control" name="firstName" placeholder="First name" onChange={handleChangeForm}/>
    </div>
    <div className = "col">
    <input type="text" className="form-control" name="lastName" placeholder="Last name" onChange={handleChangeForm}/>
    </div>
  </div>  
  <div className="form-group">
    <input type="email" className="form-control" name="email" placeholder="Email" required onChange={handleChangeForm}/>
  </div>
  <div className="form-group">
    <input type="password" className="form-control" name="password" placeholder="Password" required onChange={handleChangeForm}/>
  </div>
  <div className="form-group">
    <input type="password" className="form-control" name="confirmPassword" placeholder="Confirm Password" required onChange={handleChangeForm}/>
  </div>
  <div className="App-header">
  <button type="submit" className="btn btn-secondary" onClick={onSignup}>Sign up</button>
  <small id="emailHelp" className="form-text text-muted mt-2">Already have an account? <a href="login">Sign in</a> </small>
  {errmsg?<small className="text-danger">{errmsg}</small>:null}
  </div> 
</form>
</div>

        </div>
    )
}

export default Signup;
