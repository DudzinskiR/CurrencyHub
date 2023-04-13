import React from 'react'
import "./CurrencyPicker"
import CountryFlag from '../CountryFlag/CountryFlag'

const CurrencyPicker = () => {
  return (
    <div className='currency-picker-box'>
        <button>
            <div className="flag"><CountryFlag countryCode='GB' size={40}/></div>
        </button>
    </div>
  )
}

export default CurrencyPicker