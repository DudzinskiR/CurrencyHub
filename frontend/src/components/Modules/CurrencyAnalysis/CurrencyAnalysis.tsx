import React, { useState } from 'react'
import "./CurrencyAnalysis.scss"
import Header from '../../HeaderLine/HeaderLine'
import CurrencyPicker from '../../CurrencyPicker/CurrencyPicker'
import Button from '../../Button/Button'
import { Bar } from 'react-chartjs-2';
import "chart.js/auto";
import { getData, options, timePeriodName } from './ChartOptions'
import TimePicker from '../../TimePicker/TimePicker'

const CurrencyAnalysis = () => {
  const [currencyCode, setCurrencyCode] = useState<string>("USD");
  const [selectedTime, setSelectedTime] = useState<number>(0);

  return (
    <div className="currency-analysis-box">
      <Header text='Analiza waluty' />
      <div className="currency-analysis-content">

        <div className="currency-analysis-chart-box">
          <TimePicker
            labels={timePeriodName}
            value={selectedTime}
            onChange={(value) => setSelectedTime(value)}
          />
          <Bar options={options} data={getData([5, 25, 15])} />
        </div>


        <div className="currency-analysis-picker-box">
          <div className="currency-analysis-picker-title">Wybierz walute</div>
          <CurrencyPicker
            countryCode={currencyCode}
            onChange={(currency) => setCurrencyCode(currency)}
          />
          <Button text='Wybierz' />
        </div>
      </div>
    </div>
  )
}

export default CurrencyAnalysis