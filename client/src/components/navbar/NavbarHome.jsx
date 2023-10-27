import React from "react";
import './navbar.css'
import { Link } from 'react-router-dom'

function NavbarHome() {
  return (
    <ul className="list">
      <Link className="a" to="/">
        <li>Home</li>
      </Link>
      <Link className="a" to="/Login">
        <li>Login</li>
      </Link>
      <Link className="a" to="/register">
        <li>Register</li>
      </Link>
    </ul>
  );
}

export default NavbarHome;
