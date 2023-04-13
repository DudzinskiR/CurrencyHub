import React from 'react'
import "./CurrencyPicker.scss"
import CountryFlag from '../CountryFlag/CountryFlag'

const CurrencyPicker = () => {
  return (
    <div className='currency-picker-box'>
        <button>
            <div className="flag"><CountryFlag countryCode='GB' size={40}/></div>
            <div className="currency-code">PLN</div>
            <div className="currency-name">Złoty</div>
        </button>
    </div>
  )
}

export default CurrencyPicker