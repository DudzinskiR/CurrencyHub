import React from 'react'
import "./CurrencyAnalysis.scss"
import Header from '../../HeaderLine/HeaderLine'
import CurrencyPicker from '../../CurrencyPicker/CurrencyPicker'
import Button from '../../Button/Button'

const CurrencyAnalysis = () => {
  return (
    <div className="currency-analysis-box">
      <Header text='Analiza waluty' />
      <div className="currency-analysis-content">
        <div className="currency-analysis-chart-box">
          s
        </div>
        <div className="currency-analysis-picker-box">
          <div className="currency-analysis-picker-title">Wybierz walute</div>
          <CurrencyPicker />
          <Button text='Wybierz' />
        </div>
      </div>
    </div>
  )
}

export default CurrencyAnalysis