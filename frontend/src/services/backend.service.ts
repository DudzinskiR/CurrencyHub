import { SessionAnalysisData } from '../models/session-analysis.interface';
import { ChangeDistributionData } from '../models/change-distribution.interface';
import { StatisticData } from '../models/statistics.interface';

class BackendService {
  static async getChangeDistribution(firstCurrencyCode: string, secondCurrencyCode: string): Promise<ChangeDistributionData[]>{
    await new Promise(r => setTimeout(r, 1000 + Math.random() * 2000));

    if(Math.random() * 10 > 8){
      throw Error("Connection error")
    }

    const temp = Math.random() * 1;
    const temp2 = Math.random() * 1;

    return [
      {
        scopes: [
          {
            start: (temp * -1),
            end: (temp * -1) + (temp * 0.4),
          },
          {
            start: (temp * -1) + (temp * 0.4),
            end: (temp * -1) + (temp * 0.8),
          },
          {
            start: (temp * -1) + (temp * 0.8),
            end: (temp * -1) + (temp * 1.2),
          },
          {
            start: (temp * -1) + (temp * 1.2),
            end: (temp * -1) + (temp * 1.6),
          },
          {
            start: (temp * -1) + (temp * 1.6),
            end: (temp * -1) + (temp * 2),
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
        scopes: [
          {
            start: (temp2 * -1),
            end: (temp2 * -1) + (temp2 * 0.4),
          },
          {
            start: (temp2 * -1) + (temp2 * 0.4),
            end: (temp2 * -1) + (temp2 * 0.8),
          },
          {
            start: (temp2 * -1) + (temp2 * 0.8),
            end: (temp2 * -1) + (temp2 * 1.2),
          },
          {
            start: (temp2 * -1) + (temp2 * 1.2),
            end: (temp2 * -1) + (temp2 * 1.6),
          },
          {
            start: (temp2 * -1) + (temp2 * 1.6),
            end: (temp2 * -1) + (temp2 * 2),
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

  static async getSessionAnalysis(currencyCode: string): Promise<SessionAnalysisData[]> {
    await new Promise(r => setTimeout(r, 1000 + Math.random() * 2000));

    if(Math.random() * 10 > 8){
      throw Error("Connection error")
    }
    return [
      {
        up: Math.random() * 50,
        down: Math.random() * 50,
        const: Math.random() * 50
      },
      {
        up: Math.random() * 50,
        down: Math.random() * 50,
        const: Math.random() * 50
      },
      {
        up: Math.random() * 50,
        down: Math.random() * 50,
        const: Math.random() * 50
      },
      {
        up: Math.random() * 50,
        down: Math.random() * 50,
        const: Math.random() * 50
      },
      {
        up: Math.random() * 50,
        down: Math.random() * 50,
        const: Math.random() * 50
      },
      {
        up: Math.random() * 50,
        down: Math.random() * 50,
        const: Math.random() * 50
      },
    ]
  }

  static async getStatistics(currencyCode: string): Promise<StatisticData[]>{
    await new Promise(r => setTimeout(r, 1000 + Math.random() * 2000));

    if(Math.random() * 10 > 8){
      throw Error("Connection error")
    }

    return[
      {
        median: Math.random() * 50,
        dominant: [Math.random() * 50, Math.random() * 50],
        deviation: Math.random() * 50,
        variation: Math.random() * 50
      },
      {
        median: Math.random() * 50,
        dominant: [Math.random() * 50, Math.random() * 50],
        deviation: Math.random() * 50,
        variation: Math.random() * 50
      },
      {
        median: Math.random() * 50,
        dominant: [Math.random() * 50, Math.random() * 50],
        deviation: Math.random() * 50,
        variation: Math.random() * 50
      },
      {
        median: Math.random() * 50,
        dominant: [Math.random() * 50, Math.random() * 50],
        deviation: Math.random() * 50,
        variation: Math.random() * 50
      },
      {
        median: Math.random() * 50,
        dominant: [Math.random() * 50, Math.random() * 50],
        deviation: Math.random() * 50,
        variation: Math.random() * 50
      },
      {
        median: Math.random() * 50,
        dominant: [Math.random() * 50, Math.random() * 50],
        deviation: Math.random() * 50,
        variation: Math.random() * 50
      },
    ]
  }
}

export default BackendService