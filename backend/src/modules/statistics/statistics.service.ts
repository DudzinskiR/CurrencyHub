import { validateCode } from "../../common/currency-validator/currency-validator";
import InvalidCurrencyError from "../../exceptions/invalid-currency.exception";
import AnalysisModel from "../analysis/analysis.model";
import CurrencyRefreshService from "../currency-refresh/currency-refresh.service";

class StatisticsService {
  static async getStatistics(currencyCode: string){
    await CurrencyRefreshService.refreshCurrencyData(currencyCode);
    
    if(!validateCode(currencyCode)){
      throw new InvalidCurrencyError(currencyCode);
    }

    const response = await AnalysisModel.getAnalysisDesc(currencyCode);
    console.log("🚀 ~ file: statistics.service.ts:15 ~ StatisticsService ~ getStatistics ~ response:", response)

    
    
  }
}

export default StatisticsService;