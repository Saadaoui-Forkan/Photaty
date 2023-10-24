import React from 'react'
import './views.css'
import { Link } from 'react-router-dom';
import moment from 'moment'

function ImageCard(props) {
  const {photo, title, author, createdAt, avatar} = props
  console.log(author)
  return (
    <div className="menu">
      <div className="menu-img">
        <img
          src= {require(`../../assets/images/${photo}`)}
          alt={`${title}`}
          className="img"
        />
        <span className="read-more">
            <Link to='/image'><i className="fa-regular fa-square-plus"></i></Link>
        </span>
      </div>
      <div className="menu-description">
        <img
          src={avatar}
          alt="avatar"
          className="avatar"
        />
        <div className="menu-info">
          <h3 className="title">{title}</h3>
          <p className="date">
            created by: <span>{author}</span> at:<span>{moment(createdAt).format('DD-MM-YYYY')}</span>
          </p>
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