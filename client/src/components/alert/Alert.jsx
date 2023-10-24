import React from 'react'
import './alert.css'

function Alert({error}) {
  return (
    <div className="alert">
        <i className="fa-solid fa-circle-exclamation"></i>
        <h3>{error}</h3>
    </div>
  )
}

export default Alert