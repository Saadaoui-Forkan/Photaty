import React, { useState } from 'react'
import './navbar.css'
import avatar from '../../assets/photaty/avatar-profile.png'
import { Link } from 'react-router-dom'

function Navbar() {
  const [visible, setVisible] = useState(false);
  const visibleNav = () => {
    setVisible(!visible);
  };
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
              <button className="avatar-edit" disabled>
                <i className="fa-solid fa-user-pen"></i>
              </button>
            </div>
            <ul className="list">
              <Link className='a' to="/">
                <li >Home</li>
              </Link>
              <Link className='a' to="/Login">
                <li >Login</li>
              </Link>
              <Link className='a' to="/register">
                <li >Register</li>
              </Link>
            </ul>

            {/* --------- */}
            {/* <ul className="list">
              <Link to="/">
                <li >Home</li>
              </Link>
              <Link to="/addImage">
                <li >Add Image</li>
              </Link>
              <Link to="/login">
                <li >Logout</li>
              </Link>
            </ul> */}
            {/* --------- */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar