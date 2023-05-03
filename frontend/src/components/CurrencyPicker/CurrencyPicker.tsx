import React, { useEffect, useState } from 'react'
import "./CurrencyPicker.scss"
import CountryFlag from '../CountryFlag/CountryFlag'
import { Currency } from '../../util/CurrencyData'
import { currencyData } from '../../util/CurrencyData'

interface props{
  countryCode?: string,
  onChange?: (currency: string) => void
}

const CurrencyPicker = (props: props) => {
  const [selectedCurrency, setCurrency] = useState<Currency>();
  const defaultCurrency = currencyData.find(item => item.CurrencyCode === "EUR");

  const FindCurrencyDataByCode = (countryCode?: string): Currency | undefined => {
    return currencyData.find(item => item.CurrencyCode === countryCode);
  }


  useEffect(() => {
    const newCurrency = FindCurrencyDataByCode(props.countryCode);

    setCurrency(newCurrency || defaultCurrency)
  }, [defaultCurrency, props.countryCode]);

  return (
    <div className='currency-picker-box'>
      <button className='currency-picker'>
        <div className="flag"><CountryFlag countryCode={selectedCurrency?.Country} size={40}/></div>
        <div className="currency-info">
          <div className="currency-code">{selectedCurrency?.CurrencyCode}</div>
          <div className="currency-name">{selectedCurrency?.CurrencyName}</div>
        </div>
      </button>
    </div>
  )
}

export default CurrencyPicker