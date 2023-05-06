import { CurrencyAnalysisData } from '../components/models/CurrencyAnalysisData';
import { CurrencyPairData } from '../components/models/CurrencyPairData';
import { CurrencyStatisticData } from '../components/models/CurrencyStatisticsData';

class ApiService {

  async currencyPair(firstCurrencyCode: string, secondCurrencyCode: string): Promise<CurrencyPairData[]>{
    await new Promise(r => setTimeout(r, 1000 + Math.random() * 2000));

    if(Math.random() * 10 > 8){
      throw Error("Connection error")
    }

    const temp = Math.random() * 1;
    const temp2 = Math.random() * 1;

    return [
      {
        time: 30,
        scopes: [
          {
            startScope: (temp * -1),
            endScope: (temp * -1) + (temp * 0.4),
          },
          {
            startScope: (temp * -1) + (temp * 0.4),
            endScope: (temp * -1) + (temp * 0.8),
          },
          {
            startScope: (temp * -1) + (temp * 0.8),
            endScope: (temp * -1) + (temp * 1.2),
          },
          {
            startScope: (temp * -1) + (temp * 1.2),
            endScope: (temp * -1) + (temp * 1.6),
          },
          {
            startScope: (temp * -1) + (temp * 1.6),
            endScope: (temp * -1) + (temp * 2),
          },
        ],
        values: [
          Math.floor(Math.random() * 20),
          Math.floor(Math.random() * 20),
          Math.floor(Math.random() * 20),
          Math.floor(Math.random() * 20),
          Math.floor(Math.random() * 20)
        ]
      },
      {
        time: 30,
        scopes: [
          {
            startScope: (temp2 * -1),
            endScope: (temp2 * -1) + (temp2 * 0.4),
          },
          {
            startScope: (temp2 * -1) + (temp2 * 0.4),
            endScope: (temp2 * -1) + (temp2 * 0.8),
          },
          {
            startScope: (temp2 * -1) + (temp2 * 0.8),
            endScope: (temp2 * -1) + (temp2 * 1.2),
          },
          {
            startScope: (temp2 * -1) + (temp2 * 1.2),
            endScope: (temp2 * -1) + (temp2 * 1.6),
          },
          {
            startScope: (temp2 * -1) + (temp2 * 1.6),
            endScope: (temp2 * -1) + (temp2 * 2),
          },
        ],
        values: [
          Math.floor(Math.random() * 20),
          Math.floor(Math.random() * 20),
          Math.floor(Math.random() * 20),
          Math.floor(Math.random() * 20),
          Math.floor(Math.random() * 20)
        ]
      },
    ]
  }

  async currencyAnalysis(currencyCode: string): Promise<CurrencyAnalysisData[]> {
    await new Promise(r => setTimeout(r, 1000 + Math.random() * 2000));

    if(Math.random() * 10 > 8){
      throw Error("Connection error")
    }
    return [
      {
        time: 7,
        countUp: Math.random() * 50,
        countDown: Math.random() * 50,
        countConst: Math.random() * 50
      },
      {
        time: 14,
        countUp: Math.random() * 50,
        countDown: Math.random() * 50,
        countConst: Math.random() * 50
      },
      {
        time: 30,
        countUp: Math.random() * 50,
        countDown: Math.random() * 50,
        countConst: Math.random() * 50
      },
      {
        time: 90,
        countUp: Math.random() * 50,
        countDown: Math.random() * 50,
        countConst: Math.random() * 50
      },
      {
        time: 180,
        countUp: Math.random() * 50,
        countDown: Math.random() * 50,
        countConst: Math.random() * 50
      },
      {
        time: 360,
        countUp: Math.random() * 50,
        countDown: Math.random() * 50,
        countConst: Math.random() * 50
      },
    ]
  }

  async currencyStatistics(currencyCode: string): Promise<CurrencyStatisticData[]>{
    await new Promise(r => setTimeout(r, 1000 + Math.random() * 2000));

    if(Math.random() * 10 > 8){
      throw Error("Connection error")
    }

    return[
      {
        median: Math.random() * 50,
        dominant: [Math.random() * 50, Math.random() * 50],
        standardDeviation: Math.random() * 50,
        coefficientOfVariantion: Math.random() * 50
      },
      {
        median: Math.random() * 50,
        dominant: [Math.random() * 50, Math.random() * 50],
        standardDeviation: Math.random() * 50,
        coefficientOfVariantion: Math.random() * 50
      },
      {
        median: Math.random() * 50,
        dominant: [Math.random() * 50, Math.random() * 50],
        standardDeviation: Math.random() * 50,
        coefficientOfVariantion: Math.random() * 50
      },
      {
        median: Math.random() * 50,
        dominant: [Math.random() * 50, Math.random() * 50],
        standardDeviation: Math.random() * 50,
        coefficientOfVariantion: Math.random() * 50
      },
      {
        median: Math.random() * 50,
        dominant: [Math.random() * 50, Math.random() * 50],
        standardDeviation: Math.random() * 50,
        coefficientOfVariantion: Math.random() * 50
      },
      {
        median: Math.random() * 50,
        dominant: [Math.random() * 50, Math.random() * 50],
        standardDeviation: Math.random() * 50,
        coefficientOfVariantion: Math.random() * 50
      },
    ]
  }
}

const apiService = new ApiService();
export default apiService