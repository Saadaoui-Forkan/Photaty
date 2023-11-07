import React, { useEffect, useState } from "react";
import ImageCard from '../../components/views/ImageCard'
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { Link } from 'react-router-dom'

function Home() {
  const [images, setImages] = useState([]);
  /**
   * Get all images
   */
  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    try {
      const res = await axios.get(`/api/images/all`);
      setImages(res?.data);
    } catch (error) {
      console.error(error);
    }
  };
  // console.log(images)
  return (
    <>
      <Navbar />

      <div className="container">
        <div className="menu-container">
          {images.length !== 0 ? (
            images.map((img, index) => (
              <ImageCard
                key={index}
                photo={img.photo}
                title={img.title}
                author={img.user.name}
                createdAt={img.createdAt}
                avatar={img.user.avatar}
                imageId={img._id}
                likes={img.likes}
              />
            ))
          ) : (
            <div className="empty">
              <h2>
                Welcome to the Photaty app. Be the first to share with us the
                best photos
              </h2>
              <Link className="empty-link" to="/register">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
