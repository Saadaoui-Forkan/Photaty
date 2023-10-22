import React from 'react'
import './connection.css'
import logo from "../../assets/photaty/logo.png";
import { Link } from 'react-router-dom';
// import Alert from '../../components/alert/Alert';

function Register() {
  return (
    <div className="register">
        {/* <Alert/> */}
      <div className="loginWrapper">
        <div className="loginLeft">
          <img className="loginLogo" src={logo} alt="logo" />
          <div className="loginDesc">
            Connect with friends and the world around you on 
            <span className='photaty'>Photaty</span>.
          </div>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input placeholder="Name" className="loginInput" />
            <input placeholder="Email" className="loginInput" />
            <input placeholder="Password" className="loginInput" />
            <input placeholder="Password Again" className="loginInput" />
            <div className="btn">
                <button className="loginButton">Register</button>
                <p>
                    Do you have an account? 
                    <Link to ='/login' className='span'>Login</Link>
                </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Register