import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import axios from 'axios'
import ImageCard from '../../components/views/ImageCard'
import '../../components/views/views.css'
import { Link } from 'react-router-dom'

function MyPhotos() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [photos, setPhotos] = useState([]);

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
        setPhotos(res.data);
      })
      .catch((err) => console.log(err.response.data.msg));
  };

  /**
   * Remove An Image
   */
  const handleRemove = async (id) => {
    await axios
      .delete(`/api/images/user_images/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": user?.data.token,
        },
      })
      .then(() => {
        setPhotos(photos.filter((p) => p._id.toString() !== id.toString()));
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="container">
      <Navbar />
      <div className="menu-container">
        {photos.length == 0 ? (
          <div className="empty">
            <Link className="empty-link" to="/share-image">
              Share with us the best pictures.
            </Link>
          </div>
        ) : (
          photos.map((photo, index) => (
            <ImageCard
              key={index}
              photo={photo.photo}
              title={photo.title}
              author={photo.user.name}
              createdAt={photo.createdAt}
              avatar={photo.user.avatar}
              imageId={photo._id}
              likes={photo.likes}
              edit_remove={true}
              handleRemove={handleRemove}
              setPhotos={setPhotos}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default MyPhotos