import React, { useState, useEffect } from "react";
import moment from 'moment'
import avatar from '../../assets/photaty/avatar-profile.png'
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function PhotoDetails({ imageId }) {
  // console.log(imageId)
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [like, setLike] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [numLikes, setNumLikes] = useState(imageId.likes?.length);
  const [buttonColor, setButtonColor] = useState(false);

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
      })
      .catch((err) => {
        setError(err.response.data.msg);
        setTimeout(() => {
          setError(null);
        }, 1500);
      });
  };

  /**
   * Handle Change Icon Color
   */
  const handleLikedColor = () => {
    const isLiked = imageId.likes.filter((item) => item.user === imageId._id);
    setButtonColor(isLiked.length > 0);
  };

  useEffect(() => {
    handleLikedColor();
  }, [imageId.likes, imageId._id]);

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
            setButtonColor(!buttonColor)
          }}
        >
          <i className="fa-regular fa-thumbs-up"></i>
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