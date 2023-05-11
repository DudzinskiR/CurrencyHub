import React, { useEffect, useState } from 'react'
import "./currency-picker.scss"
import CountryFlag from '../country-flag/country-flag'
import { Currency } from '../../util/currency-data'
import { currencyData } from '../../util/currency-data'

interface props {
  currencyCode?: string,
  onChange?: (currency: string) => void
}

const CurrencyPicker = ({ currencyCode, onChange }: props) => {

  const [inputText, setInputText] = useState<string>("");
  const [selectedCurrency, setCurrency] = useState<Currency>();
  const [filteredCurrency, setFilteredCurrency] = useState<Currency[]>([]);
  const [isOpen, setOpen] = useState<boolean>(false);

  const defaultCurrency = currencyData.find(item => item.CurrencyCode === "USD");

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

  const selectCurrency = (item: Currency) => {
    setCurrency(item);
    toggleList();

    if (onChange)
      onChange(item.CurrencyCode);
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (filteredCurrency.length > 0) {
        selectCurrency(filteredCurrency[0]);
      }
    }
  }

  const renderFilteredCurrency = () => {
    return (
      filteredCurrency.map((item, index) => {
        return (
          <button
            className='currency-button'
            key={index}
            onMouseDown={() => selectCurrency(item)}
          >
            <div className="country-flag">
              <CountryFlag countryCode={item.Country} size={40} />
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
    const newCurrency = findCurrencyDataByCode(currencyCode);

    setCurrency(newCurrency || defaultCurrency)
  }, [defaultCurrency, currencyCode]);

  useEffect(() => {
    const newCurrencyList = currencyData.filter(item => checkCurrency(inputText, item));

    setFilteredCurrency(newCurrencyList);
  }, [inputText])

  return (
    <div className='currency-picker-box'>
      <button className='currency-picker' onClick={toggleList}>
        <div className="flag"><CountryFlag countryCode={selectedCurrency?.Country} size={40} /></div>
        <div className="currency-info">
          <div className="currency-code">{selectedCurrency?.CurrencyCode}</div>
          <div className="currency-name">{selectedCurrency?.CurrencyName}</div>
        </div>
      </button>

      {isOpen &&
        <div className='list-box'>
          <label>

            <div className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                <g fill="rgb(100, 100, 100)">
                  <path d="M 21 3 C 11.6 3 4 10.6 4 20 C 4 29.4 11.6 37 21 37 C 24.354553 37 27.47104 36.01984 30.103516 34.347656 L 42.378906 46.621094 L 46.621094 42.378906 L 34.523438 30.279297 C 36.695733 27.423994 38 23.870646 38 20 C 38 10.6 30.4 3 21 3 z M 21 7 C 28.2 7 34 12.8 34 20 C 34 27.2 28.2 33 21 33 C 13.8 33 8 27.2 8 20 C 8 12.8 13.8 7 21 7 z" />
                </g>
              </svg>
            </div>

            <input
              placeholder="Wpisz walute..."
              className='currency-input'
              type="text"
              name="search"
              autoFocus
              autoComplete='off'
              value={inputText}
              onKeyDown={onKeyDown}
              onBlur={() => toggleList()}
              onChange={(e) => setInputText(e.currentTarget.value)}
            />
          </label>
          <div className='currency-list' style={{ height: `${Math.min(5, filteredCurrency.length) * 60}px` }}>
            {renderFilteredCurrency()}
          </div>
        </div>
      }
    </div>
  )
}

export default CurrencyPicker