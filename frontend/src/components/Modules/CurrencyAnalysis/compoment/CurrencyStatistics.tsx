import React, { useEffect, useState } from 'react'
import "./CurrencyStatistics.scss"
import Loader from '../../../Loader/Loader'
interface props {
  currencyCode: string,
  selectedTime: number
}

const CurrencyStatistics = ({ currencyCode, selectedTime }: props) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);


  return (
    <div className='currency-statistics-box'>
      <Loader isLoading={isLoading} isError={isError}>
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
      </Loader>
    </div>
  )
}

export default CurrencyStatistics