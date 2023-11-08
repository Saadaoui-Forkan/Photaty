import React from 'react'
import './navbar.css'
import { Link, useNavigate } from 'react-router-dom'

function NavbarProfile({setVisible}) {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user")
    setVisible(false)
    navigate('/')
  }
  return (
    <ul className="list">
      <Link className="a" to="/">
        <li>Home</li>
      </Link>
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
        <li >Logout</li>
      </div>
    </ul>
  )
}

export default NavbarProfile