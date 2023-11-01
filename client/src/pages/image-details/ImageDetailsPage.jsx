import React, { useEffect, useState } from 'react'
import './imageDetails.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';
import PhotoDetails from '../../components/image-details/PhotoDetails';

function ImageDetails() {
  const {imgId} = useParams()
  const [imageId, setImageId] = useState([])
  /**
   * Get all image by id
   */

  useEffect(() => {
    getImage();
  }, [imageId]);

  const getImage = async () => {
    try {
      const res = await axios.get(`/api/images/all/${imgId}`);
      setImageId(res?.data);
    } catch (error) {
      console.log(error.message)
    }
  };

  return (
    <>
      <Navbar />
      <PhotoDetails 
        imageId={imageId}
      />
    </>
  );
}

export default ImageDetails