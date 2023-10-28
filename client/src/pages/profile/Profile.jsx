import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar';
import ProfileLeft from '../../components/profile/ProfileLeft';
import PhotoProfile from '../../components/profile/PhotoProfile';

function Profile() {
  return (
    <div className='profile'>
        <ProfileLeft/>
        <PhotoProfile/>
    </div>
  );
}

export default Profile