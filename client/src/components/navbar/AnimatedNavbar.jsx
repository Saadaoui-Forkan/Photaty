import React, { useState } from 'react'

function AnimatedNavbar() {
    const [visible, setVisible] = useState(false);
    const visibleNav = () => {
      setVisible(!visible);
    };

    
  return (
    <div>AnimatedNavbar</div>
  )
}

export default AnimatedNavbar