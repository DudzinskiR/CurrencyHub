import { SessionAnalysisData } from '../models/session-analysis.interface';
import { ChangeDistributionData } from '../models/change-distribution.interface';
import { StatisticData } from '../models/statistics.interface';
import axios from 'axios';

class BackendService {

  private static API_ROOT = process.env.REACT_APP_API_ROOT || "http://localhost:8080"

  static async getChangeDistribution(codeOne: string, codeTwo: string): Promise<ChangeDistributionData[]>{
    const url = `${this.API_ROOT}/api/change/?one=${codeOne}&two=${codeTwo}`;
    const response = await axios.get<ChangeDistributionData[]>(url);

    return response.data;
  }

  static async getSessionAnalysis(code: string): Promise<SessionAnalysisData[]> {
    const url = `${this.API_ROOT}/api/session/?code=${code}`;
    const response = await axios.get<SessionAnalysisData[]>(url);
    
    return response.data;
  }

  static async getStatistics(code: string): Promise<StatisticData[]>{
    const url = `${this.API_ROOT}/api/statistics/?code=${code}`;
    const response = await axios.get<StatisticData[]>(url);
    
    return response.data;
  }
}

export default BackendService