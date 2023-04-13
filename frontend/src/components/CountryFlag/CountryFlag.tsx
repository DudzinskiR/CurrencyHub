import React from 'react'
import "./CountryFlag"

interface props {
    countryCode?: string,
    size?: Number
}

const CountryFlag = ({countryCode = "US", size = 40}: props) => {
  return (
    <div>CountryFlag</div>
  )
}

export default CountryFlag