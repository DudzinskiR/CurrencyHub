import React from 'react'
import "./Header.scss"

interface props {
  text: string
}
const Header = ({text}: props) => {
  return (
    <div className="header-component">
      <div className="left-line"></div>
    </div>
  )
}

export default Header