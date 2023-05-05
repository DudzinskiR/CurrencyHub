import { CurrencyAnalysisData } from '../components/models/CurrencyAnalysisData';

class ApiService {
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
}

const apiService = new ApiService();
export default apiService