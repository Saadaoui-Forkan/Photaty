import React from 'react'
import './footer.css'

function Footer() {
  return (
    <p className="footer">
      &copy;{new Date().getFullYear()} Photaty | All rights reserved | Terms
      Of Service | Privacy
    </p>
  );
}

export default Footer