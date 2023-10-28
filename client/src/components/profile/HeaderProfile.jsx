import React from 'react'
import './profile.css'

function HeaderProfile({title, paragraphe}) {
  return (
    <div className='header-profile'>
        <h1 className="header-profile-title">{title}</h1>
        <p className="header-profile-paragraphe">{paragraphe}</p>
    </div>
  )
}

export default HeaderProfile