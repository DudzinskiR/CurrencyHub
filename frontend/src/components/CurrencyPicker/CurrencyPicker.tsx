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

  const [inputText, setInputText] = useState<string>("");
  const [selectedCurrency, setCurrency] = useState<Currency>();
  const [filteredCurrency, setFilteredCurrency] = useState<Currency[]>([]);
  const [isOpen, setOpen] = useState<boolean>(false);

  const defaultCurrency = currencyData.find(item => item.CurrencyCode === "EUR");

  const findCurrencyDataByCode = (countryCode?: string): Currency | undefined => {
    return currencyData.find(item => item.CurrencyCode === countryCode);
  }

  const toggleList = () => {
    setOpen(!isOpen);
  }

  const checkCurrency = (text: string, currency: Currency) => {
    return currency.Country.toUpperCase().startsWith(text.toUpperCase())
        || currency.CurrencyCode.toUpperCase().startsWith(text.toUpperCase())
        || currency.CurrencyName.toUpperCase().includes(text.toUpperCase())
  }

  const renderFillteredCurrency = () => {
    return (
      filteredCurrency.map((item, index) => {
        return (
          <button
            className='currency-button'
            key={index}

          >
            <div className="country-flag">
              <CountryFlag countryCode={item.Country} size={40}/>
            </div>
            <div className="currency-info">
              <div className="currency-code">{item.CurrencyCode}</div>
              <div className="currency-name">{item.CurrencyName}</div>
            </div>
          </button>
        )
      })
    )
  }

  useEffect(() => {
    setFilteredCurrency(currencyData);
    const newCurrency = findCurrencyDataByCode(props.countryCode);

    setCurrency(newCurrency || defaultCurrency)
  }, [defaultCurrency, props.countryCode]);

  useEffect(() => {
    const newCurrencyList = currencyData.filter(item => checkCurrency(inputText, item));

    setFilteredCurrency(newCurrencyList);
  }, [inputText])

  return (
    <div className='currency-picker-box'>
      <button className='currency-picker' onClick={toggleList}>
        <div className="flag"><CountryFlag countryCode={selectedCurrency?.Country} size={40}/></div>
        <div className="currency-info">
          <div className="currency-code">{selectedCurrency?.CurrencyCode}</div>
          <div className="currency-name">{selectedCurrency?.CurrencyName}</div>
        </div>
      </button>

      {isOpen && 
        <div className='list-box'>
          <label>
            <input 
                placeholder="Wpisz walute..." 
                className='currency-input'
                type="text" 
                name="search"
                autoFocus
                autoComplete='off'
                value={inputText}
                onChange={(e) => setInputText(e.currentTarget.value)}
            />
          </label>
          <div className='currency-list'>
            {renderFillteredCurrency()}
          </div>
        </div>
      }
    </div>
  )
}

export default CurrencyPicker