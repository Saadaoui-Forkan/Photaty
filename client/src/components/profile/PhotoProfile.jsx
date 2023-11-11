import React, {useEffect, useState} from 'react'
import './profile.css'
import HeaderProfile from './HeaderProfile'
import axios from 'axios'
import Alert from '../alert/Alert';
import avatar from '../../assets/photaty/avatar-profile.png'
import { useNavigate } from 'react-router-dom';

function PhotoProfile({ profile }) {
  const user = JSON.parse(localStorage.getItem("user"));
  let profilePhoto = profile?.avatar
    ? require(`../../assets/profile/${profile.avatar}`)
    : avatar;
  const [profileAvatar, setProfileAvatar] = useState(null);
  let [profileImage, setProfileImage] = useState(profilePhoto);
  const [data, setData] = useState([]);
  let [name, setName] = useState("");
  let [bio, setBio] = useState("");
  let [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //Appear Old User Data Inside Input Fields
  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setBio(profile.bio || "");
      setStatus(profile.status || "");
      setProfileImage(profilePhoto);
    }
  }, [profile]);

  // Handle Change Photo Profile
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
      setProfileAvatar(e.target.files[0]);
    }
  };

  // Updata User Data
  const handleSave = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);
    formData.append("status", status);
    if (profileAvatar) {
      formData.append("avatar", profileAvatar, profileAvatar?.name);
    }
    
    axios
      .post("/api/users/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-auth-token": user.data?.token,
        },
      })
      .then((res) => {
        setData(res.data);
        navigate("/");
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
        <img alt="" src={profileImage} />
      </div>
      <form
        encType="multipart/form-data"
        className="form-container"
        onSubmit={handleSave}
      >
        {error && <Alert error={error} />}
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
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          className="profile-iput-info"
          placeholder="bio"
          value={bio}
          name="bio"
          onChange={(e) => setBio(e.target.value)}
          required
        />

        <input
          type="text"
          className="profile-iput-info"
          placeholder="status"
          value={status}
          name="status"
          onChange={(e) => setStatus(e.target.value)}
          required
        />

        <button className="submit" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}

export default PhotoProfile