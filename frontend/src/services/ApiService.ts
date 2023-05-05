import axios from 'axios';

class ApiService {
  async currencyAnalysis() {
    await new Promise(r => setTimeout(r, 1000));

    return [
      {
        time: 7,
        countUp: 1,
        countDown: 2,
        countConst: 3
      },
      {
        time: 14,
        countUp: 1,
        countDown: 2,
        countConst: 3
      },
      {
        time: 30,
        countUp: 1,
        countDown: 2,
        countConst: 3
      },
      {
        time: 90,
        countUp: 1,
        countDown: 2,
        countConst: 3
      }
    ]
  }
}

const apiService = new ApiService();
export default apiService