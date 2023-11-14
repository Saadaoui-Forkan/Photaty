import React, { useEffect, useState } from 'react'
import './imageDetails.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';
import PhotoDetails from '../../components/image-details/PhotoDetails';
import Spinner from '../../components/spinner/Spinner'

function ImageDetails() {
  const {imgId} = useParams()
  const [imageId, setImageId] = useState([])
  /**
   * Get all image by id
   */

  useEffect(() => {
    getImage();
  }, []);

  const getImage = async () => {
    try {
      const res = await axios.get(`/api/images/all/${imgId}`);
      setImageId(res.data);
      // console.log(res.data)
    } catch (error) {
      console.error(error.message)
    }
  };
  console.log(imageId)
  return (
    <>
      <Navbar />
      {imageId.photo ? <PhotoDetails imageId={imageId} /> : <Spinner />}
    </>
  );
}

export default ImageDetails