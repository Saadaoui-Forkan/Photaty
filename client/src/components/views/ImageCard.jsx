import React, { useState, useEffect } from "react";
import './views.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment'
import axios from "axios";
import Alert from "../alert/Alert";
import defaultUser from "../../assets/photaty/avatar-profile.png"

function ImageCard(props) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [like, setLike] = useState([]);
  const {
    photo,
    title,
    author,
    createdAt,
    avatar,
    imageId,
    likes,
    edit_remove,
    handleRemove,
    userId,
  } = props;
  const user = JSON.parse(localStorage.getItem("user"));
  const imgSrc = photo && require(`../../assets/images/${photo}`);
  const avatarSrc = avatar
    ? require(`../../assets/profile/${avatar}`)
    : defaultUser;
  const [numLikes, setNumLikes] = useState(likes?.length);
  const [buttonColor, setButtonColor] = useState(false);

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
        setButtonColor(res.data.likes.some((item) => item.user === userId));
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
    const isLiked = likes.filter((item) => item.user === userId);
    setButtonColor(isLiked.length > 0);
  };

  useEffect(() => {
    handleLikedColor();
  }, [likes, userId]);
  return (
    <div className="menu">
      {edit_remove ? (
        <>
          <div className="delete change" onClick={() => handleRemove(imageId)}>
            <i className="fa-solid fa-trash"></i>
          </div>
          <div className="edit change">
            <Link to={`/edit-photo/${imageId}`}>
              <i className="fa-solid fa-pen-to-square"></i>
            </Link>
          </div>
        </>
      ) : (
        ""
      )}
      <div className="menu-img">
        <img src={imgSrc} alt={`${title}`} className="img" />
        <span className="read-more">
          <Link to={`/${imageId}`}>
            <i className="fa-regular fa-square-plus"></i>
          </Link>
        </span>
      </div>
      <div className="menu-description">
        <img src={avatarSrc} alt="avatar" className="avatar" />
        <div className="menu-info">
          <h3 className="title">{title}</h3>
          <p className="date">
            created by: <span>{author}</span> at:
            <span>{moment(createdAt).format("DD-MM-YYYY")}</span>
          </p>
        </div>
      </div>

      <div className="menu-like">
        <div
          className={buttonColor ? "like isLike" : "like"}
          onClick={() => {
            handleLikeImage(imageId);
          }}
        >
          <i className="fa-regular fa-thumbs-up"></i>
        </div>
        {numLikes === 0 ? "" : <div className="dislike">{numLikes}</div>}
      </div>
    </div>
  );
}

export default ImageCard