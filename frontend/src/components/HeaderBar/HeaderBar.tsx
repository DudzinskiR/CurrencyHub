import React from 'react'
import "./HeaderBar.scss"

const HeaderBar = () => {
  return (
    <div className='header-bar-box'>
      <div className="header-bar-shadow"><div className="header-bar-1"></div></div>
      <div className="header-bar-shadow"><div className="header-bar-2"></div></div>
      <div className="title">Walutownik</div>
    </div>
  )
}

export default HeaderBar