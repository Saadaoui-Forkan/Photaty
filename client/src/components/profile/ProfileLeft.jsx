import React from 'react'
import './profile.css'
import avatar from '../../assets/photaty/avatar-profile.png'
import { Link } from 'react-router-dom'

function ProfileLeft() {
  return (
    <div className='profile-left'>
        <img src={avatar} alt="" className="profile-avatar" />
        <p className='username'>Mahmoud</p>
        <div className="links">
            <Link to='/profile'className='profile-link'>
             <h3 className='link'>Profil</h3>
            </Link>
            <Link to='/'className='profile-link'>
              <h3 className='link'>Home</h3>
            </Link>
        </div>
    </div>
  )
}

export default ProfileLeft