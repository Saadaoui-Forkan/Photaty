import React, { useState, useEffect } from 'react'
import PhotoProfile from '../../components/profile/PhotoProfile';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'))
  const [profile, setProfile] = useState([])
  const [err, setErr] = useState('')

  useEffect(() => {
    getMe()
  }, [])
  
  const getMe = async() => {
      await axios.get('/api/users/me', {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': user?.data?.token
        }})
      .then(res => setProfile(res.data))
      .catch(err => setErr(err.response.data.msg))
  }
  return (
    <div className='profile'>
      <Navbar/>
      <PhotoProfile profile={profile}/>
    </div>
  );
}

export default Profile