import AnalysisModel from './analysis.model';
import CurrencyRefreshService from '../currency-refresh/currency-refresh.service';

class AnalysisService {
  static async getAnalysis(currencyCode: string) {
    const isOld = await CurrencyRefreshService.isDataOld(currencyCode);

    if(isOld) {

    } else {
      const temp = await AnalysisModel.getAnalysis(currencyCode);
    }
    
    // CommonService.isDataOld('USD')
    // return AnalysisModel.getAnalysis(req, res)
  }
}

export default AnalysisService;