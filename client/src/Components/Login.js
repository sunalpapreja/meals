import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import validations from '../Validation/Validations';
const Login = (props) => {

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
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
      case "email":
        setemail(e.target.value);
        break;
      case "password":
        setpassword(e.target.value);
        break;
      default:
    }
  }

  const onLogIn = (e)=>{
    e.preventDefault();
    seterrmsg("");
    if(validations.validateEmail(email))
    {
    axios({
      method:"POST",
      url:"/login",
      data:{
        email:email,
        password:password
      }
    }).then((result)=>{
      if(result.data==="")
      {
        seterrmsg("*Email id does not exist");
      }
      else if(result.data==="pass")
      {
        seterrmsg("*Password incorrect");
      }
      else
      {
        seterrmsg("");
        var userData = result.data;
        localStorage.setItem("accessToken",userData.accessToken);
        props.history.push("/home");
      }
      })
    }
    else
    {
      seterrmsg("*Email id is incorrect");
    }
  }


    return (
        <div>
            <Navbar/>
            <div className=" border-primary" style={{width:"60vh"}}>
    <form className="p-4">
  <div className="form-group">
    <input type="email" className="form-control" name="email" onChange={handleChangeForm} placeholder="Email" />
  </div>
  <div className="form-group">
    <input type="password" className="form-control" name="password" onChange={handleChangeForm} placeholder="Password"/>
  </div>
  
  <div className="App-header">
  <button type="submit" className="btn btn-secondary"onClick={onLogIn}>Sign in</button>
  <small id="emailHelp" className="form-text text-muted mt-2">Don't have an account? <a href="/signup">Register here</a> </small>
  {errmsg?<small className="text-danger">{errmsg}</small>:null}
  </div>
  </form>
  </div>
        </div>
    )
}

export default Login;
