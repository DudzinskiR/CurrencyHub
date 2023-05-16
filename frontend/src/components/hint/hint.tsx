import React from 'react'
import "./hint.scss"
import { ReactComponent as HintIcon } from './hint-icon.svg';

interface props {
  children?: React.ReactNode
}

const Hint = ({ children }: props) => {
  return (
    <div className='hint'>
      <HintIcon className='hint-icon' />
      <div className="hint-content">
        <div className="arrow"></div>
        {children}
      </div>
    </div>
  )
}

export default Hint