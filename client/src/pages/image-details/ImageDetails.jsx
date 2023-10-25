import React, { useEffect, useState } from 'react'
import './imageDetails.css'
import avatar from '../../assets/photaty/avatar-profile.png'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment'

function ImageDetails() {
  let { imgId } = useParams()
  // console.log(imgId)
  const [imageId, setImageId] = useState([]);
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
    <div className="image-details">
        <Link to='/' className='back'>
            <i className="fa-regular fa-hand-point-left"></i>
            Home
        </Link>
      <div className="image-container">
        <img
          src= {imageId.photo ? require(`../../assets/images/${imageId.photo}`) : "" }         
          alt={imageId.title}
          className="image"
        />
      </div>

      <div className="image-info-1">
        <div className="author">
          <div className="author-avatar">
            <img src={avatar} alt="" className="author-avatar-img" />
          </div>
          <h2 className="author-name">{imageId.user?.name}</h2>
        </div>
        <div className="likes">
          <div className="like">
            <i className="fa-regular fa-thumbs-up"></i>
            200
          </div>
          <div className="dislike">
            <i className="fa-regular fa-thumbs-down"></i>
          </div>
        </div>
      </div>

      <div className="image-details-info-2">
        <div className="date">
            <h2>Ceated at: {moment(imageId.date).format('DD-MM-YYYY')}</h2>
        </div>
        <div className="details">
            <p>{imageId.description}</p>
        </div>
      </div>

      <div className="comments">
        <div className="comments-number">
            <h2>23 comments</h2>
        </div>
        <div className="comment-input">
            <input type="text" placeholder='Add your comment ...'/>
            <button>Add a comment</button>
        </div>
        {/* <div className="all-comments">

        </div> */}
      </div>
    </div>
  );
}

export default ImageDetails