import React from "react";
import "./share.css";
import Alert from '../alert/Alert'

function ShareImageComponent({
  onInputChange,
  image,
  postImage,
  error,
  show,
  onChange,
  title,
  description,
}) {
  // console.log({title, description})
  return (
    <div className="share-container">
      <div className="share-img">
        <img alt={image} src={image} />
      </div>
      <form
        encType="multipart/form-data"
        className="share-form-container"
        onSubmit={(e) => postImage(e)}
      >
        {error && <Alert error={error} />}
        <div className="image-upload">
          {show && <input
            name="photo"
            type="file"
            id="formId"
            accept="image/*"
            onChange={onInputChange}
          />}
        </div>
        <input
          type="text"
          className="share-title"
          placeholder="Title ..."
          name="title"
          value={title}
          onChange={onChange}
        />

        <textarea
          type="text"
          className="share-description"
          placeholder="Image Description ..."
          name="description"
          value={description}
          onChange={onChange}
        />

        <button className="submit" type="submit">
          Share
        </button>
      </form>
    </div>
  );
}

export default ShareImageComponent;
