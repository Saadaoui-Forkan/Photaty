import React from "react";
import "./notFound.css";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <h1>404 Error Page </h1>
      <section className="error-container">
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
        <span className="zero">
          <span className="screen-reader-text">0</span>
        </span>
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
      </section>
      <div className="link-container">
        <Link to="/" className="more-link">
          Go Back
        </Link>
      </div>
    </>
  );
}

export default NotFound;
