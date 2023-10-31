import React from 'react'
import HeaderProfile from '../../components/profile/HeaderProfile';
import Navbar from '../../components/navbar/Navbar';
import ShareImageComponent from '../../components/share/ShareImageComponent';

function EditImage() {
  return (
    <div className='share-image'>
      <HeaderProfile
        title="Edit Image"
        paragraphe=""
      />
      <Navbar/>
      <ShareImageComponent/>
    </div>
  );
}

export default EditImage