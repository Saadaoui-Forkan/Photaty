import React, { useEffect, useState } from 'react'
import HeaderProfile from '../../components/profile/HeaderProfile'
import Navbar from '../../components/navbar/Navbar'
import ShareImageComponent from '../../components/share/ShareImageComponent'
import axios from "axios";
import logo from '../../assets/photaty/logo.png'
import { useNavigate } from 'react-router-dom';

function ShareImage() {
  const [data, setData] = useState([])
  const [error, setError] = useState("")
  const [avatar, setAvatar] = useState(null)
  const [image, setImage] = useState(logo)
  const [imageTitle, setImageTitle] = useState("");
  const [imageDescription, setImageDescription] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate()

  const onInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setAvatar(e.target.files[0]);
    }
  };
  /**
   * Post Image
   */
  const postImage = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("title", imageTitle);
    formData.append("description", imageDescription);
      if (image) {
        formData.append('photo', avatar, avatar.name)
      }
      axios
        .post("/api/images/new_image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token": user.data?.token,
          },
        })
        .then((res) => {
          setData(res.data) 
          navigate('/')
        })
        .catch((error) => setError(error.response.data.errors[0].msg));
  };
  return (
    <div className='share-image'>
        <HeaderProfile
            title = "Share Image"
            paragraphe = "Share with us the best pictures."
        />
        <Navbar/>
        <ShareImageComponent
            onInputChange={onInputChange}
            image={image}
            postImage={postImage}
            imageTitle={imageTitle}
            imageDescription={imageDescription}
            setImageTitle={setImageTitle}
            setImageDescription={setImageDescription}
            error={error}
        />
    </div>
  )
}

export default ShareImage