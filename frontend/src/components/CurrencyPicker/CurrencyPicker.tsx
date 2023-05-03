import React from 'react'
import "./CurrencyPicker.scss"
import CountryFlag from '../CountryFlag/CountryFlag'
import { Currency } from '../../util/CurrencyData'
import { currencyData } from '../../util/CurrencyData'

interface props{
  countryCode?: string,
  onChange?: (currency: string) => void
}

const CurrencyPicker = (props: props) => {


  const FindCurrencyDataByCode = (countryCode: string): Currency | undefined => {
    return currencyData.find(item => item.CurrencyCode === countryCode);
  }

  return (
    <div className='currency-picker-box'>
      <button className='currency-picker'>
        <div className="flag"><CountryFlag countryCode='GB' size={40}/></div>
        <div className="currency-info">
          <div className="currency-code">EUR</div>
          <div className="currency-name">euro</div>
        </div>
      </button>
    </div>
  )
}

export default CurrencyPicker