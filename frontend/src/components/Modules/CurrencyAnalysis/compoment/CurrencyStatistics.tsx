import React, { useEffect, useState } from 'react'
import "./CurrencyStatistics.scss"
import Loader from '../../../Loader/Loader'
import apiService from '../../../../services/ApiService'
import { CurrencyStatisticData } from '../../../models/CurrencyStatisticsData'
interface props {
  currencyCode: string,
  selectedTime: number
}

const CurrencyStatistics = ({ currencyCode, selectedTime }: props) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);

  const [currencyStatistics, setCurrencyStatistics] = useState<CurrencyStatisticData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await apiService.currencyStatistics(currencyCode);
        setCurrencyStatistics(data);
      } catch (err) {
        setError(true);
      }

      setLoading(false)
    }

    fetchData();
  }, [currencyCode])

  return (
    <div className='currency-statistics-box'>
      <Loader isLoading={isLoading} isError={isError}>
        <div className="currency-statistics-content">
          <div className="currency-statistic">
            <div className="currency-statistic-name">Mediana</div>
            <div className="currency-statistic-value">{currencyStatistics[selectedTime]?.median.toFixed(2)}</div>
          </div>

          <div className="currency-statistic">
            <div className="currency-statistic-name">Dominanta</div>
            <div className="currency-statistic-value">{currencyStatistics[selectedTime]?.dominant.map(item => item.toFixed(2)).join(' ')}</div>
          </div>

          <div className="currency-statistic">
            <div className="currency-statistic-name">Odchylenie standardowe</div>
            <div className="currency-statistic-value">{currencyStatistics[selectedTime]?.standardDeviation.toFixed(2)}</div>
          </div>

          <div className="currency-statistic">
            <div className="currency-statistic-name">Współczynnik zmienności</div>
            <div className="currency-statistic-value">{currencyStatistics[selectedTime]?.coefficientOfVariantion.toFixed(2)}</div>
          </div>
        </div>
      </Loader>
    </div>
  )
}

export default CurrencyStatistics