import React from 'react'
import './Loader.scss'

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
          <div className="loader-text">Ładowanie</div>
        </div>
      </div>}

      {isError && <div className="loader-content">
        <div className="loader-text-background">
          <div className="loader-error-text">Błąd</div>
        </div>
      </div>}

      {children}
    </div>
  )
}

export default Loader