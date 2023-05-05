import React from 'react'
import './Loader.scss'

interface props {
  isLoading?: boolean,
  children?: React.ReactNode
}

const Loader = ({ isLoading, children }: props) => {
  return (
    <div className='loader-box'>
      {isLoading && <div className="loader-content">
        <div className="loader-text-background">
          <div className="loader-text">Ładowanie</div>
        </div>
      </div>}
      {children}
    </div>
  )
}

export default Loader