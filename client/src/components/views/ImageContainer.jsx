import React from 'react'
import './views.css'
import ImageCard from './ImageCard'
import Header from './Header'

function ImageContainer({images}) {
  // console.log(images)
  return (
    <div className="container">
      <Header/>
        <div className="menu-container">
          {
            images.map((img, index)=>(
              <ImageCard 
                key={index}
                photo={img.photo}
                title={img.title}
                author={img.user.name}
                createdAt={img.createdAt}
                avatar={img.user.avatar.url}
              />
            ))
          }
        </div>

    </div>
  )
}

export default ImageContainer