import React from 'react'
import './profile.css'

function Profile() {
  return (
    <div className="profile">
        <div className="user-info">
            <div className="user-img">
            <img src="" alt="" />
            <i className="fa-solid fa-user-pen"></i>
            </div>
            <div className="user-status">
            <div className="status">
                <h2 className="header-status">
                status{" "}
                <span>
                    <i className="fa-solid fa-pen"></i>
                </span>
                </h2>
                <input type="text" className="input-status" placeholder="status" />
            </div>
            <h2 className="header-bio">
                bio{" "}
                <span>
                <i className="fa-solid fa-pen"></i>
                </span>
            </h2>
            <input type="text" className="input-bio" placeholder="bio" />
            </div>
        </div>
        
    </div>
  );
}

export default Profile