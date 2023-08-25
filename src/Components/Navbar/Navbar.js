import React from 'react'
import "./Navbar.css"
function Navbar() {
  return (
    <div className='nav'>
      <img style={{"width":"250px","mixBlendMode":"color-burn"}} src='logo.png'/>
      <div className='elements'>
        <h4>abc</h4>
        <h4>xyz</h4>
      </div>
    </div>
  )
}

export default Navbar
