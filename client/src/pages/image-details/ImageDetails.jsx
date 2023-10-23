import React from 'react'
import './imageDetails.css'
import avatar from '../../assets/photaty/avatar-profile.png'
import { Link } from 'react-router-dom';

function ImageDetails() {
  return (
    <div className="image-details">
        <Link to='/' className='back'>
            <i className="fa-regular fa-hand-point-left"></i>
            Home
        </Link>
      <div className="image-container">
        <img
          src="https://wallpapers.com/images/hd/hd-river-in-the-mountains-kgb9wrcm1wmrfa5m.jpg"
          alt=""
          className="image"
        />
      </div>

      <div className="image-info-1">
        <div className="author">
          <div className="author-avatar">
            <img src={avatar} alt="" className="author-avatar-img" />
          </div>
          <h2 className="author-name">Author</h2>
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
            <h2>Ceated at: 12-34-5678</h2>
        </div>
        <div className="details">
            <p>
                Lorem ipsum dolor sit, 
                amet consectetur adipisicing elit. 
                Fugiat quos exercitationem qui odio 
                esse magni non neque a. At, adipisci!
            </p>
        </div>
      </div>

      <div className="comments">
        <div className="comments-number">
            <h2>23 comments</h2>
        </div>
        <div className="comment-input">
            <input type="text" placeholder='Add your comment ........'/>
            <button>Add a comment</button>
        </div>
        {/* <div className="all-comments">

        </div> */}
      </div>
    </div>
  );
}

export default ImageDetails