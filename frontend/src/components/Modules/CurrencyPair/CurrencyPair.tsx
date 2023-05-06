import React, { useState } from 'react'
import "./CurrencyPair.scss"
import { Bar } from 'react-chartjs-2';
import "chart.js/auto";
import Header from '../../HeaderLine/HeaderLine'
import { getData, options } from './ChartOptions';
import Loader from '../../Loader/Loader';
import CurrencyPicker from '../../CurrencyPicker/CurrencyPicker';
import Button from '../../Button/Button';

const CurrencyPair = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);

  return (
    <div className='currency-pair-box'>
      <Header text='Analiza par walut' />
      <div className="currency-pair-content">
        <div className="currency-pair-chart-box">
          <Loader isLoading={isLoading} isError={isError}>
            <Bar options={options} data={getData([10, 20, 30, 25, 15], ['label1', 'label2', 'label3', 'label4', 'label5'])} />
          </Loader>
        </div>

        <div className="currency-pair-picker-box">
          <div className="currency-pair-picker-title">Wybierz waluty</div>
          <CurrencyPicker />
          <div className='currency-pair-picker-and'>-oraz-</div>
          <CurrencyPicker />
          <Button text='Wybierz' />
        </div>

      </div>
    </div>
  )
}

export default CurrencyPair