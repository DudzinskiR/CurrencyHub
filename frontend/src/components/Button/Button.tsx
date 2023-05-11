import React from 'react'
import "./button.scss"

interface props {
  text?: string,
  onClick?: () => void
}

const Button = (props: props) => {
  return (
    <button className='button-box' onClick={props.onClick}>
      <div className="button-text">
        {props.text}
      </div>
    </button>
  )
}

export default Button