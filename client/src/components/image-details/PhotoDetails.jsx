import React from 'react'
import moment from 'moment'
import Modify from '../../components/modify/Modify';
import avatar from '../../assets/photaty/avatar-profile.png'

function PhotoDetails({ imageId }) {
  return (
    <div className="image-details">
      <div className="image-container">
        <img
          src={
            imageId.photo ? require(`../../assets/images/${imageId.photo}`) : ""
          }
          alt={imageId.title}
          className="image"
        />
        <Modify />
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
          <h2>Ceated at: {moment(imageId.date).format("DD-MM-YYYY")}</h2>
        </div>
        <div className="details">
          <h2>{imageId.title}</h2>
          <p>{imageId.description}</p>
        </div>
      </div>
    </div>
  );
}

export default PhotoDetails