import React, {useState} from 'react'
import './navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import defaultAvatar from '../../assets/photaty/avatar-profile.png'

function NavbarProfile({ me}) {
  const [visible, setVisible] = useState(false);
  const visibleNav = () => {
    setVisible(!visible);
  };
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user")
    setVisible(false)
    navigate('/login')
  }
  const avatarSrc = me?.avatar
    ? require(`../../assets/profile/${me.avatar}`)
    : defaultAvatar;
  
  return (
    <div className="nav-profile">
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
              <img src={avatarSrc} alt="Logo" className="profile-img" />
            </div>
              <div className="user-description">
                <h3 className="user-info">{me?.name}</h3>
                <h3 className="user-info">{me?.bio}</h3>
                <h3 className="user-info">{me?.status}</h3>
              </div>
            <ul className="list">
              <Link className="a" to="/my-photos">
                <li>My Photos</li>
              </Link>
              <Link className="a" to="/profile">
                <li>Edit Profile</li>
              </Link>
              <Link className="a" to="/share-image">
                <li>Share Image</li>
              </Link>
              <div className="a" onClick={logout}>
                <li>Logout</li>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavbarProfile