import AnalysisModel from './analysis.model';
import CurrencyRefreshService from '../currency-refresh/currency-refresh.service';

class AnalysisService {
  static async getAnalysis(currencyCode: string) {
    await CurrencyRefreshService.refreshCurrencyData(currencyCode);
  }
}

export default AnalysisService;