import React, { useEffect, useState } from 'react'
import './imageDetails.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';
import PhotoDetails from '../../components/image-details/PhotoDetails';
import Spinner from '../../components/spinner/Spinner'

function ImageDetails() {
  const user = JSON.parse(localStorage.getItem("user"));
  const {imgId} = useParams()
  const [imageId, setImageId] = useState([])
  const [currUser, setCurrUser] = useState([])
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
    } catch (error) {
      console.error(error.message)
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
      {imageId.photo ? (
        <PhotoDetails 
          imageId={imageId} 
          user={user} 
          userId={currUser._id} 
        />
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default ImageDetails