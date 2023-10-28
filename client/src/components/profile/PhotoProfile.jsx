import React, {useState} from 'react'
import './profile.css'
import HeaderProfile from './HeaderProfile'
import axios from 'axios'

function PhotoProfile() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [imageSrc, setImageSrc] = useState(''); 
    const [name, setName] = useState("")
    const [bio, setBio] = useState("")
    const [status, setStatus] = useState("")
    const [error, setError] = useState("")

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageUrl = event.target.result;
          setImageSrc(imageUrl);
        }
        reader.readAsDataURL(file);
      }
    };

    const handleSave = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', name)
        formData.append('bio', bio)
        formData.append('status', status)
        if (imageSrc) {
            formData.append('image', imageSrc)
        }
      axios
      .post("/api/users/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-auth-token": user.data?.token,
        },
      })
      .then((res) => {
        console.log(res.data)
      })
      .catch((error) => console.log(error.response.data.msg));
    };

  return (
    <div className="photo-profile">
      <HeaderProfile
        title="Public profile"
        paragraphe="Add information about yourself."
      />
      <div className="photo-profile-img">
        <img alt="" src={imageSrc}/>
      </div>
      <form encType="multipart/form-data" className='form-container' onSubmit={handleSave}>
        <input
          className="photo-profile-input"
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
        />
        <input 
          type="text" 
          className="profile-iput-info" 
          placeholder="name" 
          required
          value={name}
          name="name"
          onChange={(e)=> setName(e.target.value)}
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