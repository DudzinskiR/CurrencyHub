import React from 'react'
import "./country-flag.scss"
import ReactCountryFlag from "react-country-flag"

interface props {
  countryCode?: string,
  size?: Number
}

const CountryFlag = ({ countryCode = "US", size = 40 }: props) => {
  return (
    <div className='country-flag-component' style={{ width: `${size}px` }}>
      <ReactCountryFlag
        countryCode={countryCode}
        svg
        style={{
          width: `${size}px`,
          height: `${size}px`,
          transform: 'scale(1.4)'
        }}
      />
    </div>
  )
}

export default CountryFlag