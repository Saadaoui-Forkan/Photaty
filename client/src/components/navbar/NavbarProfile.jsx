import React from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'

function NavbarProfile() {
  return (
    <ul className="list">
      <Link className="a" to="/">
        <li>Home</li>
      </Link>
      {/* <Link className="a" to="/my-photos">
        <li>My Photos</li>
      </Link> */}
      <Link className="a" to="/profile">
        <li>Profile</li>
      </Link>
      {/* <Link className="a" to="/share-image">
        <li>Share Image</li>
      </Link> */}
      <Link className="a" to="/Login">
        <li>Logout</li>
      </Link>
    </ul>
  )
}

export default NavbarProfile