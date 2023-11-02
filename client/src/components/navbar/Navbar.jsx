import React, { useState, useEffect } from 'react'
import './navbar.css'
import defaultAvatar from '../../assets/photaty/avatar-profile.png'
import { Link } from 'react-router-dom'
import NavbarHome from './NavbarHome';
import NavbarProfile from './NavbarProfile';
import axios from 'axios';

function Navbar() {
  /**
   * Animated Navbar
   */
  const [visible, setVisible] = useState(false);
  const visibleNav = () => {
    setVisible(!visible);
  };
  /************************************************** */
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
      const res = await axios.get(`api/users/me`, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": user?.data?.token,
        },
      });
      setMe(res?.data);
    } catch (error) {
      console.error(error);
    }
  };
  // console.log(me.avatar)
  const avatarSrc = me?.avatar
    ? require(`../../assets/profile/${me.avatar}`)
    : defaultAvatar;

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
              <img src={avatarSrc} alt="Logo" className="logo" />
              <Link to="/profile">
                <button className="avatar-edit" disabled={user ? false : true}>
                  <i className="fa-solid fa-user-pen"></i>
                </button>
              </Link>
            </div>
            <div className="user-description">
              <h3 className='user-info'>{me?.name}</h3>
              <h3 className='user-info'>{me?.bio}</h3>
              <h3 className='user-info'>{me?.status}</h3>
            </div>
            {user ? <NavbarProfile /> : <NavbarHome />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar