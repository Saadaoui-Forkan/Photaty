import React, { useState } from 'react'
import './connection.css'
import logo from "../../assets/photaty/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../../components/alert/Alert';
import axios from 'axios'

function Register() {
  const [error, setError] = useState('')

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { name, email, password, confirmPassword } = formData

  const onChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const onSubmit = async e => {
    e.preventDefault()  
    axios.post('/api/users/register', formData)
    .then(res => {
      setFormData(res?.data)
      navigate("/login")
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    })
    .catch(error => {
      setError(error?.response?.data?.message)
    })
  }
  return (
    <div className="register">
      {error && <Alert error={error}/>}
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
            <input 
              type='name'
              placeholder="Name" 
              className="loginInput" 
              value={name}
              name="name"
              onChange={e =>onChange(e)}
            />
            <input 
              type='text'
              placeholder="Email" 
              className="loginInput" 
              value={email}
              name="email"
              onChange={e =>onChange(e)}
            />
            <input 
              type='password'
              placeholder="Password" 
              className="loginInput"
              value={password}
              name="password"
              onChange={e =>onChange(e)} 
            />
            <input 
              type='password'
              placeholder="Password Again" 
              className="loginInput" 
              value={confirmPassword}
              name="confirmPassword"
              onChange={e =>onChange(e)}
            />
            <div className="btn">
                <button 
                  className="loginButton" 
                  onClick={e =>onSubmit(e)}
                >Register</button>
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