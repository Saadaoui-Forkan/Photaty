import React, { useEffect, useState } from "react";
import ImageContainer from "../../components/views/ImageContainer";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";

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
      console.log(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <ImageContainer 
        images={images} 
      />
    </>
  );
}

export default Home;
