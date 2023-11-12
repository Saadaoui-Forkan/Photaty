import React from "react";
import "./share.css";
import Alert from '../alert/Alert'

function ShareImageComponent({
  onInputChange,
  image,
  postImage,
  error,
  show,
  imageDescription,
  imageTitle,
  setImageTitle,
  setImageDescription
}) {
  // console.log({imageDescription}, {imageTitle})
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
          <input
            name="photo"
            type="file"
            id="formId"
            accept="image/*"
            onChange={onInputChange}
          />
        </div>
        <input
          type="text"
          className="share-title"
          placeholder="Title ..."
          name="title"
          value={imageTitle}
          onChange={(e)=>setImageTitle(e.target.value)}
        />

        <textarea
          type="text"
          className="share-description"
          placeholder="Image Description ..."
          name="description"
          value={imageDescription}
          onChange={(e)=>setImageDescription(e.target.value)}
        />

        <button className="submit" type="submit">
          Share
        </button>
      </form>
    </div>
  );
}

export default ShareImageComponent;
