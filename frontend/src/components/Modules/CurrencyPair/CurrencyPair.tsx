import React from 'react'
import "./CurrencyPair.scss"
import { Bar } from 'react-chartjs-2';
import "chart.js/auto";
import Header from '../../HeaderLine/HeaderLine'
import { getData, options } from './ChartOptions';

const CurrencyPair = () => {
  return (
    <div className='currency-pair-box'>
      <Header text='Analiza par walut' />
      <div className="currency-pair-content">
        <div className="currency-pair-chart-box">
          <Bar options={options} data={getData([10, 20, 30, 25, 15], ['label1', 'label2', 'label3', 'label4', 'label5'])} />
        </div>
      </div>

    </div>
  )
}

export default CurrencyPair