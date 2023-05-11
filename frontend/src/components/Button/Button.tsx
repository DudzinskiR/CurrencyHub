import React from 'react'
import "./button.scss"

interface props {
  text?: string,
  onClick?: () => void
}

const Button = ({ text, onClick }: props) => {
  return (
    <button className='button-box' onClick={onClick}>
      <div className="button-text">
        {text}
      </div>
    </button>
  )
}

export default Button