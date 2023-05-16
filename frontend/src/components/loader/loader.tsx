import React from 'react'
import './loader.scss'

interface props {
  isLoading?: boolean,
  isError?: boolean
  children?: React.ReactNode
}

const Loader = ({ isLoading, isError, children }: props) => {
  return (
    <div className='loader-box'>
      {isLoading && !isError && <div className="loader-content">
        <div className="loader-text-background">
          <div className="loader-text">Loading</div>
        </div>
      </div>}

      {isError && <div className="loader-content">
        <div className="loader-text-background">
          <div className="loader-error-text">Error</div>
        </div>
      </div>}

      {children}
    </div>
  )
}

export default Loader