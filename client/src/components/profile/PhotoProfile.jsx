import React, {useEffect, useState} from 'react'
import './profile.css'
import HeaderProfile from './HeaderProfile'
import axios from 'axios'
import Alert from '../alert/Alert';
import avatar from '../../assets/photaty/avatar-profile.png'

function PhotoProfile() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [profileAvatar, setProfileAvatar] = useState(null)
    const [profileImage, setProfileImage] = useState(avatar)
    const [data, setData] = useState([])
    const [name, setName] = useState("")
    const [bio, setBio] = useState("")
    const [status, setStatus] = useState("")
    const [error, setError] = useState("")

    const handleFileChange = (e) => {
      if (e.target.files && e.target.files[0]) {
        setProfileImage(URL.createObjectURL(e.target.files[0]));
        setProfileAvatar(e.target.files[0]);
      }
    };

    const handleSave = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', name)
        formData.append('bio', bio)
        formData.append('status', status)
        if (profileImage) {
          formData.append('avatar', profileAvatar, profileAvatar.name)
        }
      axios
      .post("/api/users/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-auth-token": user.data?.token,
        },
      })
      .then((res) => {
        setData(res.data)
      })
      .catch((error) => setError(error.response.data.msg));
    };

  return (
    <div className="photo-profile">
      <HeaderProfile
        title="Public profile"
        paragraphe="Add information about yourself."
      />
      <div className="photo-profile-img">
        <img alt="" src={profileImage}/>
      </div>
      <form 
        encType="multipart/form-data" 
        className='form-container' 
        onSubmit={handleSave}
      >
        {error && <Alert error={error}/>}
        <input
          className="photo-profile-input"
          type="file"
          name="avatar"
          accept="image/*"
          onChange={handleFileChange}
        />
        <input 
          type="text" 
          className="profile-iput-info" 
          placeholder="name"
          value={name}
          name="name"
          onChange={(e)=> setName(e.target.value)}
          required
        />

        <input 
          type="text" 
          className="profile-iput-info" 
          placeholder="bio"
          value={bio}
          name="bio"
          onChange={(e)=> setBio(e.target.value)} 
        />

        <input 
          type="text" 
          className="profile-iput-info" 
          placeholder="status" 
          value={status}
          name="status"
          onChange={(e)=> setStatus(e.target.value)}
        />

        <button className="submit" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}

export default PhotoProfile