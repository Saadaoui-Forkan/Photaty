import React, { useEffect, useState } from "react";
import ImageCard from '../../components/views/ImageCard'
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import Spinner from "../../components/spinner/Spinner";

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [images, setImages] = useState([]);
  const [currUser, setCurrUser] = useState([])
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

  /**
   * Get Current User
   */
  useEffect(() => {
    getCurrentUser();
  }, []);
  const getCurrentUser = async () => {
    try {
      if (!user) {
        return;
      }
      const res = await axios.get(`api/users/me`,{
        headers: {
        "Content-Type": "application/json",
        "x-auth-token": user?.data?.token,
      }});
      setCurrUser(res?.data);
    } catch (error) {
      console.error(error);
    }
  };
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
                avatar={img?.user?.avatar}
                imageId={img._id}
                likes={img.likes}
                userId={currUser._id}
              />
            ))
          ) : (
            <Spinner/>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
