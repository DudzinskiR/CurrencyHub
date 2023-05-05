import React from 'react'
import "./CurrencyStatistics.scss"

const CurrencyStatistics = () => {
  return (
    <div className='currency-statistics-box'>
      <div className="currency-statistics-content">
        <div className="currency-statistic">
          <div className="currency-statistic-name">Mediana</div>
          <div className="currency-statistic-value">12</div>
        </div>

        <div className="currency-statistic">
          <div className="currency-statistic-name">Dominanta</div>
          <div className="currency-statistic-value">23</div>
        </div>

        <div className="currency-statistic">
          <div className="currency-statistic-name">Odchylenie standardowe</div>
          <div className="currency-statistic-value">34</div>
        </div>

        <div className="currency-statistic">
          <div className="currency-statistic-name">Współczynnik zmienności</div>
          <div className="currency-statistic-value">45</div>
        </div>
      </div>
    </div>
  )
}

export default CurrencyStatistics