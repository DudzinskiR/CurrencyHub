import React, { useEffect, useState } from 'react'
import "./session-analysis.scss"
import Header from '../../header-line/header-line'
import CurrencyPicker from '../../currency-picker/currency-picker'
import Button from '../../button/button'
import { Bar } from 'react-chartjs-2';
import "chart.js/auto";
import { getData, options, timePeriodName } from './chart-options'
import TimePicker from '../../TimePicker/TimePicker'
import apiService from '../../../services/ApiService'
import Loader from '../../loader/loader'
import { CurrencyAnalysisData } from '../../../models/CurrencyAnalysisData'
import CurrencyStatistics from '../statistics/statistics'

const SessionAnalysis = () => {

  const [currencyAnalysisData, setCurrencyAnalysis] = useState<CurrencyAnalysisData[]>([]);
  const [selectedCurrencyAnalysisData, setSelectedCurrencyAnalysisData] = useState<number[]>([])

  const [currencyCode, setCurrencyCode] = useState<string>("USD");
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState<string>("USD");
  const [selectedTime, setSelectedTime] = useState<number>(0);

  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);

  useEffect(() => {
    if (selectedTime <= currencyAnalysisData?.length - 1) {
      const newData = [];

      newData.push(currencyAnalysisData[selectedTime]?.countDown)
      newData.push(currencyAnalysisData[selectedTime]?.countConst)
      newData.push(currencyAnalysisData[selectedTime]?.countUp)

      setSelectedCurrencyAnalysisData(newData)
    }

  }, [currencyAnalysisData, selectedTime]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await apiService.currencyAnalysis(selectedCurrencyCode);
        setCurrencyAnalysis(data);
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    }

    fetchData();
  }, [selectedCurrencyCode])

  return (
    <div className="currency-analysis-box">

      <Header text='Analiza waluty' />
      <div className="currency-analysis-content">

        <div className="currency-analysis-chart-box">
          <Loader isLoading={isLoading} isError={isError}>
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
            currencyCode={currencyCode}
            onChange={(currency) => setCurrencyCode(currency)}
          />
          <Button text='Wybierz' onClick={() => setSelectedCurrencyCode(currencyCode)} />
        </div>
      </div>

      <CurrencyStatistics currencyCode={selectedCurrencyCode} selectedTime={selectedTime} />
    </div>
  )
}

export default SessionAnalysis