import React, { useState } from 'react'
import "./CurrencyPair.scss"
import { Bar } from 'react-chartjs-2';
import "chart.js/auto";
import Header from '../../HeaderLine/HeaderLine'
import { getData, options, timePeriodName } from './ChartOptions';
import Loader from '../../Loader/Loader';
import CurrencyPicker from '../../CurrencyPicker/CurrencyPicker';
import Button from '../../Button/Button';
import TimePicker from '../../TimePicker/TimePicker';

const CurrencyPair = () => {
  const [currencyPair, setCurrencyPair] = useState<string[]>(['USD', 'GBP']);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);

  const [selectedTime, setSelectedTime] = useState<number>(0);

  const updateCurrencyPair = (currencyCode: string, index: number) => {
    const newCurrencyPair = [...currencyPair];
    newCurrencyPair[index] = currencyCode;
    setCurrencyPair(newCurrencyPair);
  }

  return (
    <div className='currency-pair-box'>
      <Header text='Analiza par walut' />
      <div className="currency-pair-content">
        <div className="currency-pair-chart-box">
          <Loader isLoading={isLoading} isError={isError}>
            <TimePicker value={selectedTime} labels={timePeriodName} onChange={(value) => setSelectedTime(value)} />
            <Bar options={options} data={getData([10, 20, 30, 25, 15], ['label1', 'label2', 'label3', 'label4', 'label5'])} />
          </Loader>
        </div>

        <div className="currency-pair-picker-box">
          <div className="currency-pair-picker-title">Wybierz waluty</div>
          <CurrencyPicker countryCode={currencyPair[0]} onChange={(c) => updateCurrencyPair(c, 0)} />
          <div className='currency-pair-picker-and'>-oraz-</div>
          <CurrencyPicker countryCode={currencyPair[1]} onChange={(c) => updateCurrencyPair(c, 1)} />
          <Button text='Wybierz' />
        </div>

      </div>
    </div>
  )
}

export default CurrencyPair