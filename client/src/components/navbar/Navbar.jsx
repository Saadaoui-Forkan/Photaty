import React, { useState, useEffect } from 'react'
import './navbar.css'
import NavbarProfile from './NavbarProfile';
import Logo from './Logo';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [me, setMe] = useState([]);

  /**
   * Get Current User
   */
  useEffect(() => {
    getMe();
  }, []);

  const getMe = async () => {
    try {
      if (user) {
        const res = await axios.get(`api/users/me`, {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": user?.data?.token,
          },
        });
        setMe(res?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <nav className="navbar">
      {user ? <NavbarProfile me={me}/> : ""}
      <Logo />
      <div className="nav-right">
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/login">Connection</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar