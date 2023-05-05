import React, { useEffect, useState } from 'react'
import "./CurrencyAnalysis.scss"
import Header from '../../../HeaderLine/HeaderLine'
import CurrencyPicker from '../../../CurrencyPicker/CurrencyPicker'
import Button from '../../../Button/Button'
import { Bar } from 'react-chartjs-2';
import "chart.js/auto";
import { getData, options, timePeriodName } from '../ChartOptions'
import TimePicker from '../../../TimePicker/TimePicker'
import apiService from '../../../../services/ApiService'
import Loader from '../../../Loader/Loader'
import { CurrencyAnalysisData } from '../../../models/CurrencyAnalysisData'

const CurrencyAnalysis = () => {

  const [currencyAnalysisData, setCurrencyAnalysis] = useState<CurrencyAnalysisData[]>([]);
  const [selectedCurrencyAnalysisData, setSelectedCurrencyAnalysisData] = useState<number[]>([])

  const [currencyCode, setCurrencyCode] = useState<string>("USD");
  const [selectedTime, setSelectedTime] = useState<number>(0);

  const [isLoading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    const data = await apiService.currencyAnalysis()
    setCurrencyAnalysis(data);
    setLoading(false)
  }

  useEffect(() => {
    const newData = [];
    newData.push(currencyAnalysisData[selectedTime]?.countDown)
    newData.push(currencyAnalysisData[selectedTime]?.countConst)
    newData.push(currencyAnalysisData[selectedTime]?.countUp)

    setSelectedCurrencyAnalysisData(newData)
  }, [currencyAnalysisData, selectedTime]);

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="currency-analysis-box">

      <Header text='Analiza waluty' />
      <div className="currency-analysis-content">

        <div className="currency-analysis-chart-box">
          <Loader isLoading={isLoading}>
            <TimePicker
              labels={timePeriodName}
              value={selectedTime}
              onChange={(value) => setSelectedTime(value)}
            />
            <Bar options={options} data={getData(selectedCurrencyAnalysisData)} />
          </Loader>
        </div>


        <div className="currency-analysis-picker-box">
          <div className="currency-analysis-picker-title">Wybierz walute</div>
          <CurrencyPicker
            countryCode={currencyCode}
            onChange={(currency) => setCurrencyCode(currency)}
          />
          <Button text='Wybierz' onClick={fetchData} />
        </div>
      </div>
    </div>
  )
}

export default CurrencyAnalysis