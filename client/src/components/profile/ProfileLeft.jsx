import React from 'react'
import './profile.css'
import avatar from '../../assets/photaty/avatar-profile.png'
import { Link } from 'react-router-dom'

function ProfileLeft({profile}) {
  // const avatarSrc = profile?.avatar ? require(`../../assets/profile/${profile.avatar}`) : require(`../../assets/profile/${profile.avatar?.url}`);
  // console.log(profile)
  return (
    <div className='profile-left'>
        <img src={avatar} alt="" className="profile-avatar" />
        <p className='username'>{profile.name}</p>
        <p className='username'>{profile?.bio}</p>
        <p className='username'>{profile?.status}</p>
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