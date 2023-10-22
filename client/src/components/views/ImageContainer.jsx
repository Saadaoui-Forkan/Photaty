import React from 'react'
import './views.css'
import ImageCard from './ImageCard'

function ImageContainer() {
  return (
    <div className="container">
        <h3 className="headeing">Photaty</h3>
        <div className="menu-container">
            <ImageCard />
            <ImageCard />
            <ImageCard />
            <ImageCard />
            <ImageCard />
        </div>

    </div>
  )
}

export default ImageContainer