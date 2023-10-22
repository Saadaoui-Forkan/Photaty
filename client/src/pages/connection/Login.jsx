import React from "react";
import "./connection.css";
import logo from "../../assets/photaty/logo.png";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <img className="loginLogo" src={logo} alt="logo" />
          <span className="loginDesc">
            Connect with friends and the world around you on  
            <span className='photaty'>Photaty</span>.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input placeholder="Email" className="loginInput" required />
            <input placeholder="Password" className="loginInput" required />
            <div className="btn">
              <button className="loginButton">Login</button>
              <p>Don't you have an account? <Link to='/register' className="span">Register</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
