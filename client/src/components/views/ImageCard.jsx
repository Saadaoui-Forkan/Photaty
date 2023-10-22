import React from 'react'
import './views.css'
import { Link } from 'react-router-dom';

function ImageCard() {
  return (
    <div className="menu">
      <div className="menu-img">
        <img
          src="https://media.istockphoto.com/id/1225514613/photo/man-relaxed-writing-and-working-with-digital-mobile-smart-phone-laptop-computer-with-coffee.jpg?s=1024x1024&w=is&k=20&c=oaT0wkc9HyBTsok1zFVXdKiGdWrxaxpE6z8xyEbM46o="
          alt="imag"
          className="img"
        />
        <span className="read-more">
            <Link to='/imageDetails'><i className="fa-regular fa-square-plus"></i></Link>
        </span>
      </div>
      <div className="menu-description">
        <img
          src="https://cdn.pixabay.com/photo/2017/02/25/22/04/user-icon-2098873_1280.png"
          alt="avatar"
          className="avatar"
        />
        <div className="menu-info">
          <h3 className="title">Image Title</h3>
          <p className="date">00-00-0000</p>
        </div>
      </div>

      <div className="menu-like">
        <div className="like">
          <i className="fa-regular fa-thumbs-up"></i>
          200
        </div>
        <div className="dislike">
          <i className="fa-regular fa-thumbs-down"></i>
        </div>
      </div>
    </div>
  );
}

export default ImageCard