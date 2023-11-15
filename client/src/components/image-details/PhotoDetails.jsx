import React, { useState, useEffect } from "react";
import moment from 'moment'
import avatar from '../../assets/photaty/avatar-profile.png'
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function PhotoDetails({ imageId, user, userId }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [like, setLike] = useState([]);
  const [numLikes, setNumLikes] = useState(imageId.likes?.length);
  const [buttonColor, setButtonColor] = useState(imageId.likes.some((item) => item.user === userId));
  const imgDetailsSrc = imageId?.photo
    ? require(`../../assets/images/${imageId.photo}`)
    : "";
  const avatarSrc = imageId?.user?.avatar
    ? require(`../../assets/profile/${imageId.user.avatar}`)
    : avatar;
  /**
   * HandleLike An Image
   */
  const handleLikeImage = async (id) => {
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
        setNumLikes(res.data.likes.length);
        setButtonColor(prevBtn => !prevBtn);
      })
      .catch((err) => {
        setError(err.response.data.msg);
        setTimeout(() => {
          setError(null);
        }, 1500);
      });
  };
  
  useEffect(() => {
    setButtonColor(imageId.likes.some((item) => item.user === userId));
  }, [imageId.likes, userId]);

  return (
    <div className="image-details">
      <div className="image-container">
        <img src={imgDetailsSrc} alt={imageId.title} className="image" />
      </div>

      <div className="image-info-1">
        <div className="author">
          <div className="author-avatar">
            <img src={avatarSrc} alt="" className="author-avatar-img" />
          </div>
          <h2 className="author-name">{imageId?.user?.name}</h2>
        </div>
        <div className="likes">
          <div
            className={buttonColor ? "like isLiked" : "like"}
            onClick={() => {
              handleLikeImage(imageId._id);
            }}
          >
            <i className="fa-solid fa-thumbs-up"></i>
          </div>
          {numLikes === 0 ? "" : <div className="dislike">{numLikes}</div>}
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