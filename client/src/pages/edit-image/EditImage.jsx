import React, { useEffect, useState } from 'react'
import HeaderProfile from '../../components/profile/HeaderProfile';
import Navbar from '../../components/navbar/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditImage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { photo } = useParams();
  const [photos, setPhotos] = useState([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  
  /**
   * Get The Current Image
   */
  useEffect(() => {
    myImages();
  }, []);

  const myImages = async () => {
    await axios
      .get(`/api/images/user_images`, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": user?.data.token,
        },
      })
      .then((res) => {
        setPhotos(res?.data);
      })
      .catch((err) => console.error(err.response.data.msg));
  };
  const current_photo = photos.find((p) => p._id === photo);
  // console.log(current_photo)
  const imageSrc = current_photo?.photo
    ? require(`../../assets/images/${current_photo.photo}`)
    : null;

  /**
   * Update Image Informations
   */
  const [image, setImage] = useState(imageSrc)
  const [imagePhoto, setImagePhoto] = useState(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  // console.log(imagePhoto?.name)
  useEffect(() => {
    if (current_photo) {
      setTitle(current_photo?.title || "");
      setDescription(current_photo?.description || "");
      setImage(imageSrc || "");
    }
  }, [current_photo, imageSrc]);

  // Handle Change Photo 
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setImagePhoto(e.target.files[0]);
    }
  };
  const updateImg = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (imagePhoto) {
      formData.append("photo", imagePhoto, imagePhoto?.name);
    }

    axios
      .post(`/api/images/user_images/${current_photo?._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-auth-token": user.data?.token,
        },
      })
      .then((res) => {
        setData(res.data);
        navigate("/");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="share-image">
      <HeaderProfile title="Edit Image" paragraphe="" />
      <Navbar />
      <div className="share-container">
        <div className="share-img">
          <img alt={image} src={image} />
        </div>
        <form 
          encType="multipart/form-data"
          className="share-form-container" 
          onSubmit={(e) => updateImg(e)}
        >
          <div className="image-upload">
          <input
            name="photo"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          </div>
          <input
            type="text"
            className="share-title"
            placeholder="Title ..."
            name="title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
          />

          <textarea
            type="text"
            className="share-description"
            placeholder="Image Description ..."
            name="description"
            value={description}
            onChange={e=>setDescription(e.target.value)}
          />

          <button className="submit" type="submit">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditImage