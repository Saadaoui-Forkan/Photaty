import React from 'react'
import { Link } from 'react-router-dom'

function EmptyProfile() {
  return (
    <div className="empty">
        <h1 className='empty-title'>
            Share with us the best pictures.
        </h1>
        <Link to='/share-image'className="empty-link">
            Share Now
        </Link>
    </div>
  )
}

export default EmptyProfile