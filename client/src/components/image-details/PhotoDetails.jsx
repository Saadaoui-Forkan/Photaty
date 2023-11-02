import React, {  useEffect, useState } from "react";
import moment from 'moment'
import avatar from '../../assets/photaty/avatar-profile.png'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

function PhotoDetails({ imageId }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [like, setLike] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  /**
   * Like An Image
   */
  const likeImage = async (id) => {
    if (!user) {
      navigate("/login");
      return;
    }

    await axios
      .put(`/api/images/like/${id}`, like, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": user.data.token,
        },
      })
      .then((res) => {
        setLike(res.data);
      })
      .catch((err) => setError(err.response.data.msg));
  };

  /**
   * Unlike An Image
   */
  const unLikeImage = async (id) => {
    if (!user) {
      navigate("/login");
      return;
    }

    await axios
      .put(`/api/images/unlike/${id}`, like, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": user.data.token,
        },
      })
      .then((res) => {
        setLike(res.data);
      })
      .catch((err) => setError(err.response.data.msg));
  };
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
        {/* {modify && <Modify/>} */}
      </div>

      <div className="image-info-1">
        <div className="author">
          <div className="author-avatar">
            <img src={avatar} alt="" className="author-avatar-img" />
          </div>
          <h2 className="author-name">{imageId.user?.name}</h2>
        </div>
        <div className="likes">
          <div className="like" onClick={() => likeImage(imageId._id)}>
            <i className="fa-regular fa-thumbs-up"></i>
            {imageId.likes?.length === 0 ? "" : imageId.likes?.length}
          </div>
          <div className="dislike" onClick={() => unLikeImage(imageId._id)}>
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