import React, {useState, useEffect} from 'react'
import './alert.css'

function Alert({error, setError}) {
  useEffect(() => {
    if (error.length !== 0) {
      setTimeout(() => {
        setError('');
      }, 2500);
    }
  }, [error]);
  return (
    <div className="alert">
        <i className="fa-solid fa-circle-exclamation"></i>
        <h3>{error}</h3>
    </div>
  )
}

export default Alert