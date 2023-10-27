import React, { useState } from 'react'
import './navbar.css'
import avatar from '../../assets/photaty/avatar-profile.png'
import { Link } from 'react-router-dom'
import NavbarHome from './NavbarHome';
import NavbarProfile from './NavbarProfile';

function Navbar() {
  const [visible, setVisible] = useState(false);
  const visibleNav = () => {
    setVisible(!visible);
  };
  const user = JSON.parse(localStorage.getItem('user'))
  return (
    <div className="navbar">
      <button className="nav-btn open-btn" onClick={visibleNav}>
        <i className="fas fa-bars"></i>
      </button>

      <div className={visible ? "nav visible nav-black" : "nav nav-black"}>
        <div className={visible ? "nav visible nav-red" : "nav nav-red"}>
          <div className={visible ? "nav visible nav-white" : "nav nav-white"}>
            <button className="nav-btn close-btn" onClick={visibleNav}>
              <i className="fas fa-times"></i>
            </button>
            <div className="avatar-container">
              <img src={avatar} alt="Logo" className="logo" />
              <Link to="/profile">
                <button className="avatar-edit" disabled={user ? false : true}>
                  <i className="fa-solid fa-user-pen"></i>
                </button>
              </Link>
            </div>
            {
              user ? <NavbarProfile /> : <NavbarHome />
            }
            
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar