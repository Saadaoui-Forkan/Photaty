import React from 'react'
import logo from'../../assets/photaty/logo.png'

function Header() {
  return (
    <div className="header">
      <img src={logo} alt="logo" className="header-img" />
      <div className="header-search">
        <input
          className="header-search-input"
          type="search"
          placeholder="Search in photaty..."
        />
        <div className="span-icon">
            <i className="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
    </div>
  );
}

export default Header