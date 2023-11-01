import React, { useEffect, useState } from 'react'
import HeaderProfile from '../../components/profile/HeaderProfile'
import Navbar from '../../components/navbar/Navbar'
import ShareImageComponent from '../../components/share/ShareImageComponent'
import axios from "axios";

function ShareImage() {
  const [error, setError] = useState("")
  const [avatar, setAvatar] = useState(null)
  const [image, setImage] = useState(null)
  const [imageTitle, setImageTitle] = useState("");
  const [imageDescription, setImageDescription] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const onInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setAvatar(e.target.files[0]);
    }
  };
  /**
   * Post Image
   */
  // useEffect(()=>{
  //   postImage()
  // }, [])
  const postImage = (e) => {
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
          return res?.data
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
            show={true}
        />
    </div>
  )
}

export default ShareImage