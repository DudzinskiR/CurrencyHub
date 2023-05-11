import React, { useEffect, useState } from 'react'
import "./change-distribution.scss"
import { Bar } from 'react-chartjs-2';
import "chart.js/auto";
import Header from '../../header-line/header-line'
import { getData, options, timePeriodName } from './ChartOptions';
import Loader from '../../loader/loader';
import CurrencyPicker from '../../currency-picker/currency-picker';
import Button from '../../button/button';
import TimePicker from '../../time-picker/time-picker';
import apiService from '../../../services/ApiService';
import { CurrencyPairData } from '../../../models/CurrencyPairData';

const ChangeDistribution = () => {
  const [currencyPair, setCurrencyPair] = useState<string[]>(['USD', 'GBP']);
  const [selectedCurrencyPair, setSelectedCurrencyPair] = useState<string[]>(["USD", "GBP"]);

  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);

  const [selectedTime, setSelectedTime] = useState<number>(0);

  const [currencyPairData, setCurrencyPairData] = useState<CurrencyPairData[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [dataSet, setDataSet] = useState<number[]>([]);

  const updateCurrencyPair = (currencyCode: string, index: number) => {
    const newCurrencyPair = [...currencyPair];
    newCurrencyPair[index] = currencyCode;
    setCurrencyPair(newCurrencyPair);
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);

      try {
        const data = await apiService.currencyPair(selectedCurrencyPair[0], selectedCurrencyPair[1]);
        setCurrencyPairData(data)
      } catch (e) {
        setError(true);
      }

      setLoading(false);
    }

    fetchData()
  }, [selectedCurrencyPair]);

  useEffect(() => {
    if (selectedTime <= currencyPairData?.length - 1) {
      setLabels(currencyPairData[selectedTime]?.scopes.map(scope => `${scope.startScope.toFixed(4)}...${scope.endScope.toFixed(4)}`));
      setDataSet(currencyPairData[selectedTime]?.values);
    }
  }, [currencyPairData, selectedTime]);

  return (
    <div className='currency-pair-box'>
      <Header text='Analiza par walut' />
      <div className="currency-pair-content">
        <div className="currency-pair-chart-box">
          <Loader isLoading={isLoading} isError={isError}>
            <TimePicker value={selectedTime} labels={timePeriodName} onChange={(value) => setSelectedTime(value)} />
            <Bar options={options} data={getData(dataSet, labels)} />
          </Loader>
        </div>

        <div className="currency-pair-picker-box">
          <div className="currency-pair-picker-title">Wybierz waluty</div>
          <CurrencyPicker currencyCode={currencyPair[0]} onChange={(c) => updateCurrencyPair(c, 0)} />
          <div className='currency-pair-picker-and'>-oraz-</div>
          <CurrencyPicker currencyCode={currencyPair[1]} onChange={(c) => updateCurrencyPair(c, 1)} />
          <Button text='Wybierz' onClick={() => setSelectedCurrencyPair(currencyPair)} />
        </div>

      </div>
    </div>
  )
}

export default ChangeDistribution