import React, { useEffect, useState } from 'react'
import HeaderProfile from '../../components/profile/HeaderProfile';
import Navbar from '../../components/navbar/Navbar';
import ShareImageComponent from '../../components/share/ShareImageComponent';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditImage() {
    const user = JSON.parse(localStorage.getItem('user'))
    const {photo} = useParams()
    const [photos, setPhotos] = useState([])
    const [updatedPhoto, setUpdatedPhoto] = useState({
      title: "",
      description: ""
    })
    const { title, description } = updatedPhoto
    const onChange = (e) => {
      setUpdatedPhoto({ ...updatedPhoto, [e.target.name]: e.target.value });
    };
    const navigate = useNavigate()

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
    const current_photo = photos.find(p=>p._id === photo)
    const imageSrc = current_photo?.photo
    ? require(`../../assets/images/${current_photo.photo}`)
    : null;

    /**
     * Update Image Informations
     */
    const updateImg = (e) => {
        e.preventDefault()
        axios
        .put(`/api/images/user_images/${current_photo._id}`, updatedPhoto, {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": user.data?.token,
          },
        })
        .then((res) => {
          setUpdatedPhoto(res.data) 
          navigate('/')
        })
        .catch((error) => console.error(error));
      
    }

    
  return (
    <div className='share-image'>
      <HeaderProfile
        title="Edit Image"
        paragraphe=""
      />
      <Navbar/>
      <ShareImageComponent
        // imageTitle={title}
        // setImageTitle={settitle}
        // imageDescription={description}
        // setImageDescription={setdescription}
        image={imageSrc}
        show={false}
        postImage={updateImg}
        onChange={onChange}
        title={title}
        description={description}
      />
    </div>
  );
}

export default EditImage