import React, { useState } from "react";
import moment from 'moment'
import avatar from '../../assets/photaty/avatar-profile.png'
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function PhotoDetails({ imageId }) {
  // console.log(imageId)
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [like, setLike] = useState([]);
  const [likes, setLikes] = useState(like.length);
  const user = JSON.parse(localStorage.getItem("user"));

  const imgDetailsSrc = imageId?.photo
    ? require(`../../assets/images/${imageId.photo}`)
    : "";
  const avatarSrc = imageId?.user?.avatar
    ? require(`../../assets/profile/${imageId.user.avatar}`)
    : avatar;
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
        setLikes(likes+1)
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
        setLikes(likes-1)
      })
      .catch((err) => setError(err.response.data.msg));
  };
  return (
    <div className="image-details">
      <div className="image-container">
        <img
          src={imgDetailsSrc}
          alt={imageId.title}
          className="image"
        />
      </div>

      <div className="image-info-1">
        <div className="author">
          <div className="author-avatar">
            <img src={avatarSrc} alt="" className="author-avatar-img" />
          </div>
          <h2 className="author-name">{imageId?.user?.name}</h2>
        </div>
        <div className="likes">
          <div className="like" onClick={() => likeImage(imageId._id)}>
            <i className="fa-regular fa-thumbs-up"></i>
            {likes === 0 ? "" : likes}
          </div>
          <div className="dislike" onClick={() => unLikeImage(imageId?._id)}>
            <i className="fa-regular fa-thumbs-down"></i>
          </div>
        </div>
      </div>

      <div className="image-details-info-2">
        <div className="date">
          <h2>Ceated at: {moment(imageId?.date).format("DD-MM-YYYY")}</h2>
        </div>
        <div className="details">
          <h2>{imageId?.title}</h2>
          <p>{imageId?.description}</p>
        </div>
      </div>
    </div>
  );
}

export default PhotoDetails